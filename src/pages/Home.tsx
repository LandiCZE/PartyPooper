import { Link } from 'react-router-dom'

type Game = {
  path: string
  icon: string
  title: string
  subtitle: string
  stamp: string
}

const games: Game[] = [
  { path: '/never', icon: '🍺', title: 'Nikdy jsem', subtitle: 'Kdo to udělal, ten pije', stamp: '#a83223' },
  { path: '/king', icon: '👑', title: "King's Cup", subtitle: 'Balíček 52 karet', stamp: '#6a6a2a' },
  { path: '/picolo', icon: '🎯', title: 'Picolo', subtitle: 'Náhodné úkoly', stamp: '#26445c' },
  { path: '/truth-or-dare', icon: '🤔', title: 'Pravda nebo úkol', subtitle: 'Klasika, co nikdy nezklame', stamp: '#5a2a52' },
  { path: '/who', icon: '🙋', title: 'Kdo z vás…', subtitle: 'Odpovídají všichni', stamp: '#3a5a3a' },
  { path: '/most-likely', icon: '😂', title: 'Nejpravděpodobněji…', subtitle: 'Ukažte na viníka', stamp: '#a05a2a' },
  { path: '/would-you-rather', icon: '💬', title: 'Would You Rather', subtitle: 'Vyber menší zlo', stamp: '#7a2a2a' },
]

export default function Home() {
  return (
    <div className="min-h-screen safe-top safe-bottom">
      <div className="mx-auto max-w-md px-5">
        <header className="pt-4 pb-8">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-inkSoft">
            Party Pooper · Sbírka her
          </p>
          <h1 className="mt-3 font-display text-[44px] leading-[1.02] text-ink">
            Vyber balíček,
            <br />
            <em className="font-normal italic text-stamp-red">rozdej karty.</em>
          </h1>
          <p className="mt-4 max-w-[28ch] font-body text-sm text-inkMuted leading-relaxed">
            Sedm her, přes 800 karet. Na chatu, na chatě, na oslavu.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 pb-8">
          {games.map((g) => (
            <li key={g.path}>
              <Link
                to={g.path}
                className="group relative flex items-stretch bg-card border border-ink/10 shadow-card hover:shadow-cardHover transition-all duration-200 active:translate-y-[1px]"
              >
                <div className="absolute inset-2 border border-ink/10 pointer-events-none" />
                <div className="relative grid w-16 place-items-center border-r border-ink/10 text-3xl">
                  {g.icon}
                </div>
                <div className="relative flex-1 px-5 py-4">
                  <p className="font-display text-lg text-ink leading-tight">{g.title}</p>
                  <p className="mt-0.5 font-body text-[13px] text-inkMuted">{g.subtitle}</p>
                </div>
                <div
                  className="relative grid w-10 place-items-center font-display text-xl italic"
                  style={{ color: g.stamp }}
                >
                  →
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="pb-8 text-center">
          <span className="stamp text-inkSoft" style={{ borderColor: 'currentColor' }}>
            hraj s rozumem · 21+
          </span>
        </footer>
      </div>
    </div>
  )
}
