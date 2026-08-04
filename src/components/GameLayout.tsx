import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
  icon?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export default function GameLayout({ title, icon, subtitle, children, footer }: Props) {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col safe-top safe-bottom">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4">
        <header className="mb-4 border-2 border-white/90 bg-ink/70 backdrop-blur-sm">
          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-display px-3 py-2 text-xs uppercase tracking-widest text-neon-magenta border-r-2 border-white/90 active:bg-neon-magenta active:text-ink transition-colors"
              aria-label="Zpět"
            >
              ◄ HOME
            </button>
            <div className="flex-1 grid place-items-center px-2 py-2">
              <span className="font-display text-xs uppercase tracking-widest text-white text-center leading-tight">
                {icon && <span className="mr-1">{icon}</span>}
                {title}
              </span>
            </div>
            <div className="grid place-items-center px-3 py-2 border-l-2 border-white/90">
              <span className="font-mono text-lg leading-none text-neon-cyan tabular-nums whitespace-nowrap">
                {subtitle ?? '·····'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-2">{children}</main>

        {footer && <div className="pb-4 pt-4">{footer}</div>}
      </div>
    </div>
  )
}
