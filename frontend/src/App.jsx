import { useState } from 'react'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function App() {
  const [view, setView] = useState('signup')
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      {view === 'signup' ? (
        <Signup onSwitchToLogin={() => setView('login')} />
      ) : (
        <Login onSwitchToSignup={() => setView('signup')} />
      )}
    </div>
  )
}

export default App