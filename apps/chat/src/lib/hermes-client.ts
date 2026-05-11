/**
 * Hermes Agent 客户端 · OpenAI 兼容 HTTP 流式调用
 *
 * 实现:
 * - openai SDK (npm `openai`) · ChatCompletions stream:true
 * - SSE chunk 增量 yield 给 UI
 * - dangerouslyAllowBrowser:true · 浏览器端直连本地 hermes (无 secret · key 是占位)
 *
 * 用法:
 *   const client = createHermesClient(config)
 *   for await (const delta of client.stream(messages)) {
 *     setText((t) => t + delta)
 *   }
 */
import OpenAI from 'openai'
import type { HermesConfig } from './config'

export type ChatRole = 'system' | 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface HermesClient {
  /** 流式调用 · 异步 yield 每个 delta 文本块 */
  stream(messages: ChatMessage[], signal?: AbortSignal): AsyncIterable<string>
}

export function createHermesClient(config: HermesConfig): HermesClient {
  const openai = new OpenAI({
    baseURL: config.baseUrl,
    apiKey: config.apiKey,
    // hermes 是浏览器端直连的本地后端 · 没有真 secret · 显式允许
    dangerouslyAllowBrowser: true,
  })

  return {
    async *stream(messages, signal) {
      const stream = await openai.chat.completions.create(
        {
          model: config.model,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        },
        { signal }
      )

      for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content
        if (delta) yield delta
      }
    },
  }
}
