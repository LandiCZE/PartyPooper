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
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <div className="animate-cardIn relative bg-card border border-ink/10 shadow-card p-8 text-center">
          <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
          <span className="stamp" style={{ color: '#7a2a2a' }}>Konec</span>
          <p className="mt-4 font-display text-2xl text-ink">Balíček je prázdný.</p>
          <p className="mt-2 font-body text-sm text-inkMuted">Zamíchej ho a hraj dál.</p>
        </div>
      ) : (
        <div
          key={`${deck.total - deck.remaining}`}
          className="animate-cardIn"
        >
          <p className="mb-4 text-center font-display text-lg italic text-inkMuted">
            Co bys radši…
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative bg-card border border-ink/10 shadow-card p-5">
              <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
              <div className="relative">
                <span className="stamp" style={{ color: '#26445c' }}>A</span>
                <p className="mt-3 font-display text-xl sm:text-2xl leading-snug text-ink">
                  {deck.current!.a}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 font-display italic text-inkMuted">
              <span className="h-px flex-1 bg-ink/20" />
              nebo
              <span className="h-px flex-1 bg-ink/20" />
            </div>
            <div className="relative bg-card border border-ink/10 shadow-card p-5">
              <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
              <div className="relative">
                <span className="stamp" style={{ color: '#a83223' }}>B</span>
                <p className="mt-3 font-display text-xl sm:text-2xl leading-snug text-ink">
                  {deck.current!.b}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-body text-xs uppercase tracking-widest text-inkSoft">
            Karta {deck.total - deck.remaining} z {deck.total}
          </p>
        </div>
      )}
    </GameLayout>
  )
}
