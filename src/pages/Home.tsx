import { Link } from 'react-router-dom'

type Game = {
  path: string
  icon: string
  title: string
  subtitle: string
  gradient: string
}

const games: Game[] = [
  {
    path: '/never',
    icon: '🍺',
    title: 'Nikdy jsem',
    subtitle: 'Kdo to udělal, ten pije',
    gradient: 'from-pink-500/30 to-rose-500/10',
  },
  {
    path: '/king',
    icon: '👑',
    title: "King's Cup",
    subtitle: 'Balíček 52 karet s pravidly',
    gradient: 'from-amber-400/30 to-yellow-500/10',
  },
  {
    path: '/picolo',
    icon: '🎯',
    title: 'Picolo',
    subtitle: 'Náhodné úkoly pro partu',
    gradient: 'from-sky-500/30 to-cyan-500/10',
  },
  {
    path: '/truth-or-dare',
    icon: '🤔',
    title: 'Pravda nebo úkol',
    subtitle: 'Klasika, která nikdy nezklame',
    gradient: 'from-fuchsia-500/30 to-purple-500/10',
  },
  {
    path: '/who',
    icon: '🙋',
    title: 'Kdo z vás…',
    subtitle: 'Odpovídají všichni',
    gradient: 'from-emerald-500/30 to-teal-500/10',
  },
  {
    path: '/most-likely',
    icon: '😂',
    title: 'Nejpravděpodobněji…',
    subtitle: 'Ukažte na viníka',
    gradient: 'from-orange-500/30 to-red-500/10',
  },
  {
    path: '/would-you-rather',
    icon: '💬',
    title: 'Would You Rather',
    subtitle: 'Vyber si menší zlo',
    gradient: 'from-indigo-500/30 to-violet-500/10',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen safe-top safe-bottom">
      <div className="mx-auto max-w-md px-5">
        <header className="pt-4 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Party Pooper</p>
          <h1 className="mt-1 text-3xl font-bold leading-tight">
            Vyber hru <span className="text-accent">a jdeme na to.</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ideální pro večírky, chaty a večery, které se vymknou kontrole.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-3 pb-8">
          {games.map((g) => (
            <li key={g.path}>
              <Link
                to={g.path}
                className={`group flex items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-br ${g.gradient} bg-panel/60 p-4 shadow-card backdrop-blur-sm transition active:scale-[0.98]`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-3xl">
                  {g.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold">{g.title}</span>
                  <span className="block text-sm text-muted">{g.subtitle}</span>
                </span>
                <span className="text-2xl text-white/40 transition group-active:translate-x-0.5">›</span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="pb-6 text-center text-xs text-muted">
          Hraj s rozumem. 21+ • Nezapomeň na vodu.
        </footer>
      </div>
    </div>
  )
}
