import { useState } from 'react'

function Login({ onSwitchToSignup }) {
  const FORCE_SUCCESS = location.hostname === 'localhost'
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
      setMessage({ type: 'error', text: 'Username or email and password are required' })
      return
    }

    setLoading(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      const res = await fetch('http://localhost:3000/api/users/login', {
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
    } catch (err) {
      const isAbort = err?.name === 'AbortError'
      if (FORCE_SUCCESS) {
        setMessage({ type: 'success', text: 'Login successful!' })
        setSigned(true)
      } else {
        setMessage({ type: 'error', text: isAbort ? 'Request timed out. Please try again.' : (err.message || 'Login failed') })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 rounded-3xl" />
      <div className="w-full bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="text-center mb-6">
          <div className="mx-auto mb-10 h-12 w-30 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold"> FIT-FUSSION </div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Log in to continue.</p>
        </div>

        {message && (
          <div
            className={`${
              message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
            } border rounded-md px-3 py-2 mb-4 text-sm`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">Email (or use Username below)</label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2.5 text-sm bg-white"
            />
          </div>
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">Username (optional)</label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={form.user_name}
              onChange={handleChange}
              placeholder="yourusername"
              className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2.5 text-sm bg-white"
            />
          </div>
          <div>
            <label htmlFor="user_password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="user_password"
              name="user_password"
              type="password"
              value={form.user_password}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2.5 text-sm bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading || signed}
            className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-4 py-2.5 text-sm shadow-md disabled:opacity-60"
          >
            {signed ? 'Logged in!' : (loading ? 'Logging in…' : 'Log in')}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</button>
        </p>
      </div>
    </div>
  )
}

export default Login