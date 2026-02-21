"use client";

import React from 'react';
import { BarChart3, Building2, MapPin, Search, Users, FileText } from 'lucide-react';
import Link from 'next/link';

const items = [
    { title: "Gambaran Umum & KBLI 2025", icon: BarChart3, href: "/rencana-kerja/gambaran-umum", description: "Konsep Definisi & Klasifikasi" },
    { title: "SBR & Profiling Mandiri", icon: Building2, href: "/rencana-kerja/sbr", description: "Statistical Business Register" },
    { title: "Pemutakhiran Wilkerstat", icon: MapPin, href: "/rencana-kerja/wilkerstat", description: "Peta Blok Sensus" },
    { title: "Identifikasi KBLI Dominan", icon: Search, href: "/rencana-kerja/kbli-dominan", description: "Analisis Potensi Wilayah" },
    { title: "Briefing Sub-SLS & Rapat RI", icon: Users, href: "/rencana-kerja/briefing", description: "Koordinasi Wilayah" },
    { title: "Contoh Narasi Usaha", icon: FileText, href: "/rencana-kerja/narasi", description: "Panduan Deskripsi Usaha" },
];

export default function RencanaKerjaPage() {
    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold tracking-wide uppercase mb-2">
                    Kategori B
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Informasi & Persiapan SE2026</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Materi teknis, metodologi, dan persiapan lapangan untuk pelaksanaan Sensus Ekonomi 2026.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <Link href={item.href} key={index} className="group">
                        <div className="h-full p-6 rounded-2xl border border-gray-100 bg-white hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
                                    <item.icon className="w-6 h-6 text-yellow-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
