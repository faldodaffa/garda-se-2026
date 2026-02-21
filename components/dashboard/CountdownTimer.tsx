"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
    const targetDate = new Date('2026-05-16T00:00:00');

    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    if (compact) {
        return (
            <div className="hidden lg:flex items-center space-x-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm text-sm font-medium text-gray-700">
                <span className="flex items-center text-primary font-bold">
                    🗓️ 16 Mei 2026
                </span>
                <span className="w-px h-4 bg-gray-300"></span>
                <div className="flex space-x-1 tabular-nums">
                    <span>{String(timeLeft.days).padStart(2, '0')} Hari</span>
                    <span>:</span>
                    <span>{String(timeLeft.hours).padStart(2, '0')} Jam</span>
                    <span>:</span>
                    <span>{String(timeLeft.minutes).padStart(2, '0')} Menit</span>
                </div>
            </div>
        );
    }

    const timeUnits = [
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-wrap justify-center gap-4"
            >
                {timeUnits.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 md:p-4 min-w-[80px] md:min-w-[100px] text-center border border-white/60 shadow-lg shadow-orange-500/5 hover:scale-105 transition-transform duration-300">
                            <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 block tabular-nums">
                                {String(item.value).padStart(2, '0')}
                            </span>
                            <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">
                                {item.label}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
            <div className="mt-4 text-sm font-medium text-slate-500 uppercase tracking-widest">
                Menuju Sensus Ekonomi 2026
            </div>
        </div>
    );
}
