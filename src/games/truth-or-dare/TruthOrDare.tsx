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
        <div className="grid grid-cols-1 gap-5">
          <button
            type="button"
            onClick={() => pick('truth')}
            className="group relative border-2 border-white/90 bg-neon-purple/25 shadow-[6px_6px_0_0_#00e5ff] p-6 text-left transition-transform duration-100 active:translate-x-[3px] active:translate-y-[3px] active:!shadow-none"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-neon-purple" />
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-neon-cyan">Volba 01</p>
            <p className="mt-3 font-display text-4xl uppercase text-white">Pravda</p>
            <p className="mt-3 text-sm text-white/70">Odpověz upřímně. Bez triků, bez výmluv.</p>
          </button>
          <button
            type="button"
            onClick={() => pick('dare')}
            className="group relative border-2 border-white/90 bg-neon-magenta/25 shadow-[6px_6px_0_0_#d0ff00] p-6 text-left transition-transform duration-100 active:translate-x-[3px] active:translate-y-[3px] active:!shadow-none"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-neon-magenta" />
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-neon-lime">Volba 02</p>
            <p className="mt-3 font-display text-4xl uppercase text-white">Úkol</p>
            <p className="mt-3 text-sm text-white/70">Splň, co karta naordinuje. Bez slitování.</p>
          </button>
          <button
            type="button"
            onClick={() => pick(Math.random() < 0.5 ? 'truth' : 'dare')}
            className="mt-1 font-display border-2 border-white/40 bg-transparent py-3 text-xs uppercase tracking-widest text-white/60 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
          >
            🎲 Vyber za mě náhodně
          </button>
        </div>
      )}

      {mode !== 'idle' && (
        <Card
          keyId={active?.current ?? `${mode}-end`}
          tint={mode === 'truth' ? 'rgba(139, 92, 255, 0.22)' : 'rgba(255, 45, 149, 0.22)'}
          eyebrow={mode === 'truth' ? 'Pravda' : 'Úkol'}
        >
          {exhausted ? (
            <p className="text-lg text-white/70 normal-case">
              Došly {mode === 'truth' ? 'otázky' : 'úkoly'}. Zamíchej balíček, nebo přepni.
            </p>
          ) : (
            <p className="normal-case">{active?.current}</p>
          )}
        </Card>
      )}

      {mode !== 'idle' && (
        <div className="mt-5 flex flex-col gap-3">
          {exhausted ? (
            <PrimaryButton
              variant={mode === 'truth' ? 'cyan' : 'magenta'}
              onClick={() =>
                mode === 'truth' ? setTruth(truth.reset()) : setDare(dare.reset())
              }
            >
              Zamíchat balíček
            </PrimaryButton>
          ) : (
            <PrimaryButton
              variant={mode === 'truth' ? 'cyan' : 'magenta'}
              onClick={drawNext}
            >
              Další {mode === 'truth' ? 'pravda' : 'úkol'}
            </PrimaryButton>
          )}
          <PrimaryButton variant="ghost" onClick={backToChoice}>
            ◄ Vybrat znovu
          </PrimaryButton>
        </div>
      )}
    </GameLayout>
  )
}
