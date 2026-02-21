"use client";

import React, { useState, useEffect } from 'react';
import {
    BookOpen, Users, FileText, Megaphone,
    BarChart3, Settings, Calendar,
    FileBarChart, Building2, MapPin, Search,
    Image, Video, Share2, Shirt, ImageIcon, LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Define Interface for Grid Items
interface GridItem {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    className?: string; // Optional
    badge?: string;     // Optional
}

interface Category {
    id: string;
    title: string;
    items: GridItem[];
}

const categories: Category[] = [
    {
        id: 'administrasi',
        title: '1. Administrasi SE2026',
        items: [
            {
                title: "Buku Pedoman SE2026",
                description: "Buku 1 - Buku 6 (Pedoman Lengkap)",
                icon: BookOpen,
                href: "/administrasi/pedoman",
                className: "col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-white/80 to-white/40 border-white/50",
                badge: "Penting"
            },
            { title: "SK Tim Pelaksana", icon: Users, href: "/administrasi/sk-pelaksana", description: "Surat Keputusan Tim" },
            { title: "SK Tim GARDA", icon: Users, href: "/administrasi/sk-garda", description: "Tim Penjamin Kualitas" },
            { title: "Surat-menyurat", icon: FileText, href: "/administrasi/surat", description: "Arsip Persuratan" },
            { title: "Administrasi Rapat", icon: Calendar, href: "/administrasi/rapat", description: "Notulensi & Daftar Hadir" },
            { title: "Laporan Kegiatan", icon: FileBarChart, href: "/administrasi/laporan", description: "Laporan Bulanan & Triwulanan" },
        ]
    },
    {
        id: 'persiapan',
        title: '2. Informasi & Persiapan SE2026',
        items: [
            { title: "Gambaran Umum & KBLI 2025", icon: BarChart3, href: "/rencana-kerja/gambaran-umum", description: "Konsep Definisi & Klasifikasi" },
            { title: "SBR & Profiling Mandiri", icon: Building2, href: "/rencana-kerja/sbr", description: "Statistical Business Register" },
            { title: "Pemutakhiran Wilkerstat", icon: MapPin, href: "/rencana-kerja/wilkerstat", description: "Peta Blok Sensus" },
            { title: "Identifikasi KBLI Dominan", icon: Search, href: "/rencana-kerja/kbli-dominan", description: "Analisis Potensi Wilayah" },
            { title: "Briefing Sub-SLS & Rapat RI", icon: Users, href: "/rencana-kerja/briefing", description: "Koordinasi Wilayah" },
            { title: "Contoh Narasi Usaha", icon: FileText, href: "/rencana-kerja/narasi", description: "Panduan Deskripsi Usaha" },
        ]
    },
    {
        id: 'publisitas',
        title: '3. Publisitas & Media',
        items: [
            { title: "Strategi & Branding", icon: Megaphone, href: "/publisitas/strategi", className: "md:col-span-2", description: "Strategi, Theme Song & Logo" },
            { title: "Desain Medsos & Video", icon: ImageIcon, href: "/publisitas/desain", description: "Konten Instagram/YouTube" },
            { title: "Merch & Ekraf", icon: Shirt, href: "/publisitas/merch", description: "Seragam & Souvenir" },
            { title: "Rekap Konten & Sosialisasi", icon: Share2, href: "/publisitas/rekap", description: "Laporan Publisitas" },
            { title: "Outdoor Advertising", icon: ImageIcon, href: "/publisitas/outdoor", description: "Spanduk, Baliho, Videotron" },
            { title: "Dukungan Eksternal", icon: Users, href: "/publisitas/dukungan", description: "Dukungan Pemda/Dinas" },
        ]
    }
];

const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'administrasi', label: 'Administrasi' },
    { id: 'persiapan', label: 'Persiapan' }, // Mapped from 'Informasi & Persiapan SE2026'
    { id: 'publisitas', label: 'Publisitas' },
];

