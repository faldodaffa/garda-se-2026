"use client";

import React from 'react';
import { Megaphone, ImageIcon, Shirt, Share2, Image, Users } from 'lucide-react';
import Link from 'next/link';
import MediaCenter from '@/components/dashboard/MediaCenter';

const items = [
    { title: "Strategi & Branding", icon: Megaphone, href: "/publisitas/strategi", description: "Strategi, Theme Song & Logo" },
    { title: "Desain Medsos & Video", icon: ImageIcon, href: "/publisitas/desain", description: "Konten Instagram/YouTube" },
    { title: "Merch & Ekraf", icon: Shirt, href: "/publisitas/merch", description: "Seragam & Souvenir" },
    { title: "Rekap Konten & Sosialisasi", icon: Share2, href: "/publisitas/rekap", description: "Laporan Publisitas" },
    { title: "Outdoor Advertising", icon: Image, href: "/publisitas/outdoor", description: "Spanduk, Baliho, Videotron" },
    { title: "Dukungan Eksternal", icon: Users, href: "/publisitas/dukungan", description: "Dukungan Pemda/Dinas" },
];

export default function PublisitasPage() {
    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-se-jingga text-se-jingga text-xs font-bold tracking-wide uppercase mb-2">
                    Kategori C
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Publisitas & Media</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Kumpulan bahan promosi, publikasi visual, dan strategi sosialisasi Sensus Ekonomi 2026.
                </p>
            </div>

            {/* Media Center Integration */}
            <div className="mb-16">
                <MediaCenter />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <Link href={item.href} key={index} className="group">
                        <div className="h-full p-6 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-orange-50 group-hover:bg-se-jingga transition-colors">
                                    <item.icon className="w-6 h-6 text-se-jingga" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-se-jingga transition-colors">
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
