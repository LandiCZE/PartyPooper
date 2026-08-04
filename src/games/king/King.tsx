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
      subtitle={`Zbývá ${deck.remaining} karet z ${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Nový balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Táhnout kartu</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <Card tint="rgba(255, 191, 71, 0.15)" eyebrow="Konec">
          <p className="text-xl text-muted">
            Vytáhli jste všech 52 karet. Kdo neuspěl u posledního krále, ať se rozžehná s pohárem.
          </p>
        </Card>
      ) : (
        <Card
          keyId={deck.current!.id}
          tint="rgba(255, 191, 71, 0.15)"
          eyebrow={<span>Karta {deck.total - deck.remaining} / {deck.total}</span>}
        >
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-16 place-items-center rounded-xl bg-white text-black shadow-inner">
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl font-bold">{deck.current!.value}</span>
                <span className={`text-2xl ${isRed ? 'text-red-500' : 'text-black'}`}>
                  {deck.current!.suit}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">{deck.current!.name}</p>
              <p className="mt-1 text-2xl font-semibold">{deck.current!.rule}</p>
            </div>
          </div>
          <p className="mt-5 text-base font-normal text-white/80">{deck.current!.description}</p>
        </Card>
      )}
    </GameLayout>
  )
}
