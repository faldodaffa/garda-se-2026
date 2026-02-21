"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface InfoCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    href?: string;
    className?: string; // For col-span control
    color?: string; // Optional custom color override
}

export default function InfoCard({
    title,
    description,
    icon: Icon,
    href = "#",
    className,
    color
}: InfoCardProps) {
    return (
        <Link href={href} className={cn("block h-full", className)}>
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        {Icon && (
                            <div className={cn("p-3 rounded-xl bg-white/60 text-primary group-hover:scale-110 transition-transform shadow-sm", color)}>
                                <Icon className="w-6 h-6" />
                            </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
