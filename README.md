# aily-ui · 阿空设计系统

跨端 (Web + React Native) · 一组件一仓 · 类 antd / shadcn 风。
本仓 = pnpm workspace monorepo · 同时 own 14 个组件 submodule + `apps/*` 内 app (聊天 app 跟 Hermes Agent 联动)。

## monorepo 跑起来

```bash
git clone --recurse-submodules git@github.com:yarnovo/aily-ui.git
cd aily-ui
pnpm install
pnpm dev   # 起 apps/chat (Vite · http://localhost:5173/)
```

workspace 范围 (见 `pnpm-workspace.yaml`):

- `apps/*`        — 内部 app (不发 npm) · 当前: `apps/chat`
- `components/*`  — 9 个 UI 组件 (各自独立 GitHub 仓 · submodule)
- `chat/*`        — 5 个 chat 组件 (各自独立 GitHub 仓 · submodule)

app 内 `workspace:*` 引用 chat/components · 改组件源代码即时热更。

## apps/chat 用法 · 跟 Hermes Agent 联动

`apps/chat` 是 React + Vite + TypeScript 聊天 app · 用 aily-ui 的 chat 组件 (chat-bubble · chat-input · chat-layout · conversation-item · typing-indicator) · 通过 OpenAI 兼容 HTTP 流式接 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)。

启:

```bash
# 1. 先在本机起 hermes (另一窗口)
#    默认监听 http://localhost:8642
#
# 2. 起 chat app
pnpm --filter @aily-ui/chat-app dev   # http://localhost:5173/
```

配 hermes baseUrl · 复制 env:

```bash
cp apps/chat/.env.example apps/chat/.env.local
# 编辑 apps/chat/.env.local
# VITE_HERMES_URL=http://localhost:8642/v1
```

| env | 作用 | default |
|---|---|---|
| `VITE_HERMES_URL` | OpenAI 兼容 baseUrl · 必含 `/v1` 后缀 | `http://localhost:8642/v1` |
| `VITE_HERMES_MODEL` | 模型名 | `hermes` |
| `VITE_HERMES_API_KEY` | hermes 无 auth · 占位字符串 | `hermes-local` |

详见 `apps/chat/README.md`。

## 一行接入

```bash
npm i github:yarnovo/aily-ui-core
```

```tsx
import { Button, BottomNav, ChatBubble, LoginFlow } from '@aily-ui/core'
import '@aily-ui/core/style.css'

<Button variant="primary">下单</Button>
<BottomNav items={[...]} />
<ChatBubble ... />
```

React Native 项目同 import 路径 · Metro 自动 resolve `.native.tsx`：

```tsx
import { Button } from '@aily-ui/core'
<Button variant="primary" onPress={...}>下单</Button>
```

## 仓结构

```
aily-ui/
├── components/                  9 个 UI 组件 (各自独立 GitHub 仓 · 嵌套 submodule)
│   ├── tokens/                  设计 tokens · CSS variables + JS object
│   ├── icons/                   封装 lucide-react · antd 风 props
│   ├── core/                    聚合包 · 类 antd 一行 import 全套
│   ├── button/   avatar/   bottom-nav/
│   ├── lazy-image/   skeleton/
│   └── auth-login/              6 provider 登录流 (phone-sms / email / username / google / wechat / qq)
└── chat/                        chat 系列组件 (5 个嵌套 submodule)
    ├── chat-bubble/   chat-input/   chat-layout/
    └── conversation-item/   typing-indicator/
```

clone 一行真递归：

```bash
git clone --recurse-submodules git@github.com:yarnovo/aily-ui.git
```

## 14 组件清单

### components/ (9 个)

| 名 | 仓 | demo |
|---|---|---|
| Tokens | [aily-ui-tokens](https://github.com/yarnovo/aily-ui-tokens) | [demo](https://yarnovo.github.io/aily-ui-tokens/) |
| Icons | [aily-ui-icons](https://github.com/yarnovo/aily-ui-icons) | [demo](https://yarnovo.github.io/aily-ui-icons/) |
| Core | [aily-ui-core](https://github.com/yarnovo/aily-ui-core) | [demo](https://yarnovo.github.io/aily-ui-core/) |
| Button | [aily-ui-button](https://github.com/yarnovo/aily-ui-button) | [demo](https://yarnovo.github.io/aily-ui-button/) |
| Avatar | [aily-ui-avatar](https://github.com/yarnovo/aily-ui-avatar) | [demo](https://yarnovo.github.io/aily-ui-avatar/) |
| BottomNav | [aily-ui-bottom-nav](https://github.com/yarnovo/aily-ui-bottom-nav) | [demo](https://yarnovo.github.io/aily-ui-bottom-nav/) |
| LazyImage | [aily-ui-lazy-image](https://github.com/yarnovo/aily-ui-lazy-image) | [demo](https://yarnovo.github.io/aily-ui-lazy-image/) |
| Skeleton | [aily-ui-skeleton](https://github.com/yarnovo/aily-ui-skeleton) | [demo](https://yarnovo.github.io/aily-ui-skeleton/) |
| AuthLogin | [aily-ui-auth-login](https://github.com/yarnovo/aily-ui-auth-login) | [demo](https://yarnovo.github.io/aily-ui-auth-login/) · 6 provider |

### chat/ (5 个)

| 名 | 仓 | demo |
|---|---|---|
| ChatBubble | [aily-ui-chat-bubble](https://github.com/yarnovo/aily-ui-chat-bubble) | [demo](https://yarnovo.github.io/aily-ui-chat-bubble/) |
| ChatInput | [aily-ui-chat-input](https://github.com/yarnovo/aily-ui-chat-input) | [demo](https://yarnovo.github.io/aily-ui-chat-input/) |
| ChatLayout | [aily-ui-chat-layout](https://github.com/yarnovo/aily-ui-chat-layout) | [demo](https://yarnovo.github.io/aily-ui-chat-layout/) |
| ConversationItem | [aily-ui-conversation-item](https://github.com/yarnovo/aily-ui-conversation-item) | [demo](https://yarnovo.github.io/aily-ui-conversation-item/) |
| TypingIndicator | [aily-ui-typing-indicator](https://github.com/yarnovo/aily-ui-typing-indicator) | [demo](https://yarnovo.github.io/aily-ui-typing-indicator/) |

## 单组件接入

不想全套 · 直接 npm i 单仓：

```bash
npm i github:yarnovo/aily-ui-button github:yarnovo/aily-ui-tokens
```

```tsx
import { Button } from '@aily-ui/button'
import '@aily-ui/button/style.css'
import '@aily-ui/tokens/style.css'
```

## 暗色

Web 自动跟系统 (`prefers-color-scheme: dark`) · 也支持手动 `<html class="dark">` 强制切。

RN 用 `useColorScheme()` hook · 组件内部自动切 `tokens.light` ↔ `tokens.dark`。

## 老板 5-9 拍

- 主色: shadcn neutral 黑系 (zinc-900) · 不再 rose
- 域名规约: aily-ui-*
- 必 public (UI 组件库都公开)
- 嵌套套布局 · ~/.claude 主仓只 own 1 entry (repos/ui → yarnovo/aily-ui) · aily-ui 仓 own 14 嵌套 submodule

## 2026-05-11 砍 cast 平台残

- agent-switcher (旧 @akong/ 命名空间)
- service-card (C2A2C 市集页)
- note-card (小红书瀑布流)
- top-tabs (新蓝图无 top tab 形态)

4 仓 GitHub archive 留 git history · 后续如需重启走新蓝图新 REQ。
