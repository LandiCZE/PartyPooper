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
      className={`animate-cardIn rounded-3xl border border-white/5 bg-panel/80 p-6 shadow-card backdrop-blur-sm ${className ?? ''}`}
      style={
        tint
          ? { backgroundImage: `linear-gradient(160deg, ${tint} 0%, transparent 65%)` }
          : undefined
      }
    >
      {eyebrow && (
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">{eyebrow}</div>
      )}
      <div className="min-h-[220px] flex flex-col justify-center text-2xl leading-snug font-medium">
        {children}
      </div>
    </div>
  )
}
