"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

export default function HeroWelcome() {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pt-32 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-10"
            >
                {/* System Badge */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 border border-white/60 text-sm font-bold text-slate-600 backdrop-blur-md shadow-sm"
                >
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse shadow-lg shadow-green-400/50"></span>
                    System Operational
                </motion.div>

                {/* Main Title with Enhanced Glow/Glass */}
                <div className="relative inline-block max-w-4xl mx-auto">
                    {/* Ambient Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 blur-3xl opacity-50 rounded-full transform scale-110"></div>

                    <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-orange-900/5 ring-1 ring-white/50">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Command Center <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-sm">
                                Garda Sensus Ekonomi 2026
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                            Pusat kendali dan koordinasi terintegrasi BPS Provinsi Papua.
                        </p>
                    </div>
                </div>

                {/* Countdown Centered & Enhanced */}
                <div className="flex justify-center w-full pt-4">
                    <div className="bg-white/80 backdrop-blur-xl rounded-full px-10 py-5 border border-white/60 shadow-xl shadow-orange-500/10 ring-1 ring-white/50 transform hover:scale-105 transition-transform duration-300">
                        <CountdownTimer compact={false} />
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
