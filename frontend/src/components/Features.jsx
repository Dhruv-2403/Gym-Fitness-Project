const iconBase = 'h-7 w-7 text-indigo-50'

const AiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconBase}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" className="stroke-indigo-200" />
    <path d="M8 12h8" className="stroke-indigo-100" strokeLinecap="round" />
    <circle cx="9" cy="12" r="2.5" className="stroke-lime-200" />
    <circle cx="15" cy="12" r="2.5" className="stroke-purple-200" />
  </svg>
)

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconBase}>
    <path
      d="M12 3c.8 3.2-.8 4.5-1.7 6.6-.8 1.9.1 3.6 1.7 4.4 2.1 1.1 2 3.4 0 4.9-3.2 2.3-7.5-.7-7-4.7C5.5 9.9 9.7 7.6 12 3Z"
      className="stroke-orange-200"
    />
    <path d="M16 8c2.6 2.2 4.5 5.6 1.9 9-1.5 2-4.3 2.7-6.6 1.9" className="stroke-pink-200" />
  </svg>
)

const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconBase}>
    <path d="M6 8h12l1.5 11.5H4.5L6 8Z" className="stroke-indigo-200" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" className="stroke-white" />
    <circle cx="9" cy="11" r=".8" className="fill-lime-200 stroke-lime-200" />
    <circle cx="15" cy="11" r=".8" className="fill-lime-200 stroke-lime-200" />
  </svg>
)

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconBase}>
    <path d="M4 18h16" className="stroke-white/70" strokeLinecap="round" />
    <path d="M7 18V9.5" className="stroke-lime-200" strokeLinecap="round" />
    <path d="M12 18V6" className="stroke-sky-200" strokeLinecap="round" />
    <path d="M17 18v-4.5" className="stroke-fuchsia-200" strokeLinecap="round" />
    <path d="M6 12l5-4 4 3 4-5" className="stroke-indigo-200" strokeLinecap="round" />
  </svg>
)

const features = [
  {
    icon: AiIcon,
    title: 'AI Workout Generator',
    description: 'Adaptive programs fueled by biometrics, readiness, and your real-time feedback to keep every session fresh.',
  },
  {
    icon: FlameIcon,
    title: 'Gamified Progress',
    description: 'Earn streaks, badges, and XP boosts that sync with your friends so motivation always feels electric.',
  },
  {
    icon: BagIcon,
    title: 'Built-In Store',
    description: 'Shop curated recovery tools, supplements, and gear that sync directly with your training calendar.',
  },
  {
    icon: ChartIcon,
    title: 'Smart Analytics Dashboard',
    description: 'See performance trends, readiness scores, and predictive insights in a lucid control center.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(107,91,255,0.15),_transparent_55%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">Features</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">Precision-crafted tools for athletes who expect more</h2>
          <p className="mt-4 text-base text-slate-300">
            FitFusion layers AI coaching, immersive storytelling, and commerce into one premium training OS. Everything feels cohesive, fast, and inspiring.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30">
                <feature.icon />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-200">
                Explore capability
                <span className="text-white/70 transition group-hover:translate-x-1">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}