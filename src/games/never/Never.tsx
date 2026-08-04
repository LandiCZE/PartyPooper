import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import neverData from '../../data/never.json'

type Prompt = { categories: string[]; text: string }

const categoryStamp: Record<string, string> = {
  Párty: '#a83223',
  Rande: '#7a2a2a',
  Trapasy: '#a05a2a',
  Práce: '#26445c',
  Přátelé: '#3a5a3a',
  Kvíz: '#26445c',
  Chaos: '#5a2a52',
  Škola: '#6a6a2a',
  Cesty: '#26445c',
  Online: '#5a2a52',
  Zpověď: '#7a2a2a',
  Pikantní: '#a83223',
  Chata: '#3a5a3a',
  Dospělost: '#6a6a2a',
}

export default function Never() {
  const prompts = neverData as Prompt[]
  const allCategories = useMemo(
    () => Array.from(new Set(prompts.flatMap((p) => p.categories))),
    [prompts],
  )
  const [active, setActive] = useState<Set<string>>(new Set(allCategories))

  const filtered = useMemo(
    () => prompts.filter((p) => p.categories.some((c) => active.has(c))),
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
    const rebuilt = createDeck<Prompt>(prompts.filter((p) => p.categories.some((c) => next.has(c))))
    setDeck(rebuilt)
    setDeckKey((k) => k + 1)
  }

  const currentPrimary = deck.current?.categories[0] ?? 'Párty'
  const stamp = categoryStamp[currentPrimary] ?? '#a83223'

  return (
    <GameLayout
      title="Nikdy jsem"
      icon="🍺"
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
            Došly karty z vybraných kategorií. Zamíchej balíček, nebo přidej další kategorii.
          </p>
        </Card>
      ) : (
        <Card
          keyId={`${deckKey}-${deck.total - deck.remaining}`}
          eyebrow={deck.current!.categories.join(' · ')}
          stampColor={stamp}
          footer={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
        >
          <p>{deck.current!.text}</p>
        </Card>
      )}
    </GameLayout>
  )
}
