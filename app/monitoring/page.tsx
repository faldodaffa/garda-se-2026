"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, TrendingUp } from 'lucide-react';

const monitoringData = [
    { id: 1, wilayah: 'JAYAPURA', target: 18902, selesai: 18148, progres: 96.01, wilayah_induk: 'PAPUA' },
    { id: 2, wilayah: 'BIAK NUMFOR', target: 10481, selesai: 9074, progres: 86.58, wilayah_induk: 'PAPUA' },
    { id: 3, wilayah: 'MERAUKE', target: 32699, selesai: 25102, progres: 76.77, wilayah_induk: 'PAPUA SELATAN' },
    { id: 4, wilayah: 'BOVEN DIGOEL', target: 3864, selesai: 3862, progres: 99.95, wilayah_induk: 'PAPUA SELATAN' },
    { id: 5, wilayah: 'MIMIKA', target: 27507, selesai: 27506, progres: 100.00, wilayah_induk: 'PAPUA TENGAH' },
    { id: 6, wilayah: 'DEIYAI', target: 675, selesai: 133, progres: 19.70, wilayah_induk: 'PAPUA TENGAH' },
    { id: 7, wilayah: 'JAYAWIJAYA', target: 10215, selesai: 9946, progres: 97.37, wilayah_induk: 'PAPUA PEGUNUNGAN' },
    { id: 8, wilayah: 'NDUGA', target: 562, selesai: 233, progres: 41.46, wilayah_induk: 'PAPUA PEGUNUNGAN' },
];

export default function MonitoringPage() {
    const [progresNasional, setProgresNasional] = useState<string>('...');
    const [lastUpdate, setLastUpdate] = useState<string>('Memuat data...');
    const [isLoadError, setIsLoadError] = useState(false);

    // Hardcoded Sheet ID from IT Team
    const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';

    React.useEffect(() => {
        const fetchSheetData = async () => {
            try {
                // Call our Next.js API Route instead of Google directly to bypass CORS
                const res = await fetch('/api/monitoring-sync', { cache: 'no-store' });
                if (!res.ok) throw new Error("Terjadi kesalahan koneksi ke API internal.");

                const json = await res.json();

                if (json.success && json.data) {
                    if (json.data.progresNasional) setProgresNasional(json.data.progresNasional);
                    if (json.data.lastUpdate) setLastUpdate(json.data.lastUpdate);
                } else {
                    throw new Error("Format data dari API tidak valid.");
                }

            } catch (err) {
                console.error("Gagal load Google Sheet via Proxy", err);
                setIsLoadError(true);
            }
        }
        fetchSheetData();
    }, []);

    // Tabular math for absolute values
    const totalUsaha = monitoringData.reduce((sum, item) => sum + item.target, 0);
    const totalSelesai = monitoringData.reduce((sum, item) => sum + item.selesai, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-8 pb-12"
        >
            {/* Header Area */}
            <div className="space-y-4 text-center md:text-left mt-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Ground Check: Pra Prelist SE2026
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                    Dashboard Monitoring Eksekutif Rekrutmen & Pelaksanaan Ground Check Sensus Ekonomi Provinsi Papua.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600 border border-gray-200 shadow-sm mt-4">
                    <div className={`w-2 h-2 rounded-full ${isLoadError ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                    Update Terakhir: {lastUpdate}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Target Usaha</p>
                        <p className="text-3xl font-extrabold text-gray-900">{totalUsaha.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Selesai GC</p>
                        <p className="text-3xl font-extrabold text-green-600">{totalSelesai.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Progres Nasional</p>
                        <p className="text-3xl font-extrabold text-[#f79039]">{progresNasional}%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 text-[#f79039] rounded-full flex items-center justify-center shrink-0">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Rincian Progres Per Wilayah</h2>
                </div>

                <div className="w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                        <thead className="bg-white text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="p-4 pl-6">Wilayah Kerja</th>
                                <th className="p-4">Provinsi Induk</th>
                                <th className="p-4 text-right">Target</th>
                                <th className="p-4 text-right">Selesai</th>
                                <th className="p-4 w-1/3">Progres Ground Check</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {monitoringData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 pl-6 font-bold text-gray-900">{row.wilayah}</td>
                                    <td className="p-4 text-sm text-gray-500">{row.wilayah_induk}</td>
                                    <td className="p-4 text-right font-mono text-sm text-gray-600">{row.target.toLocaleString('id-ID')}</td>
                                    <td className="p-4 text-right font-mono text-sm font-medium text-gray-900">{row.selesai.toLocaleString('id-ID')}</td>
                                    <td className="p-4 align-middle pr-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-slate-700 w-14 text-right">{row.progres}%</span>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${row.progres >= 90 ? 'bg-green-500' :
                                                        row.progres >= 50 ? 'bg-yellow-400' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${row.progres}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
