import Signup from '../pages/Signup.jsx'
import Login from '../pages/Login.jsx'

function scrollToSection(targetId) {
  if (typeof window === 'undefined') return
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function AuthSection() {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">Join FitFusion</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Create or resume your ritual</h2>
          <p className="text-base text-slate-300">
            The FitFusion identity layer is now ready. Sync your data, access AI coaching, and keep your streak alive with secure authentication.
          </p>
        </div>
        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div id="signup" className="scroll-mt-32">
            <Signup onSwitchToLogin={() => scrollToSection('login')} />
          </div>
          <div id="login" className="scroll-mt-32">
            <Login onSwitchToSignup={() => scrollToSection('signup')} />
          </div>
        </div>
      </div>
    </section>
  )
}
