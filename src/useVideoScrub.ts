import { useEffect, useRef, useState, useCallback } from 'react';
import MP4Box from 'mp4box';

interface UseVideoScrubOptions {
  videoUrl: string;
  containerRef: React.RefObject<HTMLElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG_MS = 60000;

interface DecodedFrameEntry {
  timestamp: number;
  bitmap: ImageBitmap;
}

export function useVideoScrub({
  videoUrl,
  containerRef,
  canvasRef,
  videoRef,
}: UseVideoScrubOptions) {
  const [progress, setProgress] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebCodecs, setIsWebCodecs] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // WebCodecs & Demuxer refs
  const mp4boxfileRef = useRef<any>(null);
  const decoderRef = useRef<VideoDecoder | null>(null);
  const samplesRef = useRef<any[]>([]);
  const videoTrackRef = useRef<any>(null);
  const lruFramesRef = useRef<Map<number, ImageBitmap>>(new Map());
  const pendingDecodesRef = useRef<Set<number>>(new Set());
  const fallbackActiveRef = useRef<boolean>(false);

  // Helper to put bitmap in LRU
  const addToLRU = useCallback((timestamp: number, bitmap: ImageBitmap) => {
    const cache = lruFramesRef.current;
    if (cache.has(timestamp)) {
      cache.get(timestamp)?.close();
      cache.delete(timestamp);
    }
    if (cache.size >= LRU_MAX) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        cache.get(oldestKey)?.close();
        cache.delete(oldestKey);
      }
    }
    cache.set(timestamp, bitmap);
  }, []);

  // Draw bitmap to canvas
  const drawToCanvas = useCallback(
    (source: CanvasImageSource) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;

      // Cover scaling
      const sw = 'videoWidth' in source ? (source as HTMLVideoElement).videoWidth : (source as ImageBitmap).width;
      const sh = 'videoHeight' in source ? (source as HTMLVideoElement).videoHeight : (source as ImageBitmap).height;
      if (!sw || !sh) return;

      const scale = Math.max(cw / sw, ch / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(source, dx, dy, dw, dh);
    },
    [canvasRef]
  );

  // Fallback to HTMLVideoElement
  const activateFallback = useCallback(() => {
    if (fallbackActiveRef.current) return;
    fallbackActiveRef.current = true;
    setIsWebCodecs(false);
    setIsLoading(false);
    console.info('Switching to HTMLVideoElement scrubbing fallback.');

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.src = videoUrl;
      video.load();

      video.onloadedmetadata = () => {
        setVideoDuration(video.duration || 10);
      };

      video.onseeked = () => {
        drawToCanvas(video);
      };
    }
  }, [videoUrl, videoRef, drawToCanvas]);

  // Try initializing WebCodecs & MP4Box
  useEffect(() => {
    let isCancelled = false;
    const watchdogTimer = setTimeout(() => {
      if (!fallbackActiveRef.current && isLoading) {
        console.warn('WebCodecs init watchdog triggered, falling back.');
        activateFallback();
      }
    }, WATCHDOG_MS);

    const initDemuxer = async () => {
      if (typeof window === 'undefined' || !('VideoDecoder' in window)) {
        activateFallback();
        return;
      }

      try {
        const mp4box = MP4Box.createFile();
        mp4boxfileRef.current = mp4box;

        mp4box.onError = (e: any) => {
          console.warn('MP4Box parse error:', e);
          if (!isCancelled) activateFallback();
        };

        mp4box.onReady = (info: any) => {
          if (isCancelled) return;
          const track = info.videoTracks[0];
          if (!track) {
            activateFallback();
            return;
          }

          videoTrackRef.current = track;
          const dur = info.duration / info.timescale;
          setVideoDuration(dur);

          // Configure VideoDecoder
          try {
            const decoder = new VideoDecoder({
              output: (videoFrame: VideoFrame) => {
                createImageBitmap(videoFrame)
                  .then((bitmap) => {
                    addToLRU(videoFrame.timestamp, bitmap);
                    videoFrame.close();

                    // If this timestamp matches closely to current scrubber, render it
                    const targetUs = currentProgressRef.current * dur * 1_000_000;
                    if (Math.abs(videoFrame.timestamp - targetUs) < 150_000) {
                      drawToCanvas(bitmap);
                    }
                  })
                  .catch(() => {
                    videoFrame.close();
                  });
              },
              error: (err: any) => {
                console.warn('VideoDecoder error:', err);
                activateFallback();
              },
            });

            decoder.configure({
              codec: track.codec,
              codedWidth: track.video.width,
              codedHeight: track.video.height,
              description: track.description,
            });

            decoderRef.current = decoder;
            setIsWebCodecs(true);
            setIsLoading(false);

            // Start extracting samples
            mp4box.setExtractionOptions(track.id, null, { nbSamples: LEAD });
            mp4box.start();
          } catch (decErr) {
            console.warn('Decoder config failed:', decErr);
            activateFallback();
          }
        };

        mp4box.onSamples = (_id: number, _user: any, samples: any[]) => {
          if (isCancelled) return;
          samplesRef.current.push(...samples);
        };

        // Fetch buffer
        const response = await fetch(videoUrl, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        if (isCancelled) return;

        (buffer as any).fileStart = 0;
        mp4box.appendBuffer(buffer);
        mp4box.flush();
      } catch (err) {
        console.warn('Failed to load video for WebCodecs, using fallback:', err);
        if (!isCancelled) {
          activateFallback();
        }
      }
    };

    initDemuxer();

    return () => {
      isCancelled = true;
      clearTimeout(watchdogTimer);
      if (decoderRef.current && decoderRef.current.state !== 'closed') {
        try {
          decoderRef.current.close();
        } catch (_) {}
      }
      lruFramesRef.current.forEach((b) => b.close());
      lruFramesRef.current.clear();
    };
  }, [videoUrl, activateFallback, addToLRU, drawToCanvas]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollTop = -rect.top;
      const p = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      targetProgressRef.current = p;
      setRawProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  // Window resize to sync canvas resolution
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]);

  // Animation frame loop for smooth LERP
  useEffect(() => {
    const updateScrub = () => {
      const target = targetProgressRef.current;
      let cur = currentProgressRef.current;

      const delta = (target - cur) / LERP_TAU;
      if (Math.abs(target - cur) < SNAP) {
        cur = target;
      } else {
        cur += delta;
      }
      currentProgressRef.current = cur;
      setProgress(cur);

      // Perform frame update
      if (fallbackActiveRef.current) {
        const video = videoRef.current;
        if (video && video.duration) {
          const desiredTime = cur * video.duration;
          if (Math.abs(video.currentTime - desiredTime) > 0.04) {
            video.currentTime = desiredTime;
          }
        }
      } else if (decoderRef.current && videoDuration > 0) {
        const targetTimeUs = cur * videoDuration * 1_000_000;
        // Search in LRU cache
        let closestTimestamp: number | null = null;
        let minDiff = Infinity;

        lruFramesRef.current.forEach((_bitmap, ts) => {
          const diff = Math.abs(ts - targetTimeUs);
          if (diff < minDiff) {
            minDiff = diff;
            closestTimestamp = ts;
          }
        });

        if (closestTimestamp !== null && minDiff < 200_000) {
          const bitmap = lruFramesRef.current.get(closestTimestamp);
          if (bitmap) drawToCanvas(bitmap);
        } else {
          // Feed chunks to decoder if needed
          const sample = samplesRef.current.find(
            (s) => Math.abs(s.cts - targetTimeUs) < 100_000
          );
          if (sample && !pendingDecodesRef.current.has(sample.cts)) {
            pendingDecodesRef.current.add(sample.cts);
            try {
              const chunk = new EncodedVideoChunk({
                type: sample.is_sync ? 'key' : 'delta',
                timestamp: sample.cts,
                duration: sample.duration,
                data: sample.data,
              });
              decoderRef.current.decode(chunk);
            } catch (_) {}
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(updateScrub);
    };

    rafIdRef.current = requestAnimationFrame(updateScrub);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [videoDuration, drawToCanvas, videoRef]);

  return {
    progress,
    rawProgress,
    isLoading,
    isWebCodecs,
    videoDuration,
  };
}
