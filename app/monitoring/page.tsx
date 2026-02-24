"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, TrendingUp } from 'lucide-react';

interface RegionalData {
    id: string | number;
    wilayah: string;
    target: number;
    selesai: number;
    progres: number;
    wilayah_induk: string;
}

export default function MonitoringPage() {
    const [progresNasional, setProgresNasional] = useState<string>('...');
    const [lastUpdate, setLastUpdate] = useState<string>('Memuat data...');
    const [monitoringData, setMonitoringData] = useState<RegionalData[]>([]);
    const [isLoadError, setIsLoadError] = useState(false);

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
                    if (json.data.monitoringData) setMonitoringData(json.data.monitoringData);
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

    // Tabular math for absolute values based on dynamic real-time dataset
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
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Progres</p>
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
                            {['PAPUA', 'PAPUA SELATAN', 'PAPUA TENGAH', 'PAPUA PEGUNUNGAN'].map((prov) => {
                                const kabs = monitoringData.filter(d => d.wilayah_induk === prov);
                                if (kabs.length === 0) return null;

                                const provTarget = kabs.reduce((s, i) => s + i.target, 0);
                                const provSelesai = kabs.reduce((s, i) => s + i.selesai, 0);
                                const provProgres = provTarget > 0 ? ((provSelesai / provTarget) * 100).toFixed(2) : '0.00';
                                const provCode = prov === 'PAPUA' ? '94' : prov === 'PAPUA SELATAN' ? '95' : prov === 'PAPUA TENGAH' ? '96' : '97';

                                return (
                                    <React.Fragment key={prov}>
                                        {/* Render Kabupatens */}
                                        {kabs.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4 pl-6 font-bold text-gray-900 border-l-[3px] border-transparent">{row.wilayah}</td>
                                                <td className="p-4 text-sm text-gray-400">{row.wilayah_induk}</td>
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

                                        {/* Render Province Recap Row directly below its Kabupatens */}
                                        <tr className="bg-orange-50/30 border-t border-orange-100/80 hover:bg-orange-50/60 transition-colors">
                                            <td className="p-4 pl-6 font-bold text-gray-900 border-l-[3px] border-se-jingga" colSpan={2}>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-orange-500 font-mono text-sm">[{provCode}]</span>
                                                    <span className="italic tracking-wide text-[15px]">{prov}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-mono text-sm font-bold text-gray-800">{provTarget.toLocaleString('id-ID')}</td>
                                            <td className="p-4 text-right font-mono text-sm font-extrabold text-gray-900">{provSelesai.toLocaleString('id-ID')}</td>
                                            <td className="p-4 align-middle pr-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-extrabold text-orange-600 w-14 text-right">{provProgres}%</span>
                                                    <div className="w-full bg-orange-100 rounded-full h-2.5 overflow-hidden drop-shadow-sm">
                                                        <div
                                                            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${Number(provProgres) >= 90 ? 'bg-green-500' :
                                                                Number(provProgres) >= 50 ? 'bg-yellow-400' :
                                                                    'bg-red-500'
                                                                }`}
                                                            style={{ width: `${provProgres}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
