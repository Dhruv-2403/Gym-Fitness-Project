import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Clock, Trophy } from 'lucide-react';

const Dashboard = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-white py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-center mb-12 neon-text-purple"
                >
                    Dashboard
                </motion.h1>

                {/* Stats Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {[
                        { icon: <Zap className="w-8 h-8 text-neon-blue" />, label: 'Calories Burned', value: '12.4K' },
                        { icon: <Activity className="w-8 h-8 text-neon-purple" />, label: 'Workouts', value: '1.8K' },
                        { icon: <Clock className="w-8 h-8 text-neon-cyan" />, label: 'Avg Session', value: '45m' },
                        { icon: <Trophy className="w-8 h-8 text-neon-blue" />, label: 'XP', value: '3.2M' },
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

                {/* Chart Placeholder */}
                <motion.div
                    className="glass-panel p-6 rounded-xl border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        {/* In a real app, replace with a chart library */}
                        <span className="neon-text-blue">[Performance Chart Placeholder]</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Dashboard;
