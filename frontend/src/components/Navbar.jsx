import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, LayoutDashboard, ShoppingBag, User, Menu, X, LogIn, LogOut, Zap } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogout, onLoginClick, userXP = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname;



  const navItems = [
    { name: 'Home', icon: Home, path: '/', public: true },
    { name: 'Workouts', icon: Dumbbell, path: '/workouts', public: false },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', public: false },
    { name: 'Store', icon: ShoppingBag, path: '/store', public: false },
  ];

  const visibleNavItems = navItems.filter(item => item.public || isAuthenticated);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider text-white">
              FIT<span className="text-neon-blue">FUSION</span>
            </span>
          </div>

          {/* Center Navigation - Absolute Center */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
            {visibleNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 group ${activeTab === item.path ? 'text-neon-blue' : 'text-gray-300 hover:text-white'}`}
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

          {/* Right Side - Profile & Auth */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {/* XP Badge */}
                <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                  <span className="text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">TOTAL XP</span>
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="text-white font-semibold text-base">{userXP.toLocaleString()}</span>
                </div>

                {/* Profile Icon */}
                <Link
                  to="/profile"
                  className="relative p-2 rounded-full hover:bg-white/5 transition-colors group"
                >
                  <User className="w-6 h-6 text-gray-300 group-hover:text-neon-blue transition-colors" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-neon-blue rounded-full border-2 border-black" />
                </Link>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <LogIn className="w-4 h-4" />
                LOGIN
              </button>
            )}
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
          <div className="px-4 pt-4 pb-6 space-y-2">
            {visibleNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 text-neon-blue" />
                {item.name}
              </Link>
            ))}
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  onLoginClick();
                  setIsOpen(false);
                }}
                className="w-full text-left text-black bg-white hover:bg-gray-200 px-4 py-3 rounded-lg text-base font-bold flex items-center gap-3 mt-4 justify-center"
              >
                <LogIn className="w-5 h-5" />
                LOGIN
              </button>
            ) : (
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5 text-neon-blue" />
                Profile
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;