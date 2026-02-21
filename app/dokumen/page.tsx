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
            </header>

            <div className="min-h-screen">
                <BentoGrid />
            </div>
        </motion.div>
    );
}
