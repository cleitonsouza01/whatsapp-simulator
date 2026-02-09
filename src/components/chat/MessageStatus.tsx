import { motion } from 'framer-motion'
import type { MessageDeliveryStatus } from '../../types/conversation'
import { tickTransition } from '../../styles/animations'

interface MessageStatusProps {
  status: MessageDeliveryStatus
}

function SingleCheck({ color }: { color: string }) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11">
      <path
        d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.332c0 .127.042.238.127.323l2.669 2.669c.076.076.178.178.344.178.153 0 .254-.102.33-.178l6.88-8.464a.434.434 0 0 0 .127-.317.456.456 0 0 0-.127-.331l-.344-.14z"
        fill={color}
      />
    </svg>
  )
}

function DoubleCheck({ color }: { color: string }) {
  return (
    <svg width="18" height="11" viewBox="0 0 18 11">
      <path
        d="M17.394.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.49-1.55.254-.314a.434.434 0 0 0 .127-.317.456.456 0 0 0-.127-.33l-.344-.141a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-3.08 3.795-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.332c0 .127.042.238.127.323l2.669 2.669c.076.076.178.178.344.178.153 0 .254-.102.33-.178l.95-1.17 1.472 1.472c.076.076.178.178.344.178.153 0 .254-.102.33-.178l6.88-8.464a.434.434 0 0 0 .127-.317.456.456 0 0 0-.127-.331l-.344-.14z"
        fill={color}
      />
    </svg>
  )
}

export function MessageStatus({ status }: MessageStatusProps) {
  const isRead = status === 'read'
  const isDouble = status === 'delivered' || status === 'read'
  const color = isRead ? '#53bdeb' : '#667781'

  return (
    <motion.span
      className="inline-flex items-center ml-1"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={tickTransition}
      key={status}
    >
      {isDouble ? <DoubleCheck color={color} /> : <SingleCheck color={color} />}
    </motion.span>
  )
}
