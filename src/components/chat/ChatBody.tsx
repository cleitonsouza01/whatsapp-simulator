import { AnimatePresence } from 'framer-motion'
import type { Message, MessageDeliveryStatus } from '../../types/conversation'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { DateSeparator } from './DateSeparator'
import { groupMessages } from '../../utils/groupMessages'
import { useAutoScroll } from '../../hooks/useAutoScroll'

interface ChatBodyProps {
  messages: Message[]
  isTyping: boolean
  dateLabel: string
  messageStatuses: Record<string, MessageDeliveryStatus>
}

export function ChatBody({ messages, isTyping, dateLabel, messageStatuses }: ChatBodyProps) {
  const scrollRef = useAutoScroll([messages.length, isTyping])
  const grouped = groupMessages(messages)

  return (
    <div
      ref={scrollRef}
      className="flex-1 min-h-0 overflow-y-auto wa-scrollbar wa-chat-bg py-2"
    >
      {messages.length > 0 && <DateSeparator label={dateLabel} />}

      {grouped.map(({ message, showTail }) => (
        <MessageBubble
          key={message.id}
          message={message}
          showTail={showTail}
          currentStatus={messageStatuses[message.id]}
        />
      ))}

      <AnimatePresence>
        {isTyping && <TypingIndicator />}
      </AnimatePresence>
    </div>
  )
}
