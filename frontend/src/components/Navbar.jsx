import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, LayoutDashboard, ShoppingBag, User, Menu, X, LogIn, LogOut } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogout, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { name: 'Home', icon: Home, path: '/', public: true },
    { name: 'Workouts', icon: Dumbbell, path: '/workouts', public: false },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', public: false },
    { name: 'Store', icon: ShoppingBag, path: '/store', public: false },
    { name: 'Profile', icon: User, path: '/profile', public: false },
  ];

  const visibleNavItems = navItems.filter(item => item.public || isAuthenticated);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">
              FIT<span className="text-neon-blue">FUSION</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-baseline space-x-8">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 group ${activeTab === item.path ? 'text-neon-blue' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>
                  {activeTab === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-neon-blue/10 rounded-md border border-neon-blue/30 shadow-[0_0_10px_rgba(0,227,255,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Login/Logout Button */}
            <button
              onClick={isAuthenticated ? onLogout : onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold text-black hover:scale-105 transition-transform duration-300"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {visibleNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 text-neon-blue" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                isAuthenticated ? onLogout() : onLoginClick();
                setIsOpen(false);
              }}
              className="w-full text-left text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-5 h-5 text-neon-blue" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 text-neon-blue" />
                  Login
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
