const heroStats = [
  { label: 'AI programs delivered', value: '180K+' },
  { label: 'Avg. daily streak', value: '21 days' },
  { label: 'Community energy', value: '4.9/5' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-24 text-white">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-green-400/20 to-sky-500/20 blur-3xl" />
      </div>
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 sm:px-8 lg:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
            Next-gen fitness + AI
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Transform Your Fitness Journey with AI-Powered Training
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200">
            Personalized workouts, gamified motivation, and seamless progress tracking — all in one platform.
            FitFusion feels like a performance coach, accountability partner, and hype squad combined.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#signup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-xl shadow-indigo-500/40 transition hover:scale-105"
            >
              Start Free
            </a>
            <button className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/90 transition hover:border-white hover:text-white">
              Go Store
            </button>
          </div>
          <div className="mt-10 grid gap-6 text-sm text-white/70 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl border border-white/10" />
          <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full border border-green-400/40" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between text-white/70">
              <span className="text-sm font-medium">Coach Aurora</span>
              <span className="text-xs uppercase tracking-wide">AI Live</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-900/80 p-6">
                <p className="text-sm text-white/80">Today&apos;s adaptive plan</p>
                <p className="mt-2 text-3xl font-semibold">Hybrid strength + flow</p>
                <p className="mt-2 text-sm text-white/70">45 min • Level 02 • 520 kcal</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">Focus</p>
                  <p className="mt-1 text-lg font-semibold text-white">Core stability</p>
                  <p className="text-xs text-white/60">AI intensity: 78%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">Mood</p>
                  <p className="mt-1 text-lg font-semibold text-white">Powered up ⚡️</p>
                  <p className="text-xs text-white/60">Gamified streak: 18 days</p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white/70">
              Next session unlocks a neon badge and double XP.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
