export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export type Deck<T> = {
  current: T | undefined
  remaining: number
  total: number
  next: () => Deck<T>
  reset: () => Deck<T>
  exhausted: boolean
}

export function createDeck<T>(items: readonly T[]): Deck<T> {
  const total = items.length
  const build = (queue: T[], current: T | undefined): Deck<T> => ({
    current,
    remaining: queue.length,
    total,
    exhausted: current === undefined && queue.length === 0,
    next: () => {
      if (queue.length === 0) return build([], undefined)
      const [head, ...rest] = queue
      return build(rest, head)
    },
    reset: () => {
      const shuffled = shuffle(items)
      const [head, ...rest] = shuffled
      return build(rest, head)
    },
  })
  const shuffled = shuffle(items)
  const [head, ...rest] = shuffled
  return build(rest, head)
}
