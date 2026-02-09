import type { DeviceType } from '../../types/conversation'
import { Signal, Wifi, Battery } from 'lucide-react'

interface StatusBarProps {
  device: DeviceType
}

export function StatusBar({ device }: StatusBarProps) {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div
      className={`
        flex items-center justify-between px-6
        text-white text-xs font-medium
        bg-wa-header-dark
        ${device === 'iphone' ? 'pt-[50px] pb-[6px]' : 'pt-[8px] pb-[6px]'}
      `}
    >
      <span className="font-semibold">{time}</span>
      <div className="flex items-center gap-1">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={16} strokeWidth={2.5} />
      </div>
    </div>
  )
}
