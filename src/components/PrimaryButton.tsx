import { ButtonHTMLAttributes } from 'react'

type Variant = 'magenta' | 'cyan' | 'lime' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

const styles: Record<Variant, string> = {
  magenta:
    'bg-neon-magenta text-white border-white shadow-[5px_5px_0_0_#00e5ff] hover:shadow-[5px_5px_0_0_#00e5ff]',
  cyan: 'bg-neon-cyan text-ink border-white shadow-[5px_5px_0_0_#ff2d95]',
  lime: 'bg-neon-lime text-ink border-white shadow-[5px_5px_0_0_#ff2d95]',
  ghost:
    'bg-ink/40 text-white border-white/70 shadow-[5px_5px_0_0_rgba(255,255,255,0.25)]',
}

export default function PrimaryButton({
  variant = 'magenta',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`font-display w-full uppercase tracking-wider border-2 px-6 py-4 text-base sm:text-lg transition-transform duration-100 active:translate-x-[3px] active:translate-y-[3px] active:!shadow-none disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
