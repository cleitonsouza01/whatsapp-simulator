import type { Message, PlaybackState } from '../types/conversation'

export type PlaybackEvent =
  | { type: 'message'; message: Message; index: number }
  | { type: 'typing-start' }
  | { type: 'typing-end' }
  | { type: 'status-change'; messageId: string; status: Message['status'] }
  | { type: 'state-change'; state: PlaybackState }
  | { type: 'complete' }

export type PlaybackListener = (event: PlaybackEvent) => void

export class PlaybackEngine {
  private messages: Message[] = []
  private currentIndex = 0
  private state: PlaybackState = 'idle'
  private speed = 1
  private loop = false
  private loopDelay = 3000
  private timers: ReturnType<typeof setTimeout>[] = []
  private listeners: Set<PlaybackListener> = new Set()

  configure(
    messages: Message[],
    options: { speed?: number; loop?: boolean; loopDelay?: number } = {},
  ) {
    this.clearTimers()
    this.messages = messages
    this.speed = options.speed ?? 1
    this.loop = options.loop ?? false
    this.loopDelay = options.loopDelay ?? 3000
    this.currentIndex = 0
    this.state = 'idle'
  }

  setSpeed(speed: number) {
    this.speed = speed
  }

  getState(): PlaybackState {
    return this.state
  }

  getCurrentIndex(): number {
    return this.currentIndex
  }

  getTotalMessages(): number {
    return this.messages.length
  }

  subscribe(listener: PlaybackListener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(event: PlaybackEvent) {
    this.listeners.forEach((l) => l(event))
  }

  private setState(state: PlaybackState) {
    this.state = state
    this.emit({ type: 'state-change', state })
  }

  play() {
    if (this.state === 'playing') return
    if (this.state === 'complete') {
      this.restart()
      return
    }
    this.setState('playing')
    this.scheduleNext()
  }

  pause() {
    if (this.state !== 'playing') return
    this.clearTimers()
    this.setState('paused')
  }

  resume() {
    if (this.state !== 'paused') return
    this.setState('playing')
    this.scheduleNext()
  }

  restart() {
    this.clearTimers()
    this.currentIndex = 0
    this.setState('idle')
    this.emit({ type: 'state-change', state: 'idle' })
  }

  stop() {
    this.clearTimers()
    this.currentIndex = 0
    this.setState('idle')
  }

  showAll() {
    this.clearTimers()
    this.emit({ type: 'typing-end' })
    for (let i = this.currentIndex; i < this.messages.length; i++) {
      const message = this.messages[i]
      this.emit({ type: 'message', message, index: i })
      if (message.statusTransitions) {
        const finalStatus = message.statusTransitions[message.statusTransitions.length - 1]
        if (finalStatus) {
          this.emit({ type: 'status-change', messageId: message.id, status: finalStatus.status })
        }
      }
    }
    this.currentIndex = this.messages.length
    this.setState('complete')
  }

  dispose() {
    this.clearTimers()
    this.listeners.clear()
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout)
    this.timers = []
  }

  private adjustDelay(delay: number): number {
    return Math.max(delay / this.speed, 50)
  }

  private scheduleNext() {
    if (this.state !== 'playing') return
    if (this.currentIndex >= this.messages.length) {
      this.handleComplete()
      return
    }

    const message = this.messages[this.currentIndex]
    const index = this.currentIndex
    const messageDelay = this.adjustDelay(message.delay)

    const timer = setTimeout(() => {
      if (this.state !== 'playing') return
      this.processMessage(message, index)
    }, messageDelay)

    this.timers.push(timer)
  }

  private processMessage(message: Message, index: number) {
    if (message.showTyping && message.typingDuration) {
      this.emit({ type: 'typing-start' })

      const typingTimer = setTimeout(() => {
        if (this.state !== 'playing') return
        this.emit({ type: 'typing-end' })
        this.deliverMessage(message, index)
      }, this.adjustDelay(message.typingDuration))

      this.timers.push(typingTimer)
    } else {
      this.deliverMessage(message, index)
    }
  }

  private deliverMessage(message: Message, index: number) {
    this.emit({ type: 'message', message, index })
    this.scheduleStatusTransitions(message)
    this.currentIndex = index + 1
    this.scheduleNext()
  }

  private scheduleStatusTransitions(message: Message) {
    if (!message.statusTransitions) return

    for (const transition of message.statusTransitions) {
      const timer = setTimeout(() => {
        this.emit({
          type: 'status-change',
          messageId: message.id,
          status: transition.status,
        })
      }, this.adjustDelay(transition.delay))
      this.timers.push(timer)
    }
  }

  private handleComplete() {
    this.setState('complete')
    this.emit({ type: 'complete' })

    if (this.loop) {
      const loopTimer = setTimeout(() => {
        this.currentIndex = 0
        this.setState('idle')
        this.play()
      }, this.adjustDelay(this.loopDelay))
      this.timers.push(loopTimer)
    }
  }
}
