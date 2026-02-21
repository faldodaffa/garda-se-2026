"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Megaphone,
    FileText,
    Briefcase,
    Settings,
    ChevronRight,
    Menu,
    LogOut,
    Users,
    Info,
    BookOpen,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const menuItems = [
    { icon: LayoutDashboard, label: 'Beranda', href: '/' },
    { icon: BarChart3, label: 'Monitoring Progress', href: '/monitoring' },
    { icon: FileText, label: 'Dokumen & Pedoman', href: '/dokumen' },
    { icon: BookOpen, label: 'Berita & Publikasi', href: '/berita' },
    { icon: Info, label: 'Tentang SE2026', href: '/tentang' },
    { icon: Settings, label: 'Admin Panel', href: '/admin' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div
            initial={{ width: isOpen ? 260 : 90 }}
            animate={{ width: isOpen ? 260 : 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-screen sticky top-0 left-0 bg-white/40 backdrop-blur-2xl border-r border-white/40 shadow-2xl shadow-black/5 z-50 flex flex-col"
        >
            {/* Header / Logo Area */}
            <div className={cn("p-8 flex items-center transition-all duration-300", isOpen ? "justify-between" : "justify-center")}>
                {isOpen && (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-[#F79039] to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-xl text-gray-800 tracking-tight">GARDA</span>
                    </div>
                )}
                {!isOpen && (
                    <div className="w-10 h-10 bg-gradient-to-tr from-[#F79039] to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-4 space-y-3">
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                        <div
                            className={cn(
                                "flex items-center p-3.5 rounded-[1.2rem] cursor-pointer transition-all duration-300 group",
                                "hover:bg-white/60 hover:shadow-lg hover:shadow-orange-500/10",
                                !isOpen && "justify-center"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6 text-gray-500 group-hover:text-se-jingga transition-colors duration-300", !isOpen && "w-7 h-7")} />

                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="ml-4 text-sm font-bold text-gray-600 group-hover:text-gray-900 tracking-wide"
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {isOpen && (
                                <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-se-jingga opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                            )}
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-6 border-t border-white/30">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-white/50 transition-colors group"
                >
                    <Menu className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                </button>
            </div>
        </motion.div>
    );
}
