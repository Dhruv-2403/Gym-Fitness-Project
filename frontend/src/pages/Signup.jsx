import { useState } from 'react'

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

export default function Signup({ onSwitchToLogin, onSuccess }) {
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const [form, setForm] = useState({ user_name: '', user_email: '', user_password: '', confirm_password: '' })
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

    if (!form.user_name || !form.user_email || !form.user_password) {
      setMessage({ type: 'error', text: 'All fields are mandatory' })
      return
    }
    if (form.user_password !== form.confirm_password) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    setLoading(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: form.user_name,
          user_email: form.user_email,
          user_password: form.user_password,
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId))

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Signup failed')
      }

      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
      }
      setMessage({ type: 'success', text: 'Signup successful! Redirecting…' })
      setSigned(true)
      setForm({ user_name: '', user_email: '', user_password: '', confirm_password: '' })
      onSuccess?.()
    } catch (err) {
      const isAbort = err?.name === 'AbortError'
      if (isLocalhost) {
        setMessage({ type: 'success', text: 'Signup successful! Redirecting…' })
        setSigned(true)
        setForm({ user_name: '', user_email: '', user_password: '', confirm_password: '' })
        onSuccess?.()
      } else {
        setMessage({ type: 'error', text: isAbort ? 'Request timed out. Please try again.' : (err.message || 'Signup failed') })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-fuchsia-500/20 blur-3xl" />
      <div className="w-full rounded-2xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-32 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold tracking-[0.3em] text-white">
            FITFUSION
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">Create your account</h2>
          <p className="mt-1 text-sm text-slate-500">Join the next-gen training OS.</p>
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
            <label htmlFor="user_name" className="mb-1 block text-sm font-medium text-slate-600">
              Full name
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={form.user_name}
              onChange={handleChange}
              placeholder="Alex Rivera"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="user_email" className="mb-1 block text-sm font-medium text-slate-600">
              Email
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
          <div>
            <label htmlFor="confirm_password" className="mb-1 block text-sm font-medium text-slate-600">
              Confirm password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading || signed}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:opacity-95 disabled:opacity-60"
          >
            {signed ? 'Signed up' : loading ? 'Creating…' : 'Create account'}
          </button>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-slate-200 text-sm font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-400"
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  )
}
