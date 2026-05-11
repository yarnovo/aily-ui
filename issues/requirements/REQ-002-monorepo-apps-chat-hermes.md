---
id: REQ-002
title: ui 仓改 pnpm workspace monorepo · 加 apps/chat 接 Hermes Agent
status: pr-open
type: requirement
owner: lead-claude
created: 2026-05-11
parent_scenario: blueprint-2026-05-11
related_blueprint: 老板 5-11 新方向 · 1 skill + 1 CLI · UI 用现有 aily-ui · 跟 hermes (NousResearch/hermes-agent) 联动
---

## 描述

老板 5-11 新方向 · 我们做"1 skill + 1 CLI" · UI 用现有 aily-ui · 跟 hermes (NousResearch/hermes-agent) 联动。

ui 仓当前是 14 个 git submodule 聚合 (9 components + 5 chat) · 现要：

1. ui 仓改为 pnpm workspace monorepo
2. 保留所有 git submodule (components/* 和 chat/*) 不动
3. 新增 `apps/chat/` 目录:
   - React + Vite + TypeScript
   - 聊天页 1 个 (用 ui/chat/* 组件: chat-bubble · chat-input · chat-layout · conversation-item · typing-indicator)
   - 接 Hermes Agent 后端 (OpenAI 兼容 HTTP · POST http://localhost:8642/v1/chat/completions · 流式 SSE)
   - 默认 baseUrl 可配 (env VITE_HERMES_URL 或 config 文件)
   - 无 auth · 用户直接进来聊
4. 顶层 `package.json` 加 pnpm-workspace · 列 `apps/*` + `components/*` + `chat/*`
5. apps/chat 内自给自足 deps:
   - react / react-dom
   - @aily-ui/chat-bubble · chat-input · chat-layout · conversation-item · typing-indicator (workspace:* 引用)
   - openai SDK (OpenAI 兼容 client 指 hermes baseUrl)
6. dev: `pnpm --filter @aily-ui/chat-app dev` 起 vite 5173 端口
7. README 加新章节: "apps/chat 用法 · 怎么跟 hermes 联动"
8. PR 开 (新分支 `feat/chat-app-hermes`)

## acceptance

- [ ] 顶层 `package.json` + `pnpm-workspace.yaml` 落 · workspace 含 `apps/*` + `components/*` + `chat/*`
- [ ] `apps/chat/` 目录建好 · React + Vite + TS · 1 聊天页
- [ ] apps/chat 用 ui/chat/* 5 个组件 (chat-bubble · chat-input · chat-layout · conversation-item · typing-indicator)
- [ ] apps/chat 用 `openai` SDK 调 `http://localhost:8642/v1/chat/completions` 流式 SSE
- [ ] `VITE_HERMES_URL` env 可覆盖 baseUrl · `.env.example` 落
- [ ] `pnpm install` 跑通 · workspace deps 真 resolve
- [ ] `pnpm --filter @aily-ui/chat-app dev` 起 vite (5173) 不报错
- [ ] `pnpm --filter @aily-ui/chat-app build` build 成功
- [ ] README 加 `## apps/chat 用法` 段 · 含 dev 命令 + hermes baseUrl 配置
- [ ] PR 开 (feat/chat-app-hermes)

## 4 问 (完工 paste)

- IMPL: ui 仓顶层加 `package.json` + `pnpm-workspace.yaml` (apps/* + components/* + chat/*) · 新增 `apps/chat/` (Vite + React + TS + openai SDK · 1 个 ChatPage 用 chat-bubble/chat-input/chat-layout/typing-indicator) · 默认 baseUrl `http://localhost:8642/v1` · env `VITE_HERMES_URL` 覆盖 · README 加 `## apps/chat 用法` 段
- DONE:
  - `pnpm install` ✓ (16 workspace projects · 0 错)
  - workspace 软链 ✓: `apps/chat/node_modules/@aily-ui/{chat-bubble,chat-input,chat-layout,conversation-item,typing-indicator,tokens}` 都指 `../../../../chat/X` / `../../../../components/X`
  - `pnpm --filter @aily-ui/chat-app typecheck` ✓ (tsc --noEmit 0 错)
  - `pnpm --filter @aily-ui/chat-app build` ✓ (vite v8.0.11 · 173 modules · 326.47 kB / 93.70 kB gzip · 402ms)
  - `pnpm --filter @aily-ui/chat-app dev` ✓ (vite ready 71ms · 5173 端口 · curl 127.0.0.1:5173 返 200 + 真 html title "aily chat · Hermes Agent")
- SELF-VERIFY:
  - 顶层 `pnpm-workspace.yaml` 列 `apps/*` + `components/*` + `chat/*`
  - `apps/chat/package.json` deps 用 `workspace:*` · 不写 hard version
  - `apps/chat/src/lib/hermes-client.ts` 用 `openai` SDK · `chat.completions.create({ stream: true })` 真流式 · for-await yield delta · `dangerouslyAllowBrowser: true` (浏览器端直连本地 hermes)
  - `loadHermesConfig()` 读 `import.meta.env.VITE_HERMES_URL` · default `http://localhost:8642/v1`
  - 14 个 submodule 全保留 · `.gitmodules` 不动
- GUARDS:
  - workspace deps 用 `workspace:*` · 改 chat/* 组件源代码即时 hot reload (不再 npm i 真包)
  - `.env.example` 落 · 复制 `.env.local` 覆盖 · 不写死 baseUrl
  - typecheck + build 都进 `apps/chat/package.json` scripts · CI 可挂
  - apps/chat 不在 `chat/*` 也不在 `components/*` · 不冲突 publish 路径 (chat/* components/* 是 npm 包 · apps/* 不发)

## 不做

- 不发布 apps/chat 到 npm (内部 app 不是 lib)
- 不接 auth (老板拍 · 直接进来聊)
- 不接其他后端 (只 hermes · OpenAI 兼容)
- 不动 14 个 submodule 内容 (保留 git submodule 不动)
- 不接历史会话持久化 (本轮先 in-memory)
