import { Smile, Paperclip, Camera, Mic } from 'lucide-react'
import { getLabels } from '../../styles/whatsapp-theme'

interface ChatInputBarProps {
  language: string
}

export function ChatInputBar({ language }: ChatInputBarProps) {
  const labels = getLabels(language)

  return (
    <div className="flex items-center gap-2 px-2 py-[5px] bg-wa-input-bg flex-shrink-0">
      <div className="flex items-center gap-1 flex-1 bg-white rounded-full px-3 py-[7px]">
        <button className="text-wa-text-secondary p-1">
          <Smile size={22} />
        </button>
        <span className="flex-1 text-wa-text-secondary text-[15px] px-1">
          {labels.typeMessage}
        </span>
        <button className="text-wa-text-secondary p-1">
          <Paperclip size={22} className="rotate-[-45deg]" />
        </button>
        <button className="text-wa-text-secondary p-1">
          <Camera size={22} />
        </button>
      </div>
      <button className="w-[44px] h-[44px] rounded-full bg-wa-green-icon flex items-center justify-center flex-shrink-0">
        <Mic size={22} className="text-white" />
      </button>
    </div>
  )
}
