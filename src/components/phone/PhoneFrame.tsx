import type { ReactNode } from 'react'
import type { DeviceType } from '../../types/conversation'
import { StatusBar } from './StatusBar'

interface PhoneFrameProps {
  device: DeviceType
  children: ReactNode
}

export function PhoneFrame({ device, children }: PhoneFrameProps) {
  const isIphone = device === 'iphone'

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          relative bg-black phone-shadow
          ${isIphone
            ? 'w-[375px] h-[812px] rounded-[50px] p-[14px]'
            : 'w-[375px] h-[812px] rounded-[30px] p-[10px]'
          }
        `}
      >
        {/* Dynamic Island / Notch */}
        {isIphone && (
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-full z-50" />
        )}

        {/* Screen area */}
        <div
          className={`
            relative w-full h-full overflow-hidden bg-white flex flex-col
            ${isIphone ? 'rounded-[38px]' : 'rounded-[20px]'}
          `}
        >
          <StatusBar device={device} />
          <div className="flex-1 min-h-0 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
