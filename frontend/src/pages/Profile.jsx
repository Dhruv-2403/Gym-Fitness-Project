import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, Zap, Clock } from 'lucide-react';
import avatarImg from '../assets/profile_avatar.png';

// Dummy streak data for the past year (52 weeks x 7 days)
const generateStreakData = () => {
    const weeks = 52;
    const days = 7;
    const data = [];
    for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < days; d++) {
            // Random activity count 0-5
            week.push(Math.floor(Math.random() * 6));
        }
        data.push(week);
    }
    return data;
};

const streakData = generateStreakData();

const colorScale = (count) => {
    const opacity = 0.1 + (count / 5) * 0.8; // 0.1 to 0.9
    return `rgba(0, 227, 255, ${opacity})`;
};

const Profile = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-white py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <img
                        src={avatarImg}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full border-2 border-neon-blue mb-4 drop-shadow-[0_0_20px_rgba(0,227,255,0.4)]"
                    />
                    <h1 className="text-4xl font-bold neon-text-blue">John Doe</h1>
                    <p className="mt-2 text-gray-300">Age: 29 • Height: 180 cm • Weight: 78 kg</p>
                </motion.div>

                {/* Metrics */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {[
                        { icon: <Zap className="w-8 h-8 text-neon-blue" />, label: 'Total Workouts', value: '1.4K' },
                        { icon: <Star className="w-8 h-8 text-neon-purple" />, label: 'XP', value: '3.8M' },
                        { icon: <Clock className="w-8 h-8 text-neon-cyan" />, label: 'Avg Session', value: '48 min' },
                        { icon: <User className="w-8 h-8 text-neon-blue" />, label: 'Streak Days', value: '127' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="glass-panel p-6 rounded-xl border border-white/10 text-center"
                        >
                            <div className="flex justify-center mb-3">{stat.icon}</div>
                            <div className="text-3xl font-semibold text-white">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Streak Heatmap */}
                <div className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold neon-text-purple text-center">Fitness Streak (Last Year)</h2>
                    <div className="grid grid-cols-7 gap-1">
                        {streakData.map((week, wIdx) =>
                            week.map((count, dIdx) => (
                                <div
                                    key={`${wIdx}-${dIdx}`}
                                    className="w-4 h-4 rounded-sm"
                                    style={{ backgroundColor: colorScale(count) }}
                                    title={`${count} workouts`}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* XP Ring */}
                <div className="flex justify-center">
                    <motion.div
                        className="relative w-48 h-48"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="var(--color-glass-border)"
                                strokeWidth="1"
                            />
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="var(--color-neon-blue)"
                                strokeWidth="2"
                                strokeDasharray="100, 100"
                                strokeDashoffset="30"
                            />
                            <text x="18" y="20.35" fill="white" fontSize="8" textAnchor="middle" className="neon-text-blue">
                                78% XP
                            </text>
                        </svg>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
