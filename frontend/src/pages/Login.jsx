import { useState, useEffect } from 'react'

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

export default function Login({ onSwitchToSignup, onSuccess, onGoHome }) {
  const [form, setForm] = useState({ user_name: '', user_email: '', user_password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [signed, setSigned] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.google) {
        // Initialize the client
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
        })

        // Render the button
        const buttonDiv = document.getElementById('google-btn-container')
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: 'filled_black',
            size: 'large',
            width: '100%', // Make it fill the container
            text: 'continue_with',
            shape: 'pill',
          })
        }
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)

    if ((!form.user_name && !form.user_email) || !form.user_password) {
      setMessage({ type: 'error', text: 'Provide username or email plus your password.' })
      return
    }

    setLoading(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: form.user_name || undefined,
          user_email: form.user_email || undefined,
          user_password: form.user_password,
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId))

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Login failed')
      }

      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
      }
      setMessage({ type: 'success', text: 'Login successful!' })
      setSigned(true)
      onSuccess?.()
    } catch (err) {
      const isAbort = err?.name === 'AbortError'
      setMessage({ type: 'error', text: isAbort ? 'Request timed out, try again.' : (err.message || 'Login failed') })
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleResponse(response) {
    console.log('Google response received:', response)
    setGoogleLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Google login failed')
      }

      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
      }
      setMessage({ type: 'success', text: 'Google login successful!' })
      setSigned(true)
      onSuccess?.()
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Google login failed' })
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-neon-blue/20 via-neon-purple/10 to-fuchsia-500/20 blur-3xl opacity-50" />

      <div className="w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-2xl">
        <div className="mb-10 text-center">
          <div
            className="mx-auto mb-6 flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onGoHome}
          >
            <span className="text-3xl font-bold tracking-wider text-white">
              FIT<span className="text-neon-blue">FUSION</span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Log in to access your personalized dashboard.</p>
        </div>

        {message && (
          <div
            className={`${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} mb-6 rounded-xl border px-4 py-3 text-sm font-medium`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="user_email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Email
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
            />
          </div>
          <div>
            <label htmlFor="user_name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Username
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={form.user_name}
              onChange={handleChange}
              placeholder="yourusername"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
            />
          </div>
          <div>
            <label htmlFor="user_password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Password
            </label>
            <input
              id="user_password"
              name="user_password"
              type="password"
              value={form.user_password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || signed}
            className="w-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple py-3.5 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_20px_rgba(0,227,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,227,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signed ? 'Logged in' : loading ? 'Logging in…' : 'Log in'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-[#0a0a0a] px-3 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div id="google-btn-container" className="w-full flex justify-center"></div>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="font-semibold text-neon-blue hover:text-neon-purple transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}