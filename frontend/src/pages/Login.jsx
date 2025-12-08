import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

export default function Login({ onSuccess, onGoHome }) {
  const [message, setMessage] = useState(null)
  const [signed, setSigned] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleGoogleResponse(credentialResponse) {
    console.log('Google response received:', credentialResponse)
    setGoogleLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
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

        <div className="space-y-5">
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onError={() => {
                setMessage({ type: 'error', text: 'Google Login Failed' })
              }}
              theme="filled_black"
              size="large"
              shape="pill"
              width="100%"
            />
          </div>
        </div>


      </div>
    </div>
  )
}