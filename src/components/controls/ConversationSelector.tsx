import type { Conversation } from '../../types/conversation'

interface ConversationSelectorProps {
  conversations: Conversation[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function ConversationSelector({
  conversations,
  activeIndex,
  onSelect,
}: ConversationSelectorProps) {
  if (conversations.length <= 1) return null

  return (
    <div className="flex items-center gap-2 mt-4">
      {conversations.map((conv, index) => (
        <button
          key={conv.id}
          onClick={() => onSelect(index)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeIndex === index
              ? 'bg-wa-header text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {conv.meta.title}
        </button>
      ))}
    </div>
  )
}
