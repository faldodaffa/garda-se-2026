"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Map, Calendar } from 'lucide-react';
import TeamStructure from '@/components/dashboard/TeamStructure';
import HelpdeskForm from '@/components/dashboard/HelpdeskForm';

const aboutCards = [
    {
        title: "Latar Belakang & Amanat Undang-Undang",
        icon: BookOpen,
        text: "Sensus Ekonomi (SE) adalah amanat Undang-Undang Nomor 16 Tahun 1997 tentang Statistik. Dilaksanakan setiap 10 tahun sekali pada tahun yang berakhiran angka 6 (enam). SE2026 adalah pelaksanaan kelima, yang bertujuan untuk menyediakan data dasar seluruh kegiatan ekonomi di luar sektor pertanian."
    },
    {
        title: "Tujuan & Manfaat Utama",
        icon: Target,
        text: "Bertujuan untuk mengetahui gambaran lengkap tentang struktur ekonomi bangsa, mulai dari skala usaha mikro, kecil, menengah, hingga besar. Hasil SE2026 akan menjadi landasan penyusunan kebijakan pemerintah, evaluasi program pembangunan, dan penghitungan Produk Domestik Bruto (PDB/PDRB)."
    },
    {
        title: "Cakupan Wilayah & Sektor Usaha",
        icon: Map,
        text: "Pendataan SE2026 menjangkau seluruh wilayah Indonesia, termasuk 4 Provinsi di wilayah kerja BPS Papua. Mencakup seluruh sektor ekonomi (mengacu pada KBLI 2025), kecuali sektor Pertanian (karena telah dicakup dalam Sensus Pertanian), Administrasi Pemerintahan, dan Aktivitas Rumah Tangga yang mempekerjakan tenaga domestik."
    },
    {
        title: "Metode & Jadwal Pelaksanaan",
        icon: Calendar,
        text: "Menggunakan metode Pendataan Lengkap (Door-to-Door) di mana petugas akan mengunjungi setiap bangunan dan tempat usaha. Pelaksanaan pendataan lapangan secara serentak dijadwalkan pada 16 Mei hingga 31 Juli 2026."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FFFBEE] pb-24 pt-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center max-w-4xl mx-auto"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-se-jingga text-se-jingga text-xs font-bold tracking-wide uppercase mb-3">
                        Tentang Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Tentang Sensus Ekonomi 2026
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Memotret wajah ekonomi Nusantara untuk menyongsong Indonesia Emas 2045. Penyelenggaraan kelima sejak tahun 1986.
                    </p>
                </motion.header>

                {/* Bento Grid Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
                >
                    {aboutCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/40 backdrop-blur-2xl border border-white/50 p-8 rounded-[2rem] shadow-xl shadow-orange-500/5 hover:shadow-orange-500/10 transition-all duration-300 transform"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-[#F79039] to-[#FEBD26] rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Existing Team Structure */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center mb-8 justify-center">
                        <div className="h-10 w-1 bg-se-jingga rounded-full mr-4"></div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tim Pelaksana Garda</h2>
                    </div>
                    <TeamStructure />
                </motion.div>

                {/* Helpdesk Integration (Phase 51) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 max-w-5xl mx-auto"
                >
                    <div className="flex items-center mb-8 justify-center">
                        <div className="h-10 w-1 bg-se-jingga rounded-full mr-4"></div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pusat Bantuan Resmi</h2>
                    </div>
                    <HelpdeskForm />
                </motion.div>

            </div>
        </main>
    );
}
