export type MessageType = 'sent' | 'received'
export type ContentType = 'text' | 'image' | 'audio'
export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read'
export type PlaybackState = 'idle' | 'playing' | 'paused' | 'complete'
export type DeviceType = 'iphone' | 'android'
export type ThemeType = 'light'

export interface StatusTransition {
  status: MessageDeliveryStatus
  delay: number
}

export interface Message {
  id: string
  type: MessageType
  contentType: ContentType
  text?: string
  imageUrl?: string
  caption?: string
  timestamp: string
  delay: number
  showTyping?: boolean
  typingDuration?: number
  status?: MessageDeliveryStatus
  statusTransitions?: StatusTransition[]
}

export interface Contact {
  name: string
  avatar?: string
  status?: 'online' | 'offline' | 'typing'
  isVerified?: boolean
  phone?: string
}

export interface ConversationMeta {
  title: string
  theme: ThemeType
  device: DeviceType
  language: string
}

export interface ConversationSettings {
  autoPlay: boolean
  speed: number
  loop: boolean
  loopDelay: number
}

export interface Conversation {
  id: string
  meta: ConversationMeta
  contact: Contact
  messages: Message[]
  settings: ConversationSettings
}

export interface PlaybackProgress {
  currentIndex: number
  totalMessages: number
  percentage: number
}
