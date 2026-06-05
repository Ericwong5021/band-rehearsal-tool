import { useState, useRef, useCallback } from "react";

export default function TranscribePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<string>("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAudioFile(file);
        setStatus(`已选择: ${file.name}`);
      }
    },
    [],
  );

  const handlePlay = useCallback(async () => {
    if (!audioFile) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;

      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      sourceRef.current = ctx.createBufferSource();
      sourceRef.current.buffer = audioBuffer;
      sourceRef.current.connect(ctx.destination);
      sourceRef.current.start();

      setIsPlaying(true);
      setStatus("正在播放...");

      sourceRef.current.onended = () => {
        setIsPlaying(false);
        setStatus("播放结束");
      };
    } catch (err) {
      setStatus(`播放失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [audioFile]);

  const handleStop = useCallback(() => {
    sourceRef.current?.stop();
    setIsPlaying(false);
    setStatus("已停止");
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI 识谱转写</h2>
        <p className="mt-1 text-gray-600">
          上传音频文件，AI 自动识别乐谱信息
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="audio-upload"
        />
        <label htmlFor="audio-upload" className="cursor-pointer">
          <div className="text-4xl mb-2">🎵</div>
          <p className="text-gray-600">
            {audioFile
              ? audioFile.name
              : "点击或拖拽上传音频文件 (MP3, WAV, FLAC)"}
          </p>
        </label>
      </div>

      {/* Playback Controls */}
      {audioFile && (
        <div className="flex items-center gap-4">
          <button
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={!audioFile}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isPlaying
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-primary-500 text-white hover:bg-primary-600"
            } disabled:opacity-50`}
          >
            {isPlaying ? "⏹ 停止" : "▶️ 播放"}
          </button>
          <span className="text-sm text-gray-500">{status}</span>
        </div>
      )}

      {/* Placeholder for transcription result */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          转写结果
        </h3>
        <p className="text-gray-500 text-sm">
          {audioFile
            ? "AI 识谱功能开发中，敬请期待..."
            : "请先上传音频文件"}
        </p>
      </div>
    </div>
  );
}
