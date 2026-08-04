import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import data from '../../data/never.json'

export default function Never() {
  const initial = useMemo(() => createDeck<string>(data), [])
  const [deck, setDeck] = useState(initial)

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
      <Card keyId={deck.current ?? 'end'} tint="rgba(255, 92, 138, 0.18)" eyebrow="Nikdy jsem…">
        {deck.exhausted ? (
          <p className="text-xl text-muted">
            Balíček je prázdný. Zamíchej ho a hraj dál — nebo se přesuň k jiné hře.
          </p>
        ) : (
          <p>{deck.current}</p>
        )}
      </Card>
    </GameLayout>
  )
}
