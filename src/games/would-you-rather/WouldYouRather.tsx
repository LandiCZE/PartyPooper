import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import data from '../../data/would-you-rather.json'

type Pair = { a: string; b: string }

export default function WouldYouRather() {
  const initial = useMemo(() => createDeck<Pair>(data as Pair[]), [])
  const [deck, setDeck] = useState(initial)

  return (
    <GameLayout
      title="Would You Rather"
      icon="💬"
      subtitle={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <div className="animate-cardIn rounded-3xl border border-white/5 bg-panel/80 p-6 text-center shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Konec</p>
          <p className="mt-2 text-xl text-white/80">
            Balíček je prázdný. Zamíchej ho a hraj dál.
          </p>
        </div>
      ) : (
        <div
          key={`${deck.total - deck.remaining}`}
          className="animate-cardIn"
        >
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-muted">
            Co bys radši?
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/25 to-indigo-500/5 p-6 shadow-card">
              <p className="text-xs uppercase tracking-widest text-indigo-300/80">Varianta A</p>
              <p className="mt-2 text-2xl font-semibold">{deck.current!.a}</p>
            </div>
            <div className="flex items-center gap-3 px-2 text-xs text-muted">
              <span className="h-px flex-1 bg-white/10" />
              nebo
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-accent/25 to-accent/5 p-6 shadow-card">
              <p className="text-xs uppercase tracking-widest text-accent/80">Varianta B</p>
              <p className="mt-2 text-2xl font-semibold">{deck.current!.b}</p>
            </div>
          </div>
        </div>
      )}
    </GameLayout>
  )
}
