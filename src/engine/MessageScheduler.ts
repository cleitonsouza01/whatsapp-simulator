export class MessageScheduler {
  private timers: ReturnType<typeof setTimeout>[] = []
  private speed = 1

  setSpeed(speed: number) {
    this.speed = speed
  }

  schedule(callback: () => void, delay: number) {
    const adjustedDelay = Math.max(delay / this.speed, 50)
    const timer = setTimeout(callback, adjustedDelay)
    this.timers.push(timer)
    return timer
  }

  clear() {
    this.timers.forEach(clearTimeout)
    this.timers = []
  }
}
