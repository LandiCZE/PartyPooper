import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  keyId?: string | number
  eyebrow?: ReactNode
  footer?: ReactNode
  stampColor?: string
  className?: string
}

export default function Card({
  children,
  keyId,
  eyebrow,
  footer,
  stampColor = '#a83223',
  className,
}: Props) {
  return (
    <div
      key={keyId}
      className={`animate-cardIn relative bg-card shadow-card border border-ink/10 ${className ?? ''}`}
    >
      {/* thin ink rule inset around the card */}
      <div className="absolute inset-2 border border-ink/15 pointer-events-none" />

      <div className="relative px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
        {eyebrow && (
          <div className="mb-3 flex justify-center">
            <span className="stamp" style={{ color: stampColor }}>
              {eyebrow}
            </span>
          </div>
        )}

        <div className="min-h-[220px] flex flex-col justify-center font-display text-2xl sm:text-3xl leading-[1.25] text-ink text-balance text-center">
          {children}
        </div>

        {footer && (
          <>
            <div className="divider-wave mt-6" />
            <div className="mt-3 text-center font-body text-xs uppercase tracking-widest text-inkMuted">
              {footer}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
