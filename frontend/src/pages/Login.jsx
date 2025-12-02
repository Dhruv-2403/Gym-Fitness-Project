import { useState } from 'react'

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export default function Login({ onSwitchToSignup, onSuccess }) {
  const [form, setForm] = useState({ user_name: '', user_email: '', user_password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [signed, setSigned] = useState(false)

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

  function handleGoogleLogin() {
    window.location.href = `${API_BASE}/api/auth/google`
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-fuchsia-500/20 blur-3xl" />
      <div className="w-full rounded-2xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-32 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold tracking-[0.3em] text-white">
            FITFUSION
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500">Log in to continue your streak.</p>
        </div>

        {message && (
          <div
            className={`${message.type === 'error' ? 'bg-red-100/70 text-red-800 border-red-200' : 'bg-emerald-100/70 text-emerald-800 border-emerald-200'} mb-5 rounded-lg border px-3 py-2 text-sm`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
          <div>
            <label htmlFor="user_email" className="mb-1 block text-sm font-medium text-slate-600">
              Email (or use username below)
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="user_name" className="mb-1 block text-sm font-medium text-slate-600">
              Username (optional)
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={form.user_name}
              onChange={handleChange}
              placeholder="yourusername"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="user_password" className="mb-1 block text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              id="user_password"
              name="user_password"
              type="password"
              value={form.user_password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading || signed}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:opacity-95 disabled:opacity-60"
          >
            {signed ? 'Logged in' : loading ? 'Logging in…' : 'Log in'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || signed}
            className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
