import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import data from '../../data/most-likely.json'

export default function MostLikely() {
  const initial = useMemo(() => createDeck<string>(data), [])
  const [deck, setDeck] = useState(initial)

  return (
    <GameLayout
      title="Nejpravděpodobněji…"
      icon="😂"
      footer={
        deck.exhausted ? (
          <PrimaryButton onClick={() => setDeck(deck.reset())}>Zamíchat balíček</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setDeck(deck.next())}>Ukázat na viníka</PrimaryButton>
        )
      }
    >
      {deck.exhausted ? (
        <Card eyebrow="Konec balíčku" stampColor="#a05a2a">
          <p className="text-lg text-inkMuted">Balíček je prázdný. Zamíchej ho a hraj dál.</p>
        </Card>
      ) : (
        <Card
          keyId={deck.current ?? 'end'}
          eyebrow="Kdo z vás nejspíš…"
          stampColor="#a05a2a"
          footer={`Karta ${deck.total - deck.remaining} z ${deck.total}`}
        >
          <p>{deck.current}</p>
        </Card>
      )}
    </GameLayout>
  )
}
