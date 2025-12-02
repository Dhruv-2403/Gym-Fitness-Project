export default function Showcase() {
  return (
    <section id="showcase" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">Preview</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">See your entire fitness universe at a glance</h2>
          <p className="mt-4 text-base text-slate-300">
            The FitFusion control room blends biometrics, training load, macros, and recovery cues inside a glass UI. Subtle gradients, airy spacing, and real-time motion make it feel alive.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-200">1</span>
              Adaptive sessions auto-sync across devices and wearables.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-200">2</span>
              Gamified streaks inject motivation and reward precision.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-200">3</span>
              Smart nudges highlight when to push and when to recover.
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-indigo-500/30 via-violet-500/10 to-fuchsia-500/30" aria-hidden="true" />
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_40px_120px_rgba(80,56,237,0.35)] backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
              <span>Dashboard</span>
              <span>Live sync • 97%</span>
            </div>
            <div className="rounded-2xl bg-slate-900/80 p-5">
              <p className="text-sm text-white/70">Energy curve</p>
              <div className="mt-4 flex items-end justify-between gap-2">
                {[40, 65, 55, 80, 70, 90, 62].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div className="relative w-full rounded-full bg-white/10">
                      <div className="h-24 w-full rounded-full bg-gradient-to-b from-lime-400/80 to-emerald-500/50" style={{ height: `${value}%` }} />
                    </div>
                    <span className="mt-2 text-[10px] text-white/40">Day {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/60">Readiness</p>
                <p className="text-3xl font-semibold text-white">92%</p>
                <p className="mt-1 text-xs text-emerald-300">Optimal • Go for PRs</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/60">Recovery</p>
                <p className="text-3xl font-semibold text-white">18 hrs</p>
                <p className="mt-1 text-xs text-amber-200">Mobility session scheduled</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 p-5">
              <p className="text-sm font-medium text-white">Coming up next</p>
              <p className="text-lg font-semibold text-white">AI Flow Session • 7:00 AM</p>
              <p className="text-xs text-white/70">Coach Aurora is warming up your playlist + breathing cues.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}