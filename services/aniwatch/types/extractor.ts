export interface Video {
  url: string;
  quality?: string;
  isM3U8?: boolean;
  size?: number;
  [x: string]: unknown;
}

export interface Subtitle {
  kind: string;
  file: string;
  label: string;
}

export interface Intro {
  start: number;
  end: number;
}
