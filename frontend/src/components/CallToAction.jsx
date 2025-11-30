export default function CallToAction({ onPrimaryClick = () => {}, onSecondaryClick = () => {} }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)] opacity-30" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/80">Join the movement</p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Start your fitness transformation today.</h2>
        <p className="max-w-3xl text-base text-white/80">
          Align your body, mind, and data. FitFusion fuses AI intelligence with human energy to build a ritual you can sustain.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-white/30 transition hover:translate-y-0.5"
          >
            Create account
          </button>
          <button
            type="button"
            onClick={onSecondaryClick}
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/90 transition hover:bg-white/10"
          >
            I already have an account
          </button>
        </div>
      </div>
    </section>
  )
}
