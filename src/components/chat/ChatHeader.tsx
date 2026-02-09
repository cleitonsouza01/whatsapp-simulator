import { ArrowLeft, Phone, Video, MoreVertical, CheckCircle2 } from 'lucide-react'
import type { Contact } from '../../types/conversation'
import { getLabels } from '../../styles/whatsapp-theme'

interface ChatHeaderProps {
  contact: Contact
  language: string
  isTyping?: boolean
}

export function ChatHeader({ contact, language, isTyping }: ChatHeaderProps) {
  const labels = getLabels(language)

  const statusText = isTyping
    ? labels.typing
    : contact.status === 'online'
      ? labels.online
      : ''

  return (
    <div className="flex items-center gap-2 bg-wa-header px-2 py-[6px] text-white flex-shrink-0">
      <button className="p-1 -ml-1">
        <ArrowLeft size={22} />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center overflow-hidden flex-shrink-0">
        {contact.avatar ? (
          <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 212 212" width="36" height="36">
            <path
              d="M106 0C47.5 0 0 47.5 0 106s47.5 106 106 106 106-47.5 106-106S164.5 0 106 0z"
              fill="#DFE5E7"
            />
            <path
              d="M106 53c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 100c-23.2 0-69 11.6-69 35v17h138v-17c0-23.4-45.8-35-69-35z"
              fill="#FFF"
            />
          </svg>
        )}
      </div>

      {/* Name & status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[16px] font-medium truncate">{contact.name}</span>
          {contact.isVerified && (
            <CheckCircle2 size={16} className="text-white/80 flex-shrink-0" fill="currentColor" />
          )}
        </div>
        {statusText && (
          <p className="text-[12.5px] text-white/80 leading-tight">{statusText}</p>
        )}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-1"><Video size={18} /></button>
        <button className="p-1"><Phone size={18} /></button>
        <button className="p-1"><MoreVertical size={18} /></button>
      </div>
    </div>
  )
}
