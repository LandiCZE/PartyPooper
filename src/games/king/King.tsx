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
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Nový balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Táhnout kartu</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <Card eyebrow="Konec" stampColor="#6a6a2a">
          <p className="text-lg text-inkMuted">
            Vytáhli jste všech 52 karet. Kdo neuspěl u posledního krále, ať se rozžehná s pohárem.
          </p>
        </Card>
      ) : (
        <Card
          keyId={deck.current!.id}
          eyebrow={deck.current!.name}
          stampColor="#6a6a2a"
          footer={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
        >
          <div className="flex items-center gap-5 justify-center text-left">
            <div className="grid h-28 w-20 place-items-center border-2 border-ink bg-cardLight shadow-card shrink-0">
              <div className="flex flex-col items-center leading-none">
                <span className="font-display text-2xl text-ink">{deck.current!.value}</span>
                <span className={`text-4xl leading-none ${isRed ? 'text-stamp-red' : 'text-ink'}`}>
                  {deck.current!.suit}
                </span>
              </div>
            </div>
            <div>
              <p className="font-display text-3xl text-ink leading-tight">
                {deck.current!.rule}
              </p>
            </div>
          </div>
          <p className="mt-6 font-body text-base font-normal text-inkMuted normal-case leading-relaxed">
            {deck.current!.description}
          </p>
        </Card>
      )}
    </GameLayout>
  )
}
