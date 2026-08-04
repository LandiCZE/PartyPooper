import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  keyId?: string | number
  tint?: string
  eyebrow?: ReactNode
  className?: string
}

export default function Card({ children, keyId, tint, eyebrow, className }: Props) {
  return (
    <div
      key={keyId}
      className={`animate-cardIn relative border-2 border-white/90 bg-panel shadow-[5px_5px_0_0_#ff2d95,10px_10px_0_0_#00e5ff] ${className ?? ''}`}
      style={
        tint
          ? { backgroundImage: `linear-gradient(160deg, ${tint} 0%, transparent 70%)` }
          : undefined
      }
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-neon-magenta via-neon-cyan to-neon-lime" />

      <div className="px-5 pt-6 pb-6 sm:px-6 sm:pt-7 sm:pb-7">
        {eyebrow && (
          <div className="mb-3 font-display text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
            {eyebrow}
          </div>
        )}
        <div className="min-h-[220px] flex flex-col justify-center text-xl sm:text-2xl leading-snug font-semibold uppercase">
          {children}
        </div>
      </div>
    </div>
  )
}
