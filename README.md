# 乐队排练辅助工具

AI 驱动的音乐排练助手，让每一次排练更高效。

## 功能

- 🎼 **AI 识谱转写** — 自动识别音频中的乐谱信息
- 🔁 **乐句标记与循环** — 标记乐句起止点，循环播放便于反复练习
- 🎚️ **音轨分离** — 将完整音轨拆分为独立乐器/人声轨道

## 技术栈

| 层级     | 选型                                       |
| :------- | :----------------------------------------- |
| 前端     | React 18 + TypeScript + Vite + TailwindCSS |
| 后端     | Python FastAPI                             |
| 音频     | WebAudio API + Demucs                      |
| AI 推理  | ONNX Runtime Web                           |
| 状态管理 | Zustand                                    |
| 包管理   | pnpm monorepo                              |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动前端开发服务器
pnpm dev

# 构建
pnpm build
```

## 项目结构

```
band-rehearsal-tool/
├── apps/web/          # React + Vite 前端
├── apps/api/          # Python FastAPI 后端
├── packages/shared/   # 共享类型定义
├── docs/              # 文档
└── .github/workflows/ # CI/CD 配置
```

## 文档

- [技术选型文档](docs/tech-selection.md)
