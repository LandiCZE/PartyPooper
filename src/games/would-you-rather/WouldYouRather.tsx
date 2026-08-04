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
      subtitle={`${deck.total - deck.remaining}/${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <div className="animate-cardIn relative border-2 border-white/90 bg-panel shadow-[5px_5px_0_0_#ff2d95,10px_10px_0_0_#00e5ff] p-6 text-center">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-neon-magenta via-neon-cyan to-neon-lime" />
          <p className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-neon-cyan">Konec</p>
          <p className="mt-3 text-lg text-white/80">
            Balíček je prázdný. Zamíchej ho a hraj dál.
          </p>
        </div>
      ) : (
        <div
          key={`${deck.total - deck.remaining}`}
          className="animate-cardIn"
        >
          <p className="mb-4 text-center font-display text-[10px] uppercase tracking-[0.3em] text-neon-lime">
            &gt; Co bys radši?
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative border-2 border-white/90 bg-neon-cyan/15 shadow-[5px_5px_0_0_#ff2d95] p-5">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-neon-cyan" />
              <p className="font-display text-[10px] uppercase tracking-widest text-neon-cyan">Varianta A</p>
              <p className="mt-3 text-xl sm:text-2xl font-semibold uppercase leading-snug">{deck.current!.a}</p>
            </div>
            <div className="flex items-center gap-3 px-2 font-display text-[10px] uppercase tracking-[0.3em] text-neon-lime">
              <span className="h-px flex-1 bg-white/20" />
              nebo
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <div className="relative border-2 border-white/90 bg-neon-magenta/15 shadow-[5px_5px_0_0_#d0ff00] p-5">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-neon-magenta" />
              <p className="font-display text-[10px] uppercase tracking-widest text-neon-magenta">Varianta B</p>
              <p className="mt-3 text-xl sm:text-2xl font-semibold uppercase leading-snug">{deck.current!.b}</p>
            </div>
          </div>
        </div>
      )}
    </GameLayout>
  )
}
