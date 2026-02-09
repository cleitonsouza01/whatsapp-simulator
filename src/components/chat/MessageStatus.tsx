import { motion } from 'framer-motion'
import type { MessageDeliveryStatus } from '../../types/conversation'
import { tickTransition } from '../../styles/animations'

interface MessageStatusProps {
  status: MessageDeliveryStatus
}

const CHECK_PATH = "M4.47 8.13L1.27 4.93a.4.4 0 0 1 0-.57l.36-.34a.43.43 0 0 1 .58 0l2.63 2.63 5.44-6.3a.43.43 0 0 1 .58 0l.36.34a.4.4 0 0 1 0 .57L5.43 8.13a.52.52 0 0 1-.48.17.52.52 0 0 1-.48-.17z"

function SingleCheck({ color }: { color: string }) {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
      <path d={CHECK_PATH} fill={color} />
    </svg>
  )
}

function DoubleCheck({ color }: { color: string }) {
  return (
    <svg width="18" height="10" viewBox="-1 0 18 10" fill="none">
      <path d={CHECK_PATH} fill={color} transform="translate(0, 0)" />
      <path d={CHECK_PATH} fill={color} transform="translate(5, 0)" />
    </svg>
  )
}

export function MessageStatus({ status }: MessageStatusProps) {
  const isRead = status === 'read'
  const isDouble = status === 'delivered' || status === 'read'
  const color = isRead ? '#53bdeb' : '#8696a0'

  return (
    <motion.span
      className="inline-flex items-center ml-[3px]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={tickTransition}
      key={status}
    >
      {isDouble ? <DoubleCheck color={color} /> : <SingleCheck color={color} />}
    </motion.span>
  )
}
