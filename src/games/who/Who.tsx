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
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Další</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <Card eyebrow="Konec balíčku" stampColor="#3a5a3a">
          <p className="text-lg text-inkMuted">Balíček je prázdný. Zamíchej ho a hraj dál.</p>
        </Card>
      ) : (
        <Card
          keyId={deck.current ?? 'end'}
          eyebrow="Kdo z vás…"
          stampColor="#3a5a3a"
          footer={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
        >
          <p>{deck.current}</p>
        </Card>
      )}
    </GameLayout>
  )
}
