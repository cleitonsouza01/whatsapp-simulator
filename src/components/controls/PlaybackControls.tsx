import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import type { PlaybackState } from '../../types/conversation'

interface PlaybackControlsProps {
  state: PlaybackState
  speed: number
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onShowAll: () => void
  onSpeedChange: (speed: number) => void
}

const SPEED_OPTIONS = [0.5, 1, 1.5, 2]

export function PlaybackControls({
  state,
  speed,
  onPlay,
  onPause,
  onRestart,
  onShowAll,
  onSpeedChange,
}: PlaybackControlsProps) {
  const isPlaying = state === 'playing'

  return (
    <div className="flex items-center gap-4 mt-6">
      {/* Play/Pause */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="w-12 h-12 rounded-full bg-wa-header text-white flex items-center justify-center hover:bg-wa-header-dark transition-colors"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-[2px]" />}
      </button>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
        title="Restart"
      >
        <RotateCcw size={18} />
      </button>

      {/* Show All */}
      <button
        onClick={onShowAll}
        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
        title="Mostrar tudo"
      >
        <SkipForward size={18} />
      </button>

      {/* Speed selector */}
      <div className="flex items-center gap-1 ml-4">
        {SPEED_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${speed === s
                ? 'bg-wa-header text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }
            `}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  )
}
