import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Clock } from 'lucide-react';
import heroCurls from '../assets/hero_curls.png';
import heroHolo from '../assets/hero_holo.png';
import heroDeadlift from '../assets/hero_deadlift.png';
import heroFlex from '../assets/hero_flex.png';
import heroChest from '../assets/hero_chest.png';
import heroPortrait from '../assets/hero_portrait.png';

const Hero = ({ onSignupClick, onLoginClick }) => {
  const floatingImages = [
    {
      src: heroDeadlift,
      alt: "Heavy Deadlift",
      style: "top-0 left-10 z-20 w-64 md:w-72 aspect-[3/4]",
      rotate: -6,
      delay: 0
    },
    {
      src: heroCurls,
      alt: "Bicep Curls",
      style: "bottom-20 left-0 z-40 w-56 md:w-64 aspect-square",
      rotate: -12,
      delay: 0.8
    },
    {
      src: heroFlex,
      alt: "Physique Flex",
      style: "bottom-0 right-10 z-50 w-56 md:w-64 aspect-[3/4]",
      rotate: 8,
      delay: 2.2
    },
    {
      src: heroChest,
      alt: "Chest Workout",
      style: "top-16 right-4 z-15 w-48 md:w-56 aspect-square opacity-90",
      rotate: -10,
      delay: 1.8
    },
    {
      src: heroPortrait,
      alt: "Athlete Portrait",
      style: "top-1/2 left-1/4 z-5 w-44 md:w-52 aspect-[3/4] opacity-75",
      rotate: 15,
      delay: 3.0
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="max-w-full mx-auto px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-sm font-medium text-neon-cyan tracking-wider">AI-POWERED EVOLUTION</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">FORGET YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple neon-text-blue">ULTIMATE FORM</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            Experience the next generation of fitness. AI-driven protocols, holographic tracking, and a community that pushes boundaries.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-bold text-black hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,227,255,0.4)] flex items-center gap-2 group cursor-pointer"
            >
              START WORKOUT
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/store" className="px-8 py-4 bg-transparent border border-white/20 rounded-lg font-bold text-white hover:bg-white/5 hover:border-neon-blue/50 transition-all duration-300">
              EXPLORE STORE
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { label: 'Workouts', value: '1.2M+', icon: Activity, color: 'text-neon-blue' },
              { label: 'Calories', value: '850M+', icon: Zap, color: 'text-neon-purple' },
              { label: 'Latency', value: '12ms', icon: Clock, color: 'text-neon-cyan' },
            ].map((stat, index) => (
              <div key={index} className="glass-panel p-4 rounded-xl border border-white/5">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Visuals - Floating Tiles Layout */}
        <div className="relative h-[600px] w-full perspective-1000">
          {/* Holographic Background Element - Left */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 bottom-0 -left-[600px] w-full flex items-center justify-center z-0"
          >
            <img src={heroHolo} alt="Hologram Left" className="w-full h-full object-contain opacity-40 blur-sm scale-125" />
          </motion.div>

          {/* Holographic Background Element - Right */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute top-0 bottom-0 -right-[600px] w-full flex items-center justify-center z-0"
          >
            <img src={heroHolo} alt="Hologram Right" className="w-full h-full object-contain opacity-40 blur-sm scale-125 scale-x-[-1]" />
          </motion.div>

          {/* Floating Image Tiles */}
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.style} rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(0,227,255,0.15)] backdrop-blur-sm`}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{
                opacity: 1,
                y: [0, -15, 0],
                rotate: img.rotate,
              }}
              transition={{
                opacity: { duration: 0.8, delay: index * 0.2 },
                y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: img.delay },
                rotate: { duration: 0.8, delay: index * 0.2 }
              }}
              whileHover={{
                scale: 1.1,
                zIndex: 100,
                rotate: 0,
                boxShadow: "0 0 50px rgba(177,107,255,0.4)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <div className="h-1 w-12 bg-neon-blue rounded-full mb-1" />
              </div>
            </motion.div>
          ))}

          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-white/10 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
