/**
 * 共享类型定义和工具函数
 */

// 音频文件类型
export type AudioFormat = "mp3" | "wav" | "flac" | "ogg";

// 音轨类型
export type TrackType =
  | "vocals"
  | "drums"
  | "bass"
  | "other"
  | "piano"
  | "guitar";

// 分离结果
export interface SeparationResult {
  tracks: {
    type: TrackType;
    url: string;
    duration: number;
  }[];
}

// 转写结果
export interface TranscriptionResult {
  notes: {
    pitch: string;
    start: number;
    end: number;
    velocity: number;
  }[];
  tempo: number;
  timeSignature: string;
}

// API 响应通用类型
export interface ApiResponse<T> {
  status: "ok" | "error" | "not_implemented";
  data?: T;
  message?: string;
}
