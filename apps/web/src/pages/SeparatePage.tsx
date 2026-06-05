import { useState, useCallback } from "react";

export default function SeparatePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

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

  const handleSeparate = useCallback(async () => {
    if (!audioFile) return;

    setStatus("正在上传...");
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("/api/separate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus("分离请求已发送，处理中...");
    } catch (err) {
      setStatus(
        `分离失败: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }, [audioFile]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">音轨分离</h2>
        <p className="mt-1 text-gray-600">
          将完整音轨拆分为独立的乐器和人声轨道
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="separate-upload"
        />
        <label htmlFor="separate-upload" className="cursor-pointer">
          <div className="text-4xl mb-2">🎚️</div>
          <p className="text-gray-600">
            {audioFile
              ? audioFile.name
              : "点击或拖拽上传音频文件 (MP3, WAV, FLAC)"}
          </p>
        </label>
      </div>

      {/* Actions */}
      {audioFile && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleSeparate}
            className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium
                       hover:bg-primary-600 transition-colors"
          >
            🎚️ 开始分离
          </button>
          <span className="text-sm text-gray-500">{status}</span>
        </div>
      )}

      {/* Placeholder for results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          分离结果
        </h3>
        <p className="text-gray-500 text-sm">
          {audioFile
            ? "音轨分离功能开发中，敬请期待..."
            : "请先上传音频文件"}
        </p>
      </div>
    </div>
  );
}
