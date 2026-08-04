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

  function backToChoice() {
    setMode('idle')
  }

  const active = mode === 'truth' ? truth : mode === 'dare' ? dare : null
  const exhausted = active !== null && active.exhausted

  return (
    <GameLayout title="Pravda nebo úkol" icon="🤔">
      {mode === 'idle' && (
        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={() => pick('truth')}
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-fuchsia-500/25 to-fuchsia-500/5 p-8 text-left shadow-card transition active:scale-[0.98]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Volba 1</p>
            <p className="mt-2 text-3xl font-bold">Pravda</p>
            <p className="mt-2 text-sm text-muted">Odpověz upřímně na otázku.</p>
          </button>
          <button
            type="button"
            onClick={() => pick('dare')}
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-accent/25 to-accent/5 p-8 text-left shadow-card transition active:scale-[0.98]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Volba 2</p>
            <p className="mt-2 text-3xl font-bold">Úkol</p>
            <p className="mt-2 text-sm text-muted">Splň, co ti karta naordinuje.</p>
          </button>
          <button
            type="button"
            onClick={() => pick(Math.random() < 0.5 ? 'truth' : 'dare')}
            className="mt-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm text-white/70 active:scale-[0.98]"
          >
            🎲 Vyber za mě náhodně
          </button>
        </div>
      )}

      {mode !== 'idle' && (
        <Card
          keyId={active?.current ?? `${mode}-end`}
          tint={mode === 'truth' ? 'rgba(217, 70, 239, 0.18)' : 'rgba(255, 92, 138, 0.18)'}
          eyebrow={mode === 'truth' ? 'Pravda' : 'Úkol'}
        >
          {exhausted ? (
            <p className="text-xl text-muted">
              Došly {mode === 'truth' ? 'otázky' : 'úkoly'}. Zamíchej balíček, nebo přepni.
            </p>
          ) : (
            <p>{active?.current}</p>
          )}
        </Card>
      )}

      {mode !== 'idle' && (
        <div className="mt-4 flex flex-col gap-2">
          {exhausted ? (
            <PrimaryButton
              onClick={() =>
                mode === 'truth' ? setTruth(truth.reset()) : setDare(dare.reset())
              }
            >
              Zamíchat balíček
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={drawNext}>Další {mode === 'truth' ? 'pravda' : 'úkol'}</PrimaryButton>
          )}
          <PrimaryButton variant="ghost" onClick={backToChoice}>
            ← Vybrat znovu
          </PrimaryButton>
        </div>
      )}
    </GameLayout>
  )
}
