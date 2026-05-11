# @aily-ui/chat-app

aily-ui monorepo 内 `apps/chat` · React + Vite 聊天 app · 接 Hermes Agent 后端 (OpenAI 兼容 HTTP 流式)。

## 跑起来

从仓根 (`~/.claude/repos/ui/`):

```bash
pnpm install
pnpm --filter @aily-ui/chat-app dev
# 或顶层快捷
pnpm dev
```

打开 http://localhost:5173

## 跟 hermes 联动

默认指 `http://localhost:8642/v1` (NousResearch/hermes-agent 本地默认端口)。

覆盖方式 · 复制 `.env.example` 为 `.env.local`:

```bash
cp apps/chat/.env.example apps/chat/.env.local
```

`.env.local`:

```
VITE_HERMES_URL=http://localhost:8642/v1
VITE_HERMES_MODEL=hermes
VITE_HERMES_API_KEY=hermes-local
```

| env | 作用 | default |
|---|---|---|
| `VITE_HERMES_URL` | OpenAI 兼容 baseUrl · 必含 `/v1` 后缀 | `http://localhost:8642/v1` |
| `VITE_HERMES_MODEL` | 模型名 · hermes 默认忽略 | `hermes` |
| `VITE_HERMES_API_KEY` | hermes 无 auth · 占位字符串 | `hermes-local` |

## 实现

- React + Vite + TypeScript
- UI 用 aily-ui 5 件套 (`@aily-ui/chat-bubble` · `chat-input` · `chat-layout` · `conversation-item` · `typing-indicator`) · 通过 `workspace:*` 引用仓内 submodule
- 流式调用走 `openai` npm SDK · `chat.completions.create({ stream: true })` · 浏览器端直连 (`dangerouslyAllowBrowser: true`)
- 无 auth · 无后端 session · in-memory message list

## 文件

```
apps/chat/
├── index.html               vite entry
├── package.json             @aily-ui/chat-app
├── tsconfig.json
├── vite.config.ts           5173 port
├── .env.example             VITE_HERMES_URL 等
└── src/
    ├── main.tsx             ReactDOM mount + 各组件 css import
    ├── App.tsx              壳
    ├── styles.css           html/body/#root reset
    ├── components/
    │   └── ChatPage.tsx     主聊天页 · 用 ChatLayout + ChatBubble + ChatInput + TypingIndicator
    └── lib/
        ├── config.ts        loadHermesConfig (读 import.meta.env)
        └── hermes-client.ts createHermesClient (openai SDK 包一层 · stream yield delta)
```

## 后续

- 多会话 (用 `@aily-ui/conversation-item` 渲染左侧会话列表 · 本轮 1 会话先)
- 历史持久化 (localStorage / IndexedDB)
- 取消生成按钮 (AbortController 已接好 · UI 没暴露按钮)
- 错误重试
