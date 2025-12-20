const panels = [
  {
    id: 'signup',
    title: 'New to FitFusion?',
    description: 'Create your account and let our AI orchestrate your routines, recovery, and rituals from day one.',
    badge: 'Early access perks',
    buttonLabel: 'Signup',
    href: '#signup',
  },
  {
    id: 'login',
    title: 'Already training here?',
    description: 'Jump back into your dashboard, review streaks, and unlock tonight\'s session in seconds.',
    badge: 'Returning athletes',
    buttonLabel: 'Login',
    href: '#login',
  },
]

export default function AccessPanels() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">Access</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Choose your runway</h2>
          <p className="mt-4 text-base text-slate-300">The FitFusion ecosystem adapts instantly whether you\'re onboarding or picking up your streak.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {panels.map((panel) => (
            <article key={panel.id} id={`panel-${panel.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                {panel.badge}
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-white">{panel.title}</h3>
              <p className="mt-3 text-sm text-slate-200">{panel.description}</p>
              <a
                href={panel.href}
                className="mt-6 inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white"
              >
                {panel.buttonLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
