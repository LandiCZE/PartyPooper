import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import data from '../../data/who.json'

export default function Who() {
  const initial = useMemo(() => createDeck<string>(data), [])
  const [deck, setDeck] = useState(initial)

  return (
    <GameLayout
      title="Kdo z vás…"
      icon="🙋"
      subtitle={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      <Card keyId={deck.current ?? 'end'} tint="rgba(34, 197, 94, 0.18)" eyebrow="Kdo z vás…">
        {deck.exhausted ? (
          <p className="text-xl text-muted">Balíček je prázdný. Zamíchej ho a hraj dál.</p>
        ) : (
          <p>{deck.current}</p>
        )}
      </Card>
    </GameLayout>
  )
}
