import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Showcase from './components/Showcase.jsx';
import AccessPanels from './components/AccessPanels.jsx';
import Testimonials from './components/Testimonials.jsx';

import Footer from './components/Footer.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';


import Workouts from './pages/Workouts.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Store from './pages/Store.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const openSignup = () => {
    setAuthMode('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLogin = () => {
    setAuthMode('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    navigate('/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnHome = () => {
    setAuthMode(null);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAuthView = authMode === 'login' || authMode === 'signup';

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      openLogin();
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const renderAuth = () => (
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
              <Signup onSwitchToLogin={openLogin} onSuccess={() => openLogin()} />
            ) : (
              <Login onSwitchToSignup={openSignup} onSuccess={handleLoginSuccess} />
            )}
          </div>
        </div>
      </section>
    </main>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar
        onLoginClick={openLogin}
        onSignupClick={openSignup}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {isAuthView ? (
        renderAuth()
      ) : (
        <Routes>
          <Route path="/" element={
            <main>
              <Hero onSignupClick={openSignup} onLoginClick={openLogin} />
              <Features />
              <Showcase />
              <AccessPanels onSignupClick={openSignup} onLoginClick={openLogin} />
              <Testimonials />

            </main>
          } />
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/store" element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
