import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, HeartPulse, Timer, Zap } from 'lucide-react';
import workoutsData from '../data/workouts.json';

const getIcon = (type) => {
    switch (type) {
        case 'timer': return <Timer className="w-8 h-8 text-neon-blue" />;
        case 'dumbbell': return <Dumbbell className="w-8 h-8 text-neon-purple" />;
        case 'heart': return <HeartPulse className="w-8 h-8 text-neon-cyan" />;
        default: return <Zap className="w-8 h-8 text-white" />;
    }
};

const Workouts = () => {
    return (
        <section className="min-h-screen bg-slate-900 text-white py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold text-center mb-12 neon-text-purple">
                    Premium Workout Library
                </h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {workoutsData.map((w) => (
                        <motion.div
                            key={w.id}
                            whileHover={{ scale: 1.05 }}
                            className="glass-panel p-6 rounded-xl border border-white/10 hover:border-neon-blue/30 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-4">
                                {getIcon(w.type)}
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-1 rounded-full">
                                    {w.level}
                                </span>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2 neon-text-blue">{w.title}</h2>
                            <p className="text-gray-300 mb-4 flex-grow">{w.description}</p>
                            <div className="flex items-center text-sm text-neon-cyan">
                                <Timer className="w-4 h-4 mr-1" />
                                {w.duration}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workouts;
