import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Showcase from './components/Showcase.jsx';
import AccessPanels from './components/AccessPanels.jsx';
import Testimonials from './components/Testimonials.jsx';

import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';


import Workouts from './pages/Workouts.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Store from './pages/Store.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Only Google Sign-In is supported

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

  const isAuthView = authMode === 'login';

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
                {'Welcome back'}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                {'Log back into FitFusion'}
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
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </section>
    </main>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar
        onLoginClick={openLogin}
        onSignupClick={openLogin}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {isAuthView ? (
        renderAuth()
      ) : (
        <Routes>
          <Route path="/" element={
            <main>
              <Hero onSignupClick={openLogin} onLoginClick={openLogin} />
              <Features />
              <Showcase />
              <AccessPanels onSignupClick={openLogin} onLoginClick={openLogin} />
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
