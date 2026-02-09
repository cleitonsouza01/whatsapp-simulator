import { useState, useCallback } from 'react'
import type { Conversation } from '../types/conversation'
import { sampleConversations } from '../data/sample-conversations'

export function useConversation() {
  const [conversations] = useState<Conversation[]>(sampleConversations)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeConversation = conversations[activeIndex] ?? null

  const selectConversation = useCallback(
    (index: number) => {
      if (index >= 0 && index < conversations.length) {
        setActiveIndex(index)
      }
    },
    [conversations.length],
  )

  return {
    conversations,
    activeConversation,
    activeIndex,
    selectConversation,
  }
}
