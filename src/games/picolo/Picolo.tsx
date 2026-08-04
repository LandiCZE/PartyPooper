import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import picoloData from '../../data/picolo.json'

type Task = { category: string; text: string }

const categoryTint: Record<string, string> = {
  Jednotlivec: 'rgba(56, 189, 248, 0.18)',
  Dvojice: 'rgba(217, 70, 239, 0.18)',
  Skupina: 'rgba(34, 197, 94, 0.18)',
  Hlasování: 'rgba(249, 115, 22, 0.18)',
  Minihra: 'rgba(139, 92, 255, 0.18)',
}

export default function Picolo() {
  const tasks = picoloData as Task[]
  const allCategories = useMemo(() => Array.from(new Set(tasks.map((t) => t.category))), [tasks])
  const [active, setActive] = useState<Set<string>>(new Set(allCategories))

  const filtered = useMemo(
    () => tasks.filter((t) => active.has(t.category)),
    [tasks, active],
  )
  const initial = useMemo(() => createDeck<Task>(filtered), [filtered])
  const [deck, setDeck] = useState(initial)
  const [deckKey, setDeckKey] = useState(0)

  function toggle(cat: string) {
    const next = new Set(active)
    if (next.has(cat)) next.delete(cat)
    else next.add(cat)
    if (next.size === 0) return
    setActive(next)
    const rebuilt = createDeck<Task>(tasks.filter((t) => next.has(t.category)))
    setDeck(rebuilt)
    setDeckKey((k) => k + 1)
  }

  return (
    <GameLayout
      title="Picolo"
      icon="🎯"
      subtitle={`${String(deck.total - deck.remaining).padStart(2, '0')}/${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {allCategories.map((c) => {
          const on = active.has(c)
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={`font-display border-2 px-3 py-1 text-[10px] uppercase tracking-wider transition-transform duration-75 active:translate-x-[2px] active:translate-y-[2px] ${
                on
                  ? 'border-white bg-neon-magenta/30 text-white shadow-[3px_3px_0_0_#00e5ff] active:!shadow-none'
                  : 'border-white/25 bg-transparent text-white/45'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {deck.exhausted ? (
        <Card tint="rgba(139, 92, 255, 0.18)" eyebrow="Konec balíčku" keyId={`end-${deckKey}`}>
          <p className="text-xl text-muted">
            Došly úkoly z vybraných kategorií. Zamíchej balíček, nebo přidej další kategorii.
          </p>
        </Card>
      ) : (
        <Card
          keyId={`${deckKey}-${deck.total - deck.remaining}`}
          tint={categoryTint[deck.current!.category] ?? 'rgba(255,92,138,0.18)'}
          eyebrow={deck.current!.category}
        >
          <p>{deck.current!.text}</p>
        </Card>
      )}
    </GameLayout>
  )
}
