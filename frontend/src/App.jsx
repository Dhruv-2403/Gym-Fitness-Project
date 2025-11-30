import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Showcase from './components/Showcase.jsx'
import AccessPanels from './components/AccessPanels.jsx'
import Testimonials from './components/Testimonials.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function App() {
  const [authMode, setAuthMode] = useState(null)

  function openSignup() {
    setAuthMode('signup')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openLogin() {
    setAuthMode('login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function returnHome() {
    setAuthMode(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isAuthView = authMode === 'login' || authMode === 'signup'

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onLoginClick={openLogin} onSignupClick={openSignup} />
      {isAuthView ? (
        <main>
          <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-16 sm:px-8 lg:px-10">
            <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
                    {authMode === 'signup' ? 'Join the movement' : 'Welcome back'}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                    {authMode === 'signup' ? 'Create your FitFusion identity' : 'Log back into FitFusion'}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={returnHome}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white"
                >
                  ← Back to Home
                </button>
              </div>
              <div className="flex justify-center">
                {authMode === 'signup' ? (
                  <Signup
                    onSwitchToLogin={openLogin}
                    onSuccess={() => openLogin()}
                  />
                ) : (
                  <Login
                    onSwitchToSignup={openSignup}
                    onSuccess={returnHome}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <Hero onSignupClick={openSignup} />
          <Features />
          <Showcase />
          <AccessPanels onSignupClick={openSignup} onLoginClick={openLogin} />
          <Testimonials />
          <CallToAction onPrimaryClick={openSignup} onSecondaryClick={openLogin} />
        </main>
      )}
      <Footer />
    </div>
  )
}

export default App