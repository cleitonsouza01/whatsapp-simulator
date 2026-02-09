import { useEffect, useCallback } from 'react'
import { PhoneFrame } from './components/phone/PhoneFrame'
import { ChatScreen } from './components/chat/ChatScreen'
import { PlaybackControls } from './components/controls/PlaybackControls'
import { ProgressBar } from './components/controls/ProgressBar'
import { ConversationSelector } from './components/controls/ConversationSelector'
import { useConversation } from './hooks/useConversation'
import { usePlayback } from './hooks/usePlayback'

function App() {
  const { conversations, activeConversation, activeIndex, selectConversation } = useConversation()
  const {
    visibleMessages,
    isTyping,
    playbackState,
    currentIndex,
    totalMessages,
    speed,
    messageStatuses,
    play,
    pause,
    restart,
    setSpeed,
  } = usePlayback(activeConversation)

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (playbackState === 'playing') pause()
          else play()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          restart()
          break
      }
    },
    [playbackState, play, pause, restart],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!activeConversation) {
    return <div className="flex items-center justify-center h-screen text-gray-500">No conversations loaded</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <PhoneFrame device={activeConversation.meta.device}>
        <ChatScreen
          contact={activeConversation.contact}
          messages={visibleMessages}
          isTyping={isTyping}
          language={activeConversation.meta.language}
          messageStatuses={messageStatuses}
        />
      </PhoneFrame>

      <ProgressBar current={currentIndex} total={totalMessages} />

      <PlaybackControls
        state={playbackState}
        speed={speed}
        onPlay={play}
        onPause={pause}
        onRestart={restart}
        onSpeedChange={setSpeed}
      />

      <ConversationSelector
        conversations={conversations}
        activeIndex={activeIndex}
        onSelect={selectConversation}
      />

      <p className="mt-4 text-xs text-gray-400">
        Space = play/pause &middot; R = restart
      </p>
    </div>
  )
}

export default App
