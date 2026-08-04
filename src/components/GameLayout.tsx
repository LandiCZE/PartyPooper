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
        <header className="flex items-center justify-between pb-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-xl text-white/80 active:scale-95"
            aria-label="Zpět"
          >
            ‹
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Hra</p>
            <h1 className="text-base font-semibold">
              {icon && <span className="mr-1">{icon}</span>}
              {title}
            </h1>
          </div>
          <span className="h-11 w-11" aria-hidden />
        </header>

        {subtitle && (
          <p className="pb-2 text-center text-sm text-muted">{subtitle}</p>
        )}

        <main className="flex flex-1 flex-col justify-center py-4">{children}</main>

        {footer && <div className="pb-4 pt-2">{footer}</div>}
      </div>
    </div>
  )
}
