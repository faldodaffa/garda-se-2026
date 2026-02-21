"use client";

import React from 'react';
import { BookOpen, Users, FileText, Calendar, FileBarChart } from 'lucide-react';
import Link from 'next/link';

const items = [
    {
        title: "Buku Pedoman SE2026",
        description: "Buku 1 - Buku 6 (Pedoman Lengkap)",
        icon: BookOpen,
        href: "/administrasi/pedoman",
        className: "bg-blue-50/50 border-blue-100 text-blue-900",
        iconColor: "text-blue-600"
    },
    { title: "SK Tim Pelaksana", icon: Users, href: "/administrasi/sk-pelaksana", description: "Surat Keputusan Tim" },
    { title: "SK Tim GARDA", icon: Users, href: "/administrasi/sk-garda", description: "Tim Penjamin Kualitas" },
    { title: "Surat-menyurat", icon: FileText, href: "/administrasi/surat", description: "Arsip Persuratan" },
    { title: "Administrasi Rapat", icon: Calendar, href: "/administrasi/rapat", description: "Notulensi & Daftar Hadir" },
    { title: "Laporan Kegiatan", icon: FileBarChart, href: "/administrasi/laporan", description: "Laporan Bulanan & Triwulanan" },
];

export default function AdministrasiPage() {
    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-2">
                    Kategori A
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Administrasi SE2026</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Pusat unduhan buku pedoman, arsip persuratan, dan dokumentasi administrasi rapat tim Sensus Ekonomi 2026.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <Link href={item.href} key={index} className="group">
                        <div className={`h-full p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${item.className || 'bg-white border-gray-100 hover:border-blue-200'}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${item.className ? 'bg-white/50' : 'bg-blue-50 group-hover:bg-blue-100'} transition-colors`}>
                                    <item.icon className={`w-6 h-6 ${item.iconColor || 'text-blue-600'}`} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
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
