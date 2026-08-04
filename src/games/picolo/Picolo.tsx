import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import picoloData from '../../data/picolo.json'

type Task = { category: string; text: string }

const categoryStamp: Record<string, string> = {
  Jednotlivec: '#26445c',
  Dvojice: '#5a2a52',
  Skupina: '#3a5a3a',
  Hlasování: '#a05a2a',
  Minihra: '#7a2a2a',
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

  const currentCat = deck.current?.category ?? 'Skupina'
  const stamp = categoryStamp[currentCat] ?? '#a83223'

  return (
    <GameLayout
      title="Picolo"
      icon="🎯"
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      <div className="mb-5 flex flex-wrap gap-1.5">
        {allCategories.map((c) => {
          const on = active.has(c)
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={`font-stamp text-[11px] uppercase tracking-widest px-2.5 py-1 border transition-all active:translate-y-[1px] ${
                on
                  ? 'border-ink text-ink bg-card/60'
                  : 'border-inkSoft/40 text-inkSoft'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {deck.exhausted ? (
        <Card keyId={`end-${deckKey}`} eyebrow="Konec balíčku" stampColor={stamp}>
          <p className="text-lg text-inkMuted">
            Došly úkoly z vybraných kategorií. Zamíchej balíček, nebo přidej další kategorii.
          </p>
        </Card>
      ) : (
        <Card
          keyId={`${deckKey}-${deck.total - deck.remaining}`}
          eyebrow={deck.current!.category}
          stampColor={stamp}
          footer={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
        >
          <p>{deck.current!.text}</p>
        </Card>
      )}
    </GameLayout>
  )
}
