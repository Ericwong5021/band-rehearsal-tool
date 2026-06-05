import { Link } from "react-router-dom";

const features = [
  {
    title: "AI 识谱转写",
    description: "自动识别音频中的乐谱信息，转写为可读格式",
    icon: "🎼",
    href: "/transcribe",
    status: "开发中",
  },
  {
    title: "乐句标记与循环",
    description: "标记乐句起止点，循环播放便于反复练习",
    icon: "🔁",
    href: "#",
    status: "规划中",
  },
  {
    title: "音轨分离",
    description: "将完整音轨拆分为独立乐器/人声轨道",
    icon: "🎚️",
    href: "/separate",
    status: "开发中",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          欢迎使用乐队排练辅助工具
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          AI 驱动的音乐排练助手，让每一次排练更高效
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.href}
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200
                       hover:shadow-md hover:border-primary-300 transition-all"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
            <span
              className={`inline-block mt-3 px-2 py-1 text-xs rounded-full ${
                feature.status === "开发中"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {feature.status}
            </span>
          </Link>
        ))}
      </div>

      {/* Tech Stack Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">技术栈</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-900">前端</span>
            <p>React + TypeScript + Vite</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">音频</span>
            <p>WebAudio API</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">后端</span>
            <p>Python FastAPI</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">AI</span>
            <p>ONNX Runtime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
