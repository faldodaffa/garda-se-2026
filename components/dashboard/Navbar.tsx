"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, FileText, BarChart3, Newspaper, Info } from 'lucide-react';

const navLinks = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Monitoring', href: '/monitoring', icon: BarChart3 },
    { name: 'Dokumen', href: '/dokumen', icon: FileText },
    { name: 'Berita', href: '/berita', icon: Newspaper },
    { name: 'Tentang', href: '/tentang', icon: Info },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                scrolled || isOpen
                    ? "bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-sm py-3"
                    : "bg-white/60 backdrop-blur-md border-b border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Kiri */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 group relative z-10">
                        {/* Logo Square */}
                        <img
                            src="/images/logo-header.png"
                            alt="Logo Garda SE2026"
                            className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Teks Identitas */}
                        <div className="flex flex-col">
                            <span className="font-extrabold text-lg md:text-xl text-slate-900 leading-none group-hover:text-[#f79039] transition-colors">Garda SE2026</span>
                            <span className="text-[10px] md:text-xs text-slate-500 font-semibold tracking-wider">BPS PROVINSI PAPUA</span>
                        </div>
                    </Link>

                    {/* Navigasi Desktop (Hidden di Mobile) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-bold transition-colors flex items-center gap-2",
                                        isActive ? "text-[#f79039]" : "text-slate-600 hover:text-[#f79039]"
                                    )}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                        <Link href="/admin/login" className="px-6 py-2.5 bg-slate-900 hover:bg-[#f79039] text-white text-sm font-bold rounded-full transition-colors shadow-md hover:shadow-lg">
                            Login Admin
                        </Link>
                    </nav>

                    {/* Hamburger Button Mobile (Animasi Morphing X) */}
                    <div className="md:hidden flex items-center z-10">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <span className={`absolute h-[3px] w-6 bg-slate-900 rounded-full transition-all duration-300 ease-out ${isOpen ? 'rotate-45' : '-translate-y-2 group-hover:-translate-y-2.5'}`} />
                            <span className={`absolute h-[3px] w-6 bg-slate-900 rounded-full transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-50' : 'opacity-100'}`} />
                            <span className={`absolute h-[3px] w-6 bg-slate-900 rounded-full transition-all duration-300 ease-out ${isOpen ? '-rotate-45' : 'translate-y-2 group-hover:translate-y-2.5'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu Mobile (Glassmorphism & Slide Down) */}
            <div
                className={cn(
                    "md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-100 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-6 py-6 flex flex-col gap-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-base font-bold border-b border-gray-100 pb-3 transition-colors flex items-center gap-3",
                                    isActive ? "text-[#f79039]" : "text-slate-800 hover:text-[#f79039]"
                                )}
                            >
                                <link.icon className={cn("w-5 h-5", isActive ? "text-[#f79039]" : "text-slate-400")} />
                                {link.name}
                            </Link>
                        );
                    })}
                    <Link
                        href="/admin/login"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 w-full text-center px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#f79039] transition-colors"
                    >
                        Login Admin
                    </Link>
                </div>
            </div>
        </header>
    );
}
