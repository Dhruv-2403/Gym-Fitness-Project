const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Store', href: '#store' },
]

export default function Navbar({ onLoginClick = () => {}, onSignupClick = () => {} }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
  <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 text-sm font-medium sm:px-8 lg:px-10">

  
    <a href="#home" className="text-lg font-semibold tracking-[0.2em] text-white">
      FitFusion
    </a>

    
    <nav className="hidden items-center gap-8 text-slate-200 md:flex ml-20">
      {navLinks.map((link) => (
        <a key={link.label} href={link.href} className="transition hover:text-white">
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={onLoginClick}
        className="text-slate-300 transition hover:text-white"
      >
        Login
      </button>
      <button
        type="button"
        onClick={onSignupClick}
        className="text-slate-300 transition hover:text-white"
      >
        Signup
      </button>
    </nav>


    <div className="flex items-center gap-4 mr-4">
      <div className="hidden h-10 items-center gap-3 rounded-full border border-white/15 bg-gradient-to-br from-[#1a1f2e] via-[#151b2b] to-[#0f1424] px-5 md:flex">
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#b7bfd3]">Total XP</span>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] via-[#8b5cf6] to-[#a855f7] text-xs text-white">⚡</div>
          <span className="text-sm text-white font-semibold">15,554</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSignupClick}
        className="hidden md:inline-flex h-10 items-center rounded-full border border-white/30 px-4 text-xs uppercase tracking-wide text-white transition hover:border-white"
      >
        Get Started
      </button>

      <button
        type="button"
        onClick={onSignupClick}
        className="inline-flex h-10 items-center rounded-full border border-white/10 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 text-xs uppercase tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
      >
        Start Free
      </button>
    </div>
  </div>
</header>

  )
}
