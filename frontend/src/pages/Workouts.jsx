import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dumbbell, Timer, Zap, Flame, Activity, X, Play, CheckCircle,
    Trophy, ChevronRight, BarChart, Calendar
} from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

// Import assets for cinematic feel
import heroCurls from '../assets/hero_curls.png';
import heroDeadlift from '../assets/hero_deadlift.png';
import heroFlex from '../assets/hero_flex.png';
import heroChest from '../assets/hero_chest.png';
import heroPortrait from '../assets/hero_portrait.png';

// --- HARDCODED WORKOUT DATA ---
const MANUAL_WORKOUTS = [
    {
        id: 1,
        title: "Neon Hypertrophy Push",
        description: "High-volume chest and triceps destruction for maximum pump.",
        image: heroChest,
        duration: "45 min",
        difficulty: "Hard",
        calories: 450,
        xp: 500,
        exercises: [
            { name: "Incline Dumbbell Press", sets: "4", reps: "10-12" },
            { name: "Cable Flyes", sets: "3", reps: "15" },
            { name: "Overhead Tricep Ext", sets: "3", reps: "12" },
            { name: "Push-ups (Failure)", sets: "3", reps: "Max" }
        ]
    },
    {
        id: 2,
        title: "Cyberpunk Deadlift Protocol",
        description: "Heavy compound movements to build raw power and density.",
        image: heroDeadlift,
        duration: "60 min",
        difficulty: "Expert",
        calories: 600,
        xp: 750,
        exercises: [
            { name: "Deadlift", sets: "5", reps: "5" },
            { name: "Barbell Rows", sets: "4", reps: "8" },
            { name: "Pull-ups", sets: "3", reps: "Failure" },
            { name: "Face Pulls", sets: "3", reps: "15" }
        ]
    },
    {
        id: 3,
        title: "Holographic Arm Cannon",
        description: "Isolation focus for biceps and forearms. Sleeve-busting pump.",
        image: heroCurls,
        duration: "35 min",
        difficulty: "Medium",
        calories: 300,
        xp: 350,
        exercises: [
            { name: "Barbell Curls", sets: "4", reps: "10" },
            { name: "Hammer Curls", sets: "3", reps: "12" },
            { name: "Preacher Curls", sets: "3", reps: "12" },
            { name: "Wrist Curls", sets: "3", reps: "20" }
        ]
    },
    {
        id: 4,
        title: "Velocity HIIT Shred",
        description: "High-intensity interval training to melt fat and boost stamina.",
        image: heroPortrait,
        duration: "25 min",
        difficulty: "Insane",
        calories: 500,
        xp: 600,
        exercises: [
            { name: "Burpees", sets: "4", reps: "45 sec" },
            { name: "Mountain Climbers", sets: "4", reps: "45 sec" },
            { name: "Jump Squats", sets: "4", reps: "45 sec" },
            { name: "High Knees", sets: "4", reps: "45 sec" }
        ]
    },
    {
        id: 5,
        title: "Titan Leg Day",
        description: "Forging steel pillars. Squats, lunges, and absolute pain.",
        image: heroFlex,
        duration: "55 min",
        difficulty: "Hard",
        calories: 550,
        xp: 650,
        exercises: [
            { name: "Barbell Squat", sets: "4", reps: "8" },
            { name: "Leg Press", sets: "3", reps: "12" },
            { name: "Walking Lunges", sets: "3", reps: "20 steps" },
            { name: "Calf Raises", sets: "4", reps: "15" }
        ]
    },
    {
        id: 6,
        title: "Core Reactor",
        description: "Stabilize your frame with intense abdominal work.",
        image: heroPortrait,
        duration: "20 min",
        difficulty: "Medium",
        calories: 200,
        xp: 250,
        exercises: [
            { name: "Hanging Leg Raise", sets: "3", reps: "12" },
            { name: "Plank", sets: "3", reps: "60 sec" },
            { name: "Russian Twists", sets: "3", reps: "20" },
            { name: "Ab Rollout", sets: "3", reps: "10" }
        ]
    }
];

// --- COMPONENTS ---

