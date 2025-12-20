const testimonials = [
  {
    name: 'Mira Lawson',
    role: 'Pro Runner & Creator',
    quote: 'FitFusion keeps my training cinematic. The AI adjusts pacing, nutrition, even mood playlists. My streak hasn\'t broken in 6 months.',
    rating: 5,
  },
  {
    name: 'Dev Patel',
    role: 'Founder, Studio Arc',
    quote: 'Clients love the accountability loops and in-app store drops. It\'s become the premium layer for my hybrid training business.',
    rating: 5,
  },
  {
    name: 'Rin Aoyama',
    role: 'Esports Performance Coach',
    quote: 'Analytics feel like a mission control center. We can predict burnout before it happens and gamify recovery.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">Testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Loved by athletes, creators, and coaches</h2>
          <p className="mt-4 text-base text-slate-300">
            Crafted for people who obsess over their craft. FitFusion provides the clarity, energy, and accountability to keep momentum.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_80px_rgba(12,13,18,0.65)] backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400/50 to-purple-500/40" />
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wide text-white/60">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} className="text-lime-300">★</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-200">“{testimonial.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}