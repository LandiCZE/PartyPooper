import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

const styles: Record<Variant, string> = {
  primary:
    'bg-ink text-paper border-ink hover:bg-[#2a2320] active:bg-[#2a2320]',
  ghost:
    'bg-transparent text-ink border-ink/30 hover:border-ink/60 active:border-ink/60',
}

export default function PrimaryButton({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`w-full border font-body font-medium tracking-wide px-6 py-3.5 text-base transition-all duration-150 active:translate-y-[1px] disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