const CircularTimer = ({ duration, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (onComplete) onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                    <circle
                        cx="64" cy="64" r="60"
                        stroke="#00E3FF" strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="377"
                        strokeDashoffset={377 - (377 * progress) / 100}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute text-2xl font-bold font-mono text-white">
                    {minutes}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${isActive ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'}`}
                >
                    {isActive ? 'PAUSE' : 'START'}
                </button>
                <button
                    onClick={() => { setIsActive(false); setTimeLeft(duration * 60); }}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10"
                >
                    RESET
                </button>
            </div>
        </div>
    );
};

const SuccessPopup = ({ xp, onClose }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
        <div className="relative bg-slate-900 border border-neon-purple/50 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(177,107,255,0.4)]">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-neon-purple to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900">
                <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="mt-10 text-3xl font-bold text-white">WORKOUT COMPLETE!</h2>
            <p className="text-gray-400 mt-2">You crushed it, legend.</p>

            <div className="my-6 py-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400 uppercase tracking-wider">XP Earned</p>
                <p className="text-5xl font-bold text-neon-purple drop-shadow-[0_0_10px_rgba(177,107,255,0.5)]">+{xp}</p>
            </div>

            <button
                onClick={onClose}
                className="w-full py-3 bg-neon-purple hover:bg-fuchsia-600 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(177,107,255,0.3)]"
            >
                CLAIM REWARD
            </button>
        </div>
    </motion.div>
);

const WorkoutModal = ({ workout, onClose, onComplete }) => {
    const [timerDuration, setTimerDuration] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative w-full max-w-4xl bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                    <img src={workout.image} alt={workout.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${workout.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            workout.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                            }`}>
                            {workout.difficulty}
                        </span>
                        <h2 className="text-3xl font-bold text-white mt-2 leading-tight">{workout.title}</h2>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <Timer className="w-5 h-5 text-neon-blue" />
                            <span className="text-gray-300">{workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            <span className="text-gray-300">{workout.calories} kcal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-neon-purple" />
                            <span className="text-neon-purple font-bold">{workout.xp} XP</span>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed">{workout.description}</p>

                    <div className="space-y-6 mb-8">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-neon-cyan" />
                            Protocol
                        </h3>
                        <div className="space-y-3">
                            {workout.exercises.map((ex, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <span className="font-medium text-white">{ex.name}</span>
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>{ex.sets} Sets</span>
                                        <span className="text-neon-blue">{ex.reps} Reps</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timer Section */}
                    <div className="mb-8 p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Rest Timer</h3>
                        {timerDuration ? (
                            <CircularTimer duration={timerDuration} onComplete={() => setTimerDuration(null)} />
                        ) : (
                            <div className="flex gap-3">
                                {[5, 10, 15].map(min => (
                                    <button
                                        key={min}
                                        onClick={() => setTimerDuration(min)}
                                        className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-neon-blue/20 border border-white/10 hover:border-neon-blue/50 transition-all text-sm font-bold text-gray-300 hover:text-white"
                                    >
                                        {min} Min
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onComplete}
                        className="w-full py-4 bg-gradient-to-r from-neon-blue to-cyan-500 hover:from-cyan-400 hover:to-neon-blue text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,227,255,0.3)] hover:shadow-[0_0_30px_rgba(0,227,255,0.5)] transition-all flex items-center justify-center gap-2"
                    >
                        <CheckCircle className="w-6 h-6" />
                        COMPLETE WORKOUT
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Workouts({ onXpUpdate }) {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [earnedXp, setEarnedXp] = useState(0);
    const [physique, setPhysique] = useState({
        height: '', weight: '', goal: 'Hypertrophy', level: 'Intermediate'
    });

    const handleComplete = async (workout) => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                await axios.post(`${API_BASE}/api/streak/progress`, {
                    xp: workout.xp,
                    weight: parseFloat(physique.weight) || 70, // Fallback if empty
                    bodyFat: 15 // Dummy value or add input
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Update XP in parent component
                if (onXpUpdate) {
                    onXpUpdate(workout.xp);
                }
            }
            setEarnedXp(workout.xp);
            setSelectedWorkout(null);
            setShowSuccess(true);
        } catch (error) {
            console.error("Failed to update XP:", error);
            // Show success anyway for UX demo purposes if backend fails
            setEarnedXp(workout.xp);
            setSelectedWorkout(null);
            setShowSuccess(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20 pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        FORGE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">LEGACY</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select a protocol below. Execute with precision. Earn XP and level up your physique.
                    </p>
                </div>

                {/* Physique Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-20 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] -z-10" />
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-neon-cyan" />
                        Physique Parameters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Height (cm)</label>
                            <input
                                type="number"
                                value={physique.height}
                                onChange={e => setPhysique({ ...physique, height: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                                placeholder="180"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Weight (kg)</label>
                            <input
                                type="number"
                                value={physique.weight}
                                onChange={e => setPhysique({ ...physique, weight: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                                placeholder="75"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Goal</label>
                            <select
                                value={physique.goal}
                                onChange={e => setPhysique({ ...physique, goal: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all appearance-none"
                            >
                                <option>Hypertrophy</option>
                                <option>Strength</option>
                                <option>Endurance</option>
                                <option>Fat Loss</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Level</label>
                            <select
                                value={physique.level}
                                onChange={e => setPhysique({ ...physique, level: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all appearance-none"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Elite</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Workouts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MANUAL_WORKOUTS.map((workout, index) => (
                        <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(0,227,255,0.15)] cursor-pointer"
                            onClick={() => setSelectedWorkout(workout)}
                        >
                            {/* Image Overlay */}
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                                <img
                                    src={workout.image}
                                    alt={workout.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                                    <Zap className="w-3 h-3 text-neon-purple" />
                                    <span className="text-xs font-bold text-white">{workout.xp} XP</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20 -mt-12">
                                <div className="flex justify-between items-end mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${workout.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                        workout.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                            'bg-red-500/10 border-red-500/30 text-red-400'
                                        }`}>
                                        {workout.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <Timer className="w-3 h-3" />
                                        {workout.duration}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{workout.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-6">{workout.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Flame className="w-3 h-3 text-orange-500" />
                                        {workout.calories} kcal
                                    </div>
                                    <button className="flex items-center gap-1 text-sm font-bold text-neon-blue group-hover:translate-x-1 transition-transform">
                                        START <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedWorkout && (
                    <WorkoutModal
                        workout={selectedWorkout}
                        onClose={() => setSelectedWorkout(null)}
                        onComplete={() => handleComplete(selectedWorkout)}
                    />
                )}
                {showSuccess && (
                    <SuccessPopup xp={earnedXp} onClose={() => setShowSuccess(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}