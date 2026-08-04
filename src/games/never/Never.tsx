import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import neverData from '../../data/never.json'

type Prompt = { category: string; text: string }

const categoryTint: Record<string, string> = {
  Párty: 'rgba(255, 92, 138, 0.20)',
  Rande: 'rgba(217, 70, 239, 0.18)',
  Trapasy: 'rgba(249, 115, 22, 0.18)',
  Práce: 'rgba(148, 163, 184, 0.18)',
  Přátelé: 'rgba(34, 197, 94, 0.18)',
  Kvíz: 'rgba(59, 130, 246, 0.18)',
  Chaos: 'rgba(234, 179, 8, 0.18)',
  Škola: 'rgba(139, 92, 255, 0.18)',
  Cesty: 'rgba(56, 189, 248, 0.18)',
  Online: 'rgba(20, 184, 166, 0.18)',
  Zpověď: 'rgba(244, 114, 182, 0.18)',
  Pikantní: 'rgba(239, 68, 68, 0.22)',
  Chata: 'rgba(132, 204, 22, 0.20)',
  Dospělost: 'rgba(168, 162, 158, 0.20)',
}

export default function Never() {
  const prompts = neverData as Prompt[]
  const allCategories = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.category))),
    [prompts],
  )
  const [active, setActive] = useState<Set<string>>(new Set(allCategories))

  const filtered = useMemo(
    () => prompts.filter((p) => active.has(p.category)),
    [prompts, active],
  )
  const initial = useMemo(() => createDeck<Prompt>(filtered), [filtered])
  const [deck, setDeck] = useState(initial)
  const [deckKey, setDeckKey] = useState(0)

  function toggle(cat: string) {
    const next = new Set(active)
    if (next.has(cat)) next.delete(cat)
    else next.add(cat)
    if (next.size === 0) return
    setActive(next)
    const rebuilt = createDeck<Prompt>(prompts.filter((p) => next.has(p.category)))
    setDeck(rebuilt)
    setDeckKey((k) => k + 1)
  }

  return (
    <GameLayout
      title="Nikdy jsem"
      icon="🍺"
      subtitle={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {allCategories.map((c) => {
          const on = active.has(c)
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={`rounded-full border px-3 py-1.5 text-sm transition active:scale-95 ${
                on
                  ? 'border-accent/60 bg-accent/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/60'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {deck.exhausted ? (
        <Card tint="rgba(255, 92, 138, 0.18)" eyebrow="Konec balíčku" keyId={`end-${deckKey}`}>
          <p className="text-xl text-muted">
            Došly karty z vybraných kategorií. Zamíchej balíček, nebo přidej další kategorii.
          </p>
        </Card>
      ) : (
        <Card
          keyId={`${deckKey}-${deck.total - deck.remaining}`}
          tint={categoryTint[deck.current!.category] ?? 'rgba(255, 92, 138, 0.18)'}
          eyebrow={deck.current!.category}
        >
          <p>{deck.current!.text}</p>
        </Card>
      )}
    </GameLayout>
  )
}
