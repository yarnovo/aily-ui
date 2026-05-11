import { useCallback, useMemo, useRef, useState } from 'react'
import { ChatBubble } from '@aily-ui/chat-bubble'
import { ChatInput } from '@aily-ui/chat-input'
import { ChatLayout } from '@aily-ui/chat-layout'
import { TypingIndicator } from '@aily-ui/typing-indicator'

import { loadHermesConfig } from '../lib/config'
import { createHermesClient, type ChatMessage } from '../lib/hermes-client'

interface UIMessage extends ChatMessage {
  id: string
  status?: 'sending' | 'sent' | 'failed'
}

function uid() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function ChatPage() {
  const config = useMemo(() => loadHermesConfig(), [])
  const client = useMemo(() => createHermesClient(config), [config])

  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: uid(),
      role: 'assistant',
      content: '我是 Hermes Agent · 问我点什么?',
      status: 'sent',
    },
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return

      const userMsg: UIMessage = {
        id: uid(),
        role: 'user',
        content: text,
        status: 'sent',
      }
      const assistantId = uid()
      const assistantMsg: UIMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        status: 'sending',
      }

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setInput('')
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      // history for hermes (不含正在生成的 assistant 占位)
      const history: ChatMessage[] = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }))

      try {
        let acc = ''
        for await (const delta of client.stream(history, controller.signal)) {
          acc += delta
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
          )
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, status: 'sent' } : m))
        )
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  status: 'failed',
                  content:
                    m.content ||
                    `[连接 hermes 失败] ${errMsg}\n请检查 baseUrl=${config.baseUrl} 是否可达`,
                }
              : m
          )
        )
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [client, config.baseUrl, messages, streaming]
  )

  const header = (
    <div
      data-testid="chat-header"
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--ak-border-subtle, #e4e4e7)',
        background: 'var(--ak-bg-canvas, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 16 }}>Hermes Agent</div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--ak-fg-tertiary, #71717a)',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {config.baseUrl}
      </div>
    </div>
  )

  const footer = (
    <ChatInput
      value={input}
      onChange={setInput}
      onSend={sendMessage}
      disabled={streaming}
      placeholder={streaming ? '生成中...' : '输入消息...'}
    />
  )

  return (
    <ChatLayout header={header} footer={footer} scrollKey={messages.length}>
      {messages.map((m) => {
        // assistant streaming · content 还空 · 显示 typing-indicator
        if (m.role === 'assistant' && m.status === 'sending' && !m.content) {
          return (
            <div
              key={m.id}
              data-testid="typing"
              style={{ padding: '4px 12px', display: 'flex', justifyContent: 'flex-start' }}
            >
              <TypingIndicator variant="dots" size="md" inBubble />
            </div>
          )
        }
        return (
          <ChatBubble
            key={m.id}
            role={m.role}
            variant="text"
            content={m.content}
            status={m.role === 'user' ? m.status : undefined}
          />
        )
      })}
    </ChatLayout>
  )
}

export default ChatPage
