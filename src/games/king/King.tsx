import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import kingData from '../../data/king.json'

type Suit = '♠' | '♥' | '♦' | '♣'
type Rule = {
  value: string
  name: string
  rule: string
  description: string
}
type DrawnCard = Rule & { suit: Suit; id: string }

const suits: Suit[] = ['♠', '♥', '♦', '♣']

function buildFullDeck(rules: Rule[]): DrawnCard[] {
  const out: DrawnCard[] = []
  for (const suit of suits) {
    for (const rule of rules) {
      out.push({ ...rule, suit, id: `${rule.value}${suit}` })
    }
  }
  return out
}

export default function King() {
  const rules = kingData as Rule[]
  const initial = useMemo(() => createDeck<DrawnCard>(buildFullDeck(rules)), [rules])
  const [deck, setDeck] = useState(initial)
  const isRed = deck.current?.suit === '♥' || deck.current?.suit === '♦'

  return (
    <GameLayout
      title="King's Cup"
      icon="👑"
      subtitle={`${deck.total - deck.remaining}/${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton variant="lime" onClick={() => setDeck(deck.reset())}>Nový balíček</PrimaryButton>
        ) : (
          <PrimaryButton variant="lime" onClick={() => setDeck(deck.next())}>Táhnout kartu</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <Card tint="rgba(208, 255, 0, 0.18)" eyebrow="Konec">
          <p className="text-lg text-white/80 normal-case">
            Vytáhli jste všech 52 karet. Kdo neuspěl u posledního krále, ať se rozžehná s pohárem.
          </p>
        </Card>
      ) : (
        <Card
          keyId={deck.current!.id}
          tint="rgba(208, 255, 0, 0.15)"
          eyebrow={<span>Karta {deck.total - deck.remaining} / {deck.total}</span>}
        >
          <div className="flex items-center gap-4 normal-case">
            <div className="grid h-24 w-16 place-items-center border-2 border-black bg-white shadow-[3px_3px_0_0_#ff2d95] shrink-0">
              <div className="flex flex-col items-center leading-none">
                <span className="font-display text-xl text-black">{deck.current!.value}</span>
                <span className={`text-3xl leading-none ${isRed ? 'text-red-500' : 'text-black'}`}>
                  {deck.current!.suit}
                </span>
              </div>
            </div>
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-neon-cyan">
                {deck.current!.name}
              </p>
              <p className="mt-1 font-display text-2xl uppercase text-white">
                {deck.current!.rule}
              </p>
            </div>
          </div>
          <p className="mt-5 text-base font-normal text-white/85 normal-case leading-relaxed">
            {deck.current!.description}
          </p>
        </Card>
      )}
    </GameLayout>
  )
}