export default function BentoGrid() {
    // Fungsi pintar memastikan URL selalu menjadi Absolute (punya https://)
    const formatExternalUrl = (url: string | undefined) => {
        if (!url || url === '#' || url === '') return '#';
        // Jika sudah ada http:// atau https://, biarkan saja
        if (/^https?:\/\//i.test(url)) {
            return url;
        }
        // Jika belum ada, tambahkan secara otomatis
        return `https://${url}`;
    };

    const [activeFilter, setActiveFilter] = useState('all');
    const [dynamicCategories, setDynamicCategories] = useState<Category[]>(categories);

    React.useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch('/api/site-content');
                const data = await res.json();

                if (data.pedomanLinks && data.pedomanLinks.length > 0) {
                    const dynamicItems: GridItem[] = data.pedomanLinks.map((link: any) => ({
                        title: link.title,
                        description: link.category || "Dokumen Pedoman",
                        icon: BookOpen,
                        href: link.url,
                        className: "bg-white/40",
                        badge: link.category === 'Penting' ? 'Penting' : undefined
                    }));

                    setDynamicCategories(prev => prev.map(cat => {
                        if (cat.id === 'administrasi') {
                            return { ...cat, items: dynamicItems };
                        }
                        return cat;
                    }));
                }
            } catch (error) {
                console.error("Failed to load dynamic links", error);
            }
        };

        // --- PHASE 45: BACA DATA DARI LOCALSTORAGE CMS BENTO ---
        const syncFromCMS = () => {
            const savedData = localStorage.getItem('garda_se2026_bento_links');
            if (savedData) {
                try {
                    const parsedBentoLinks = JSON.parse(savedData);

                    if (Array.isArray(parsedBentoLinks) && parsedBentoLinks.length > 0) {
                        // Build mapping categories
                        let administrasiItems: GridItem[] = [];
                        let persiapanItems: GridItem[] = [];
                        let publisitasItems: GridItem[] = [];

                        parsedBentoLinks.forEach((link: any) => {
                            // Resolve correct lucide icon heuristic based on category
                            let targetIcon = FileText;
                            if (link.kategori.includes('Administrasi')) targetIcon = BookOpen;
                            if (link.kategori.includes('Persiapan')) targetIcon = BarChart3;
                            if (link.kategori.includes('Publisitas')) targetIcon = Megaphone;

                            const mappedItem: GridItem = {
                                title: link.nama,
                                description: link.deskripsi,
                                icon: targetIcon,
                                href: link.url,
                                badge: link.label || undefined,
                                className: link.kategori.includes('Administrasi') && link.label === 'PENTING'
                                    ? "col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-white/80 to-white/40 border-white/50"
                                    : undefined
                            };

                            if (link.kategori.includes('Administrasi')) administrasiItems.push(mappedItem);
                            else if (link.kategori.includes('Persiapan')) persiapanItems.push(mappedItem);
                            else if (link.kategori.includes('Publisitas')) publisitasItems.push(mappedItem);
                        });

                        // Override static categories completely with mapped CMS payload
                        setDynamicCategories([
                            { id: 'administrasi', title: '1. Administrasi SE2026', items: administrasiItems },
                            { id: 'persiapan', title: '2. Informasi & Persiapan SE2026', items: persiapanItems },
                            { id: 'publisitas', title: '3. Publisitas & Media', items: publisitasItems }
                        ]);
                        return true; // Sync success
                    }
                } catch (e) {
                    console.error("Gagal sinkronisasi data Bento dari LocalStorage", e);
                }
            }
            return false;
        };

        // If local CMS data exists, use it. Otherwise attempt to fetch API logic (Legacy behaviour)
        const hasLocalStorage = syncFromCMS();
        if (!hasLocalStorage) {
            fetchLinks();
        }
    }, []);

    const filteredCategories = activeFilter === 'all'
        ? dynamicCategories
        : dynamicCategories.filter(c => c.id === activeFilter);

    return (
        <div className="py-10 space-y-12">

            {/* Quick Filters - Pill Buttons */}
            <div className="w-full mb-8 relative">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap pb-4 pt-1 w-full snap-x custom-scrollbar px-4 md:px-0 md:justify-center">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={cn(
                                "shrink-0 snap-start px-5 py-2 md:py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300",
                                activeFilter === filter.id
                                    ? "bg-gradient-to-r from-se-jingga to-orange-500 text-white shadow-[0_8px_20px_rgba(247,144,57,0.25)] ring-1 ring-orange-500/50"
                                    : "bg-white/60 backdrop-blur-xl ring-1 ring-slate-200/50 shadow-sm text-gray-600 hover:text-slate-900 hover:bg-white/90 hover:shadow-md"
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {filteredCategories.map((category) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight pl-2 border-l-4 border-[#F79039]">
                            {category.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {category.items.map((item, index) => (
                                <a
                                    href={formatExternalUrl(item.href)}
                                    key={index}
                                    target={item.href && item.href !== '#' ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "group relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500",
                                        "bg-white/70 backdrop-blur-2xl ring-1 ring-slate-100",
                                        "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                                        "hover:shadow-[0_20px_40px_rgba(247,144,57,0.08)] hover:-translate-y-1 hover:bg-white/90",
                                        item.className
                                    )}
                                >
                                    <div className="flex flex-col h-full justify-between space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className={cn(
                                                "p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                                                "bg-gradient-to-br from-white to-white/50 shadow-sm border border-white/60"
                                            )}>
                                                <item.icon className="w-8 h-8 text-gray-700 group-hover:text-se-jingga transition-colors duration-300" />
                                            </div>
                                            {item.badge && (
                                                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-red-500 rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight group-hover:text-se-jingga transition-colors">{item.title}</h3>
                                            <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[90%]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Subtle Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
