import React, { useEffect, useRef, useState } from 'react';
import * as MP4Box from 'mp4box';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

interface FrameBankItem {
  ts: number; // in microseconds
  blob: Blob;
}

export function useVideoScrub(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  videoSrc: string,
  containerRef: React.RefObject<HTMLElement>
) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);

  // Mutable refs for high-frequency rAF loop
  const stateRef = useRef({
    bank: [] as FrameBankItem[],
    lru: new Map<number, ImageBitmap>(),
    loadingLru: new Set<number>(),
    current: 0,
    target: 0,
    dur: 0,
    ready: false,
    reverted: false,
    painted: false,
    building: false,
  });

  // Calculate scroll progress p
  const getProgress = () => {
    if (!containerRef.current) return 0;
    const scrollY = window.scrollY;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    return Math.max(0, Math.min(1, scrollY / totalHeight));
  };

  // Binary search for nearest frame timestamp
  const getNearestIndex = (tsMicroseconds: number, bank: FrameBankItem[]) => {
    let low = 0;
    let high = bank.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (bank[mid].ts < tsMicroseconds) {
        low = mid + 1;
      } else if (bank[mid].ts > tsMicroseconds) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    if (low >= bank.length) return bank.length - 1;
    if (high < 0) return 0;
    return Math.abs(bank[low].ts - tsMicroseconds) < Math.abs(bank[high].ts - tsMicroseconds)
      ? low
      : high;
  };

  // Warm LRU Cache around index
  const warmLRU = (index: number) => {
    const { bank, lru, loadingLru } = stateRef.current;
    if (bank.length === 0) return;

    const indicesToWarm = [index - 1, index, index + 1, index + 2].filter(
      (i) => i >= 0 && i < bank.length
    );

    indicesToWarm.forEach((idx) => {
      if (!lru.has(idx) && !loadingLru.has(idx)) {
        loadingLru.add(idx);
        createImageBitmap(bank[idx].blob)
          .then((bitmap) => {
            lru.set(idx, bitmap);
            loadingLru.delete(idx);
            // Evict oldest if exceeding max size
            if (lru.size > LRU_MAX) {
              const firstKey = lru.keys().next().value;
              if (firstKey !== undefined) {
                const oldBitmap = lru.get(firstKey);
                oldBitmap?.close();
                lru.delete(firstKey);
              }
            }
          })
          .catch(() => {
            loadingLru.delete(idx);
          });
      }
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        stateRef.current.dur = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.duration) handleLoadedMetadata();

    // rAF animation loop
    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      const p = getProgress();
      setScrollProgress(p);

      const s = stateRef.current;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (s.dur > 0) {
        s.target = p * s.dur;
        if (prefersReducedMotion) {
          s.current = s.target;
        } else {
          s.current += (s.target - s.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(s.target - s.current) < SNAP) {
            s.current = s.target;
          }
        }

        // Draw decoded frame if available, otherwise video fallback
        if (s.ready && s.bank.length > 0 && !s.reverted) {
          const idx = getNearestIndex(s.current * 1e6, s.bank);
          warmLRU(idx);

          const bitmap = s.lru.get(idx);
          if (bitmap) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
              if (!s.painted) {
                s.painted = true;
                setCanvasLive(true);
              }
            }
          }
        } else {
          // Fallback to video element seeking
          if (!video.seeking && Math.abs(video.currentTime - s.current) > 0.01) {
            video.currentTime = s.current;
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      cancelAnimationFrame(animId);
      // Clean up LRU bitmaps
      stateRef.current.lru.forEach((bmp) => bmp.close());
      stateRef.current.lru.clear();
    };
  }, [videoSrc]);

  // Frame Bank WebCodecs extraction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof window === 'undefined' || !('VideoDecoder' in window)) {
      return;
    }

    let isCancelled = false;
    let decoder: VideoDecoder | null = null;

    // 60-second watchdog
    const watchdogTimer = setTimeout(() => {
      if (!stateRef.current.ready) {
        stateRef.current.reverted = true;
        setCanvasLive(false);
      }
    }, WATCHDOG);

    const initFrameBank = async () => {
      try {
        stateRef.current.building = true;

        const response = await fetch(videoSrc, { mode: 'cors' });
        if (!response.ok) throw new Error('Fetch failed');
        const buffer = await response.arrayBuffer();
        if (isCancelled) return;

        const mp4boxfile = (MP4Box as any).createFile();

        let trackInfo: any = null;
        let description: Uint8Array | undefined;

        mp4boxfile.onReady = (info: any) => {
          trackInfo = info.videoTracks[0];
          if (!trackInfo) return;

          // Attempt to extract decoder configuration description
          try {
            const trak = mp4boxfile.getTrackById(trackInfo.id);
            if (trak && trak.mdia && trak.mdia.minf && trak.mdia.minf.stbl) {
              const entries = trak.mdia.minf.stbl.stsd.entries;
              for (const entry of entries) {
                const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
                if (box) {
                  const stream = new (MP4Box as any).DataStream(undefined, 0, (MP4Box as any).DataStream.BIG_ENDIAN);
                  box.write(stream);
                  description = new Uint8Array(stream.buffer, 8);
                  break;
                }
              }
            }
          } catch (e) {
            // fallback gracefully
          }
        };

        const sampleQueue: any[] = [];
        let samplesExtractionFinished = false;

        mp4boxfile.onSamples = (_id: number, _user: any, samples: any[]) => {
          sampleQueue.push(...samples);
        };

        const fileBuffer = buffer.slice(0);
        (fileBuffer as any).fileStart = 0;
        mp4boxfile.appendBuffer(fileBuffer);
        mp4boxfile.flush();

        if (!trackInfo) throw new Error('No video track found');

        // Configure VideoDecoder with offscreen canvas drawing
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = 1920;
        offscreenCanvas.height = 1080;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        const tempBank: FrameBankItem[] = [];
        let decodingCount = 0;

        const handleFrame = async (frame: VideoFrame) => {
          const ts = frame.timestamp;
          if (offscreenCtx) {
            offscreenCtx.drawImage(frame, 0, 0, 1920, 1080);
          }
          frame.close();

          try {
            const blob = await new Promise<Blob | null>((resolve) =>
              offscreenCanvas.toBlob(resolve, 'image/webp', 0.82)
            );
            if (blob) {
              tempBank.push({ ts, blob });
            }
          } catch {
            // ignore frame error
          }

          decodingCount--;
        };

        const decoderConfig: VideoDecoderConfig = {
          codec: trackInfo.codec,
          codedWidth: trackInfo.video?.width || 1920,
          codedHeight: trackInfo.video?.height || 1080,
          description: description,
          hardwareAcceleration: 'prefer-hardware',
        };

        const isSupported = await VideoDecoder.isConfigSupported(decoderConfig);
        if (!isSupported.supported) {
          decoderConfig.hardwareAcceleration = 'prefer-software';
        }

        decoder = new VideoDecoder({
          output: handleFrame,
          error: () => {
            // Retry once with software acceleration if hardware failed
            if (decoderConfig.hardwareAcceleration === 'prefer-hardware') {
              decoderConfig.hardwareAcceleration = 'prefer-software';
              try {
                decoder?.configure(decoderConfig);
              } catch {
                stateRef.current.reverted = true;
              }
            } else {
              stateRef.current.reverted = true;
            }
          },
        });

        decoder.configure(decoderConfig);

        // Extract samples
        mp4boxfile.setExtractionOptions(trackInfo.id, null, { nbSamples: 1000 });
        mp4boxfile.start();

        // Feed chunks into decoder with LEAD throttle
        for (const sample of sampleQueue) {
          if (isCancelled || stateRef.current.reverted) break;

          while (decodingCount > LEAD) {
            await new Promise((r) => setTimeout(r, 10));
          }

          decodingCount++;
          const chunk = new EncodedVideoChunk({
            type: sample.is_sync ? 'key' : 'delta',
            timestamp: (sample.cts * 1e6) / sample.timescale,
            duration: (sample.duration * 1e6) / sample.timescale,
            data: sample.data,
          });

          decoder.decode(chunk);
        }

        await decoder.flush();

        if (!isCancelled && !stateRef.current.reverted && tempBank.length > 0) {
          // Sort frame bank chronologically
          tempBank.sort((a, b) => a.ts - b.ts);
          stateRef.current.bank = tempBank;
          stateRef.current.ready = true;
        }
      } catch (err) {
        // Fall back gracefully to standard video scrubbing
        stateRef.current.reverted = true;
      }
    };

    if (document.readyState === 'complete') {
      initFrameBank();
    } else {
      window.addEventListener('load', initFrameBank, { once: true });
    }

    return () => {
      isCancelled = true;
      clearTimeout(watchdogTimer);
      if (decoder && decoder.state !== 'closed') {
        try {
          decoder.close();
        } catch {}
      }
    };
  }, [videoSrc]);

  return { scrollProgress, canvasLive };
}
