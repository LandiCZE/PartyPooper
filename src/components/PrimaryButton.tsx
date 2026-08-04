import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function PrimaryButton({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: Props) {
  const base =
    'w-full rounded-2xl px-6 py-4 text-lg font-semibold transition active:scale-[0.98] disabled:opacity-50'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-white shadow-[0_10px_30px_-10px_rgba(255,92,138,0.7)] hover:brightness-110'
      : 'bg-white/5 text-white/90 hover:bg-white/10 border border-white/10'
  return (
    <button {...rest} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  )
}
