import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// aily-ui tokens (CSS variables --ak-*)
import '@aily-ui/tokens/style.css'

// chat 组件样式
import '@aily-ui/chat-bubble/style.css'
import '@aily-ui/chat-input/style.css'
import '@aily-ui/chat-layout/style.css'
import '@aily-ui/conversation-item/style.css'
import '@aily-ui/typing-indicator/style.css'

import './styles.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
