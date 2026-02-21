"use client";

import { motion } from "framer-motion";
import BentoGrid from "@/components/dashboard/BentoGrid";
import { Search } from "lucide-react";

export default function DokumenPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-12"
        >
            <header className="space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Dokumen & Pedoman
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Akses cepat ke seluruh buku pedoman, surat keputusan, dan materi sosialisasi SE2026.
                </p>

                {/* Search Bar Placeholder */}
                <div className="relative max-w-lg mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari dokumen (misal: 'Buku 1', 'SK Tim')..."
                        className="w-full pl-11 pr-4 py-4 rounded-full border border-gray-200 bg-white shadow-xl shadow-gray-200/50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700 font-medium"
                    />
                </div>
            </header>

            <div className="min-h-screen">
                <BentoGrid />
            </div>
        </motion.div>
    );
}
