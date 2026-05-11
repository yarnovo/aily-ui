/**
 * Hermes Agent 后端连接配置
 *
 * 解析顺序 (优先级高→低):
 * 1. import.meta.env.VITE_HERMES_URL / VITE_HERMES_MODEL / VITE_HERMES_API_KEY (Vite 编译期 .env)
 * 2. fallback default · 本地 hermes 默认端口 8642
 *
 * baseUrl 必须含 `/v1` 后缀 (OpenAI 兼容 API 规约 · openai SDK 自动拼 /chat/completions)
 */
export interface HermesConfig {
  baseUrl: string
  model: string
  apiKey: string
}

export function loadHermesConfig(): HermesConfig {
  const baseUrl = import.meta.env.VITE_HERMES_URL || 'http://localhost:8642/v1'
  const model = import.meta.env.VITE_HERMES_MODEL || 'hermes'
  const apiKey = import.meta.env.VITE_HERMES_API_KEY || 'hermes-local'
  return { baseUrl, model, apiKey }
}
