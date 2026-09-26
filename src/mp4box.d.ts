declare module 'mp4box' {
  export interface MP4MediaTrack {
    id: number;
    created: Date;
    modified: Date;
    volume: number;
    track_width: number;
    track_height: number;
    timescale: number;
    duration: number;
    bitrate: number;
    codec: string;
    video?: {
      width: number;
      height: number;
    };
    audio?: {
      channel_count: number;
      sample_rate: number;
      sample_size: number;
    };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    isFragmented: boolean;
    hasMoov: boolean;
    tracks: MP4MediaTrack[];
    videoTracks: MP4MediaTrack[];
    audioTracks: MP4MediaTrack[];
  }

  export interface MP4Sample {
    track_id: number;
    number: number;
    data: Uint8Array;
    size: number;
    cts: number;
    dts: number;
    duration: number;
    is_sync: boolean;
    description: any;
    timescale: number;
  }

  export interface MP4File {
    onReady?: (info: MP4Info) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: any, samples: MP4Sample[]) => void;
    appendBuffer(data: ArrayBuffer): number;
    start(): void;
    stop(): void;
    flush(): void;
    setExtractionOptions(id: number, user?: any, options?: { nbSamples?: number; rapAlignement?: boolean }): void;
    getTrackById(id: number): any;
  }

  export function createFile(keepBuffers?: boolean): MP4File;

  export class DataStream {
    constructor(buffer?: ArrayBuffer, byteOffset?: number, endianness?: boolean);
    buffer: ArrayBuffer;
    position: number;
  }
}
