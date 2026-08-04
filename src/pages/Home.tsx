import { Link } from 'react-router-dom'

type Color = 'magenta' | 'cyan' | 'lime' | 'purple' | 'orange'

type Game = {
  path: string
  icon: string
  title: string
  subtitle: string
  color: Color
}

const games: Game[] = [
  { path: '/never', icon: '🍺', title: 'Nikdy jsem', subtitle: 'Kdo to udělal, ten pije', color: 'magenta' },
  { path: '/king', icon: '👑', title: "King's Cup", subtitle: 'Balíček 52 karet', color: 'lime' },
  { path: '/picolo', icon: '🎯', title: 'Picolo', subtitle: 'Náhodné úkoly', color: 'cyan' },
  { path: '/truth-or-dare', icon: '🤔', title: 'Pravda nebo úkol', subtitle: 'Klasika, co nikdy nezklame', color: 'purple' },
  { path: '/who', icon: '🙋', title: 'Kdo z vás…', subtitle: 'Odpovídají všichni', color: 'cyan' },
  { path: '/most-likely', icon: '😂', title: 'Nejpravděpodobněji…', subtitle: 'Ukažte na viníka', color: 'orange' },
  { path: '/would-you-rather', icon: '💬', title: 'Would You Rather', subtitle: 'Vyber menší zlo', color: 'magenta' },
]

const bgTint: Record<Color, string> = {
  magenta: 'bg-neon-magenta/15',
  cyan: 'bg-neon-cyan/15',
  lime: 'bg-neon-lime/15',
  purple: 'bg-neon-purple/15',
  orange: 'bg-neon-orange/15',
}
const shadow: Record<Color, string> = {
  magenta: 'shadow-[5px_5px_0_0_#00e5ff]',
  cyan: 'shadow-[5px_5px_0_0_#ff2d95]',
  lime: 'shadow-[5px_5px_0_0_#ff2d95]',
  purple: 'shadow-[5px_5px_0_0_#d0ff00]',
  orange: 'shadow-[5px_5px_0_0_#00e5ff]',
}
const accent: Record<Color, string> = {
  magenta: 'text-neon-magenta',
  cyan: 'text-neon-cyan',
  lime: 'text-neon-lime',
  purple: 'text-neon-purple',
  orange: 'text-neon-orange',
}

export default function Home() {
  return (
    <div className="min-h-screen safe-top safe-bottom">
      <div className="mx-auto max-w-md px-4">
        <header className="pt-2 pb-6">
          <div className="border-2 border-white/90 bg-ink/70 backdrop-blur-sm px-3 py-2 flex items-center justify-between font-display text-[10px] uppercase tracking-widest">
            <span className="text-neon-magenta">■ PARTY POOPER</span>
            <span className="font-mono text-base text-neon-cyan tabular-nums leading-none">
              CREDIT <span className="animate-blink">∞</span>
            </span>
          </div>

          <h1 className="mt-8 font-display text-4xl sm:text-5xl uppercase leading-[0.95]">
            <span className="block text-white">VYBER</span>
            <span className="block text-neon-magenta text-shadow-neon">HRU.</span>
          </h1>
          <p className="mt-4 max-w-[24ch] text-sm text-muted">
            7 her <span className="text-neon-lime">·</span> 800+ karet <span className="text-neon-lime">·</span> insert coin, start party.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 pb-8">
          {games.map((g) => (
            <li key={g.path}>
              <Link
                to={g.path}
                className={`group relative flex items-stretch border-2 border-white/90 ${bgTint[g.color]} ${shadow[g.color]} transition-transform duration-100 active:translate-x-[3px] active:translate-y-[3px] active:!shadow-none`}
              >
                <div className={`grid w-16 place-items-center border-r-2 border-white/90 bg-ink/70 text-3xl`}>
                  {g.icon}
                </div>
                <div className="flex-1 px-4 py-3">
                  <p className={`font-display text-sm sm:text-base uppercase leading-tight text-white`}>
                    {g.title}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                    {g.subtitle}
                  </p>
                </div>
                <div className={`grid w-11 place-items-center border-l-2 border-white/90 bg-ink/70 font-display text-xl ${accent[g.color]}`}>
                  ▶
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="pb-8 text-center font-display text-[10px] uppercase tracking-[0.3em] text-muted">
          <span className="text-neon-lime">◆</span>&nbsp;hraj s rozumem · 21+&nbsp;<span className="text-neon-lime">◆</span>
        </footer>
      </div>
    </div>
  )
}
