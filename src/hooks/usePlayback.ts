import { useState, useEffect, useCallback, useRef } from 'react'
import type { Message, PlaybackState, Conversation, MessageDeliveryStatus } from '../types/conversation'
import { PlaybackEngine } from '../engine/PlaybackEngine'

interface UsePlaybackReturn {
  visibleMessages: Message[]
  isTyping: boolean
  playbackState: PlaybackState
  currentIndex: number
  totalMessages: number
  speed: number
  messageStatuses: Record<string, MessageDeliveryStatus>
  play: () => void
  pause: () => void
  restart: () => void
  showAll: () => void
  setSpeed: (speed: number) => void
}

export function usePlayback(conversation: Conversation | null): UsePlaybackReturn {
  const engineRef = useRef<PlaybackEngine | null>(null)
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [speed, setSpeedState] = useState(1)
  const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageDeliveryStatus>>({})

  // Create a fresh engine per conversation to avoid stale timer issues
  useEffect(() => {
    if (!conversation) return

    // Dispose previous engine completely
    if (engineRef.current) {
      engineRef.current.dispose()
    }

    // Reset all state
    setVisibleMessages([])
    setIsTyping(false)
    setMessageStatuses({})
    setCurrentIndex(0)
    setPlaybackState('idle')

    // Create fresh engine
    const engine = new PlaybackEngine()
    engineRef.current = engine

    engine.configure(conversation.messages, {
      speed: conversation.settings.speed,
      loop: conversation.settings.loop,
      loopDelay: conversation.settings.loopDelay,
    })
    setSpeedState(conversation.settings.speed)

    const unsubscribe = engine.subscribe((event) => {
      switch (event.type) {
        case 'message':
          setVisibleMessages((prev) => [...prev, event.message])
          setCurrentIndex(event.index + 1)
          break
        case 'typing-start':
          setIsTyping(true)
          break
        case 'typing-end':
          setIsTyping(false)
          break
        case 'status-change':
          setMessageStatuses((prev) => ({
            ...prev,
            [event.messageId]: event.status!,
          }))
          break
        case 'state-change':
          setPlaybackState(event.state)
          if (event.state === 'idle') {
            setVisibleMessages([])
            setIsTyping(false)
            setMessageStatuses({})
            setCurrentIndex(0)
          }
          break
        case 'complete':
          break
      }
    })

    // Auto-play if configured
    if (conversation.settings.autoPlay) {
      engine.play()
    }

    return () => {
      unsubscribe()
      engine.dispose()
      engineRef.current = null
    }
  }, [conversation])

  const play = useCallback(() => {
    const engine = engineRef.current
    if (!engine) return
    if (playbackState === 'paused') {
      engine.resume()
    } else {
      engine.play()
    }
  }, [playbackState])

  const pause = useCallback(() => {
    engineRef.current?.pause()
  }, [])

  const restart = useCallback(() => {
    engineRef.current?.restart()
    setTimeout(() => {
      engineRef.current?.play()
    }, 100)
  }, [])

  const showAll = useCallback(() => {
    engineRef.current?.showAll()
  }, [])

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed)
    engineRef.current?.setSpeed(newSpeed)
  }, [])

  return {
    visibleMessages,
    isTyping,
    playbackState,
    currentIndex,
    totalMessages: conversation?.messages.length ?? 0,
    speed,
    messageStatuses,
    play,
    pause,
    restart,
    showAll,
    setSpeed,
  }
}
