import { motion } from 'framer-motion'
import type { Message, MessageDeliveryStatus } from '../../types/conversation'
import { MessageStatus } from './MessageStatus'
import { messageBubbleVariants } from '../../styles/animations'

interface MessageBubbleProps {
  message: Message
  showTail: boolean
  currentStatus?: MessageDeliveryStatus
}

function SentTail() {
  return (
    <svg
      className="absolute -right-[8px] bottom-0"
      width="8"
      height="13"
      viewBox="0 0 8 13"
    >
      <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" fill="#d9fdd3" />
    </svg>
  )
}

function ReceivedTail() {
  return (
    <svg
      className="absolute -left-[8px] bottom-0"
      width="8"
      height="13"
      viewBox="0 0 8 13"
    >
      <path d="M2.812 0H8v11.193L1.533 2.568C.474 1.156 1.042 0 2.812 0z" fill="#ffffff" />
    </svg>
  )
}

export function MessageBubble({ message, showTail, currentStatus }: MessageBubbleProps) {
  const isSent = message.type === 'sent'
  const status = currentStatus ?? message.status

  return (
    <motion.div
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} px-[18px] mb-[2px]`}
      variants={messageBubbleVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div
        className={`
          relative max-w-[80%] px-[9px] pt-[6px] pb-[8px] shadow-sm
          ${isSent
            ? `bg-wa-bubble-sent ${showTail ? 'rounded-lg rounded-br-none' : 'rounded-lg'}`
            : `bg-wa-bubble-received ${showTail ? 'rounded-lg rounded-bl-none' : 'rounded-lg'}`
          }
        `}
      >
        {showTail && (isSent ? <SentTail /> : <ReceivedTail />)}

        {/* Text content */}
        <div className="flex flex-wrap items-end gap-x-1">
          <span
            className="text-wa-text-primary whitespace-pre-wrap break-words"
            style={{ fontSize: '14.2px', lineHeight: '19px' }}
          >
            {message.text}
          </span>

          {/* Timestamp + status */}
          <span className="flex items-center gap-[2px] ml-auto mt-auto translate-y-[3px]">
            <span className="text-wa-timestamp text-[11px] leading-none whitespace-nowrap">
              {message.timestamp}
            </span>
            {isSent && status && <MessageStatus status={status} />}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
