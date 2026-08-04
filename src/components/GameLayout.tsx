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
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        <header className="flex items-center justify-between pb-6 pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-body text-sm text-inkMuted hover:text-ink active:text-ink transition-colors"
            aria-label="Zpět"
          >
            ← Zpět
          </button>
          <div className="text-center">
            <h1 className="font-display text-lg text-ink leading-none">
              {icon && <span className="mr-1">{icon}</span>}
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 font-body text-[11px] uppercase tracking-widest text-inkSoft">
                {subtitle}
              </p>
            )}
          </div>
          <span className="w-14" aria-hidden />
        </header>

        <main className="flex flex-1 flex-col justify-center py-2">{children}</main>

        {footer && <div className="pb-6 pt-6">{footer}</div>}
      </div>
    </div>
  )
}
