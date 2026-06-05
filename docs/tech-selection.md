# 技术选型文档 — 乐队排练辅助工具

## 1. 概述

本文档记录乐队排练辅助工具的技术选型决策，覆盖前端、后端、音频处理、AI 模型、构建工具和部署方案。

## 2. 技术栈总览

| 层级 | 技术选型 | 版本 | 选型理由 |
|:---|:---|:---|:---|
| 前端框架 | React + TypeScript | 18.x / 5.x | 生态成熟，Type safety，社区活跃 |
| 构建工具 | Vite | 5.x | 快速 HMR，原生 ESM，配置简单 |
| UI 样式 | TailwindCSS | 3.x | 原子化 CSS，快速迭代，体积可控 |
| 状态管理 | Zustand | 4.x | 轻量、无 boilerplate、支持 middlewares |
| 路由 | React Router | 6.x | 标准选择，嵌套路由支持好 |
| 后端框架 | Python FastAPI | 0.115+ | 异步高性能，自动 OpenAPI 文档，Python 生态 AI 库丰富 |
| AI 推理 | ONNX Runtime Web | - | 浏览器端推理，减少后端依赖 |
| 音轨分离 | Demucs (via API) | - | Facebook 开源，分离质量最佳 |
| 音频处理 | WebAudio API + Tone.js | - | 浏览器原生，实时处理能力强 |
| 包管理 | pnpm | 11.x | Monorepo workspace 支持，磁盘效率高 |
| 代码规范 | ESLint + Prettier + Ruff | - | TS/JS + Python 双语言覆盖 |
| CI/CD | GitHub Actions | - | 免费，与 GitHub 仓库集成好 |

## 3. 详细选型决策

### 3.1 前端框架

**选择：React + TypeScript + Vite**

备选方案对比：

| 方案 | 优点 | 缺点 | 结论 |
|:---|:---|:---|:---|
| React + Vite | 生态最大，组件库丰富，WebAudio 集成资料多 | 包体积相对较大 | ✅ 选择 |
| Vue 3 + Vite | 学习曲线低，中文生态好 | WebAudio/音乐类项目资料较少 | ❌ |
| 原生 JS | 无框架开销 | 开发效率低，难以维护 | ❌ |

**理由**：
- 目标用户为乐队成员，产品需要丰富的交互（波形展示、乐谱渲染），React 组件化更适合
- TypeScript 提供类型安全，降低音频处理相关 bug
- Vite 开发体验好，HMR 快速

### 3.2 后端框架

**选择：Python FastAPI**

备选方案对比：

| 方案 | 优点 | 缺点 | 结论 |
|:---|:---|:---|:---|
| FastAPI | 异步，AI/ML 生态好，自动文档 | 需要 Python 环境 | ✅ 选择 |
| Express (Node.js) | 与前端同语言 | AI/ML 库不如 Python 丰富 | ❌ |
| Go Fiber | 高性能 | AI 生态差，开发效率低 | ❌ |

**理由**：
- AI 模型（Demucs、音乐转写模型）主要在 Python 生态
- FastAPI 异步处理适合文件上传和长时间推理任务
- 自动生成 OpenAPI 文档，前后端协作方便

### 3.3 音频处理方案

**选择：WebAudio API（浏览器端）+ Demucs（后端分离）**

分层策略：
- **实时播放/循环/标记**：WebAudio API（浏览器端，零延迟）
- **AI 识谱**：ONNX Runtime Web（浏览器端推理）或 FastAPI 后端
- **音轨分离**：Demucs（计算密集，需后端处理）

**WebAudio API 能力验证**：
- ✅ 音频解码（decodeAudioData）
- ✅ 实时播放控制（start/stop/loop）
- ✅ 音频节点图（AudioContext, GainNode, etc.）
- ✅ 离线渲染（OfflineAudioContext）

### 3.4 AI 模型方案

**AI 识谱**：
- 首选：Basic Pitch（Spotify 开源，轻量，可转 ONNX 在浏览器运行）
- 备选：Piano Transformer（更大但更准确）

**音轨分离**：
- 首选：Demucs v4（Facebook/Meta，分离质量业界最佳）
- 部署方式：FastAPI 后端调用，返回分离后的音轨文件

**浏览器端推理**：
- ONNX Runtime Web：支持 WASM/WebGL 后端，可在浏览器运行 ONNX 模型
- 目标：将轻量模型（如 Basic Pitch）转为 ONNX 格式，实现纯前端识谱

### 3.5 项目结构

```
band-rehearsal-tool/
├── apps/
│   ├── web/          # React + Vite 前端
│   └── api/          # Python FastAPI 后端
├── packages/
│   └── shared/       # 共享类型定义和工具函数
├── docs/             # 文档
│   └── tech-selection.md
├── pnpm-workspace.yaml
└── package.json
```

### 3.6 构建与部署

**开发环境**：
- pnpm monorepo 管理多包
- Vite dev server (前端) + uvicorn (后端)
- 前端 proxy 到后端 API

**CI/CD**：
- GitHub Actions: lint → typecheck → build → test
- 前端构建产物：静态文件，可部署到 Vercel/Netlify
- 后端：Docker 容器化部署

**生产部署（未来）**：
- 前端：CDN + 静态托管
- 后端：Docker + 云服务（阿里云/AWS）
- AI 模型：ONNX Runtime + GPU 实例（如需要）

## 4. 验证计划

### 4.1 前端验证
- [x] 项目可正常 `pnpm dev` 启动
- [x] 页面可正常渲染
- [ ] WebAudio API 音频播放可跑通
- [ ] 文件上传功能正常

### 4.2 后端验证
- [x] FastAPI 可正常启动
- [ ] Health endpoint 返回 200
- [ ] 文件上传接口可用

### 4.3 集成验证
- [ ] 前端可调用后端 API
- [ ] 音频文件可从前端传输到后端

## 5. 风险与后续

| 风险 | 影响 | 缓解措施 |
|:---|:---|:---|
| ONNX 模型浏览器端性能不足 | 识谱速度慢 | 降级到后端推理 |
| Demucs 部署资源需求高 | 后端成本高 | 先用 CPU 推理，后续按需升级 GPU |
| WebAudio API 浏览器兼容性 | 部分功能不可用 | 降级提示，优先 Chromium 内核 |
