import { useState, useCallback } from 'react'
import type { MessageDeliveryStatus } from '../types/conversation'

export function useStatusTransition() {
  const [statuses, setStatuses] = useState<Record<string, MessageDeliveryStatus>>({})

  const setStatus = useCallback((messageId: string, status: MessageDeliveryStatus) => {
    setStatuses((prev) => ({ ...prev, [messageId]: status }))
  }, [])

  const getStatus = useCallback(
    (messageId: string): MessageDeliveryStatus | undefined => {
      return statuses[messageId]
    },
    [statuses],
  )

  const reset = useCallback(() => {
    setStatuses({})
  }, [])

  return { statuses, setStatus, getStatus, reset }
}
