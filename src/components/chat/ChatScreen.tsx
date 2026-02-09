import type { Message, Contact, MessageDeliveryStatus } from '../../types/conversation'
import { ChatHeader } from './ChatHeader'
import { ChatBody } from './ChatBody'
import { ChatInputBar } from './ChatInputBar'
import { getLabels } from '../../styles/whatsapp-theme'

interface ChatScreenProps {
  contact: Contact
  messages: Message[]
  isTyping: boolean
  language: string
  messageStatuses: Record<string, MessageDeliveryStatus>
}

export function ChatScreen({ contact, messages, isTyping, language, messageStatuses }: ChatScreenProps) {
  const labels = getLabels(language)

  return (
    <div className="flex flex-col h-full">
      <ChatHeader contact={contact} language={language} isTyping={isTyping} />
      <ChatBody
        messages={messages}
        isTyping={isTyping}
        dateLabel={labels.today}
        messageStatuses={messageStatuses}
      />
      <ChatInputBar language={language} />
    </div>
  )
}
