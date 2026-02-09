import type { Message } from '../types/conversation'

export interface MessageGroup {
  message: Message
  showTail: boolean
  isFirstInGroup: boolean
  isLastInGroup: boolean
}

export function groupMessages(messages: Message[]): MessageGroup[] {
  return messages.map((message, index) => {
    const prev = index > 0 ? messages[index - 1] : null
    const next = index < messages.length - 1 ? messages[index + 1] : null

    const isFirstInGroup = !prev || prev.type !== message.type
    const isLastInGroup = !next || next.type !== message.type
    const showTail = isLastInGroup

    return { message, showTail, isFirstInGroup, isLastInGroup }
  })
}
