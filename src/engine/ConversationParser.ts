import type { Conversation, Message } from '../types/conversation'

const REQUIRED_FIELDS = ['id', 'meta', 'contact', 'messages'] as const

function validateMessage(msg: unknown, index: number): msg is Message {
  const m = msg as Record<string, unknown>
  if (!m.id || typeof m.id !== 'string') {
    throw new Error(`Message at index ${index}: missing or invalid "id"`)
  }
  if (m.type !== 'sent' && m.type !== 'received') {
    throw new Error(`Message "${m.id}": "type" must be "sent" or "received"`)
  }
  if (!m.contentType) {
    throw new Error(`Message "${m.id}": missing "contentType"`)
  }
  if (m.contentType === 'text' && (!m.text || typeof m.text !== 'string')) {
    throw new Error(`Message "${m.id}": text content type requires "text" field`)
  }
  if (typeof m.delay !== 'number' || m.delay < 0) {
    throw new Error(`Message "${m.id}": "delay" must be a non-negative number`)
  }
  return true
}

export function parseConversation(data: unknown): Conversation {
  const d = data as Record<string, unknown>

  for (const field of REQUIRED_FIELDS) {
    if (!(field in d)) {
      throw new Error(`Missing required field: "${field}"`)
    }
  }

  const meta = d.meta as Record<string, unknown>
  if (!meta.title || !meta.device || !meta.language) {
    throw new Error('Meta must include title, device, and language')
  }

  const contact = d.contact as Record<string, unknown>
  if (!contact.name || typeof contact.name !== 'string') {
    throw new Error('Contact must have a name')
  }

  const messages = d.messages
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Conversation must have at least one message')
  }

  messages.forEach((msg, i) => validateMessage(msg, i))

  const settings = (d.settings ?? {}) as Record<string, unknown>

  return {
    id: d.id as string,
    meta: {
      title: meta.title as string,
      theme: (meta.theme as 'light') ?? 'light',
      device: meta.device as 'iphone' | 'android',
      language: (meta.language as string) ?? 'en',
    },
    contact: {
      name: contact.name as string,
      avatar: contact.avatar as string | undefined,
      status: (contact.status as 'online' | 'offline') ?? 'online',
      isVerified: (contact.isVerified as boolean) ?? false,
    },
    messages: messages as Message[],
    settings: {
      autoPlay: (settings.autoPlay as boolean) ?? true,
      speed: (settings.speed as number) ?? 1,
      loop: (settings.loop as boolean) ?? false,
      loopDelay: (settings.loopDelay as number) ?? 3000,
    },
  }
}
