import { useMemo, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import Card from '../../components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import { createDeck } from '../../utils/deck'
import truthData from '../../data/truth.json'
import dareData from '../../data/dare.json'

type Mode = 'idle' | 'truth' | 'dare'

export default function TruthOrDare() {
  const initialTruth = useMemo(() => createDeck<string>(truthData), [])
  const initialDare = useMemo(() => createDeck<string>(dareData), [])
  const [truth, setTruth] = useState(initialTruth)
  const [dare, setDare] = useState(initialDare)
  const [mode, setMode] = useState<Mode>('idle')

  function pick(next: 'truth' | 'dare') {
    if (next === 'truth') {
      setTruth(truth.current === undefined ? truth.reset() : truth)
    } else {
      setDare(dare.current === undefined ? dare.reset() : dare)
    }
    setMode(next)
  }

  function drawNext() {
    if (mode === 'truth') setTruth(truth.next())
    else if (mode === 'dare') setDare(dare.next())
  }

  const active = mode === 'truth' ? truth : mode === 'dare' ? dare : null
  const exhausted = active !== null && active.exhausted
  const stamp = mode === 'truth' ? '#5a2a52' : '#a83223'

  return (
    <GameLayout title="Pravda nebo úkol" icon="🤔">
      {mode === 'idle' && (
        <div className="grid grid-cols-1 gap-5">
          <button
            type="button"
            onClick={() => pick('truth')}
            className="relative bg-card border border-ink/10 shadow-card hover:shadow-cardHover transition-all p-6 text-left active:translate-y-[1px]"
          >
            <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
            <div className="relative">
              <span className="stamp" style={{ color: '#5a2a52' }}>Volba 01</span>
              <p className="mt-4 font-display text-4xl text-ink">Pravda</p>
              <p className="mt-2 font-body text-sm text-inkMuted">Odpověz upřímně. Bez triků, bez výmluv.</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => pick('dare')}
            className="relative bg-card border border-ink/10 shadow-card hover:shadow-cardHover transition-all p-6 text-left active:translate-y-[1px]"
          >
            <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
            <div className="relative">
              <span className="stamp" style={{ color: '#a83223' }}>Volba 02</span>
              <p className="mt-4 font-display text-4xl text-ink">Úkol</p>
              <p className="mt-2 font-body text-sm text-inkMuted">Splň, co karta naordinuje. Bez slitování.</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => pick(Math.random() < 0.5 ? 'truth' : 'dare')}
            className="mt-1 font-body text-sm text-inkMuted italic hover:text-ink transition-colors"
          >
            🎲 nebo vybrat náhodně
          </button>
        </div>
      )}

      {mode !== 'idle' && (
        <Card
          keyId={active?.current ?? `${mode}-end`}
          eyebrow={mode === 'truth' ? 'Pravda' : 'Úkol'}
          stampColor={stamp}
          footer={
            !exhausted && active
              ? `Karta ${active.total - active.remaining} z ${active.total}`
              : undefined
          }
        >
          {exhausted ? (
            <p className="text-lg text-inkMuted">
              Došly {mode === 'truth' ? 'otázky' : 'úkoly'}. Zamíchej balíček, nebo přepni.
            </p>
          ) : (
            <p>{active?.current}</p>
          )}
        </Card>
      )}

      {mode !== 'idle' && (
        <div className="mt-5 flex flex-col gap-3">
          {exhausted ? (
            <PrimaryButton
              onClick={() =>
                mode === 'truth' ? setTruth(truth.reset()) : setDare(dare.reset())
              }
            >
              Zamíchat balíček
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={drawNext}>
              Další {mode === 'truth' ? 'pravda' : 'úkol'}
            </PrimaryButton>
          )}
          <PrimaryButton variant="ghost" onClick={() => setMode('idle')}>
            ← Vybrat znovu
          </PrimaryButton>
        </div>
      )}
    </GameLayout>
  )
}
