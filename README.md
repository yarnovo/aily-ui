# aily-ui · 阿空设计系统

跨端 (Web + React Native) · 一组件一仓 · 类 antd / shadcn 风。

## 一行接入

```bash
npm i github:yarnovo/aily-ui-core
```

```tsx
import { Button, NoteCard, ChatBubble } from '@aily-ui/core'
import '@aily-ui/core/style.css'

<Button variant="primary">下单</Button>
<NoteCard ... />
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
├── components/                  14 个 UI 组件 (各自独立 GitHub 仓 · 嵌套 submodule)
│   ├── tokens/                  设计 tokens · CSS variables + JS object
│   ├── icons/                   封装 lucide-react · antd 风 props
│   ├── core/                    聚合包 · 类 antd 一行 import 全套
│   ├── button/   avatar/   bottom-nav/   agent-switcher/
│   ├── service-card/   top-tabs/   note-card/
│   ├── lazy-image/   skeleton/
│   ├── auth-login/              手机号 + OTP 登录组件
│   └── employee-card/           agent 员工求职简历卡片 (interviewer 真挑选)
└── chat/                        chat 系列组件 (5 个嵌套 submodule)
    ├── chat-bubble/   chat-input/   chat-layout/
    ├── conversation-item/   typing-indicator/
```

clone 一行真递归：

```bash
git clone --recurse-submodules git@github.com:yarnovo/aily-ui.git
```

## 19 组件清单

### components/ (14 个)

| 名 | 仓 | demo |
|---|---|---|
| Tokens | [aily-ui-tokens](https://github.com/yarnovo/aily-ui-tokens) | [demo](https://yarnovo.github.io/aily-ui-tokens/) |
| Icons | [aily-ui-icons](https://github.com/yarnovo/aily-ui-icons) | [demo](https://yarnovo.github.io/aily-ui-icons/) |
| Core | [aily-ui-core](https://github.com/yarnovo/aily-ui-core) | [demo](https://yarnovo.github.io/aily-ui-core/) |
| Button | [aily-ui-button](https://github.com/yarnovo/aily-ui-button) | [demo](https://yarnovo.github.io/aily-ui-button/) |
| Avatar | [aily-ui-avatar](https://github.com/yarnovo/aily-ui-avatar) | [demo](https://yarnovo.github.io/aily-ui-avatar/) |
| BottomNav | [aily-ui-bottom-nav](https://github.com/yarnovo/aily-ui-bottom-nav) | [demo](https://yarnovo.github.io/aily-ui-bottom-nav/) |
| AgentSwitcher | [aily-ui-agent-switcher](https://github.com/yarnovo/aily-ui-agent-switcher) | [demo](https://yarnovo.github.io/aily-ui-agent-switcher/) |
| ServiceCard | [aily-ui-service-card](https://github.com/yarnovo/aily-ui-service-card) | [demo](https://yarnovo.github.io/aily-ui-service-card/) |
| TopTabs | [aily-ui-top-tabs](https://github.com/yarnovo/aily-ui-top-tabs) | [demo](https://yarnovo.github.io/aily-ui-top-tabs/) |
| NoteCard | [aily-ui-note-card](https://github.com/yarnovo/aily-ui-note-card) | [demo](https://yarnovo.github.io/aily-ui-note-card/) |
| LazyImage | [aily-ui-lazy-image](https://github.com/yarnovo/aily-ui-lazy-image) | [demo](https://yarnovo.github.io/aily-ui-lazy-image/) |
| Skeleton | [aily-ui-skeleton](https://github.com/yarnovo/aily-ui-skeleton) | [demo](https://yarnovo.github.io/aily-ui-skeleton/) |
| AuthLogin | [aily-ui-auth-login](https://github.com/yarnovo/aily-ui-auth-login) | [demo](https://yarnovo.github.io/aily-ui-auth-login/) |
| EmployeeCard | [aily-ui-employee-card](https://github.com/yarnovo/aily-ui-employee-card) | [demo](https://yarnovo.github.io/aily-ui-employee-card/) |

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
- 嵌套套布局 · ~/.claude 主仓只 own 1 entry (repos/ui → yarnovo/aily-ui) · aily-ui 仓 own 18 嵌套 submodule
