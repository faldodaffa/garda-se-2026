"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, TrendingUp, ListFilter, ArrowUpDown, LayoutGrid, AlertCircle, BarChart2 } from 'lucide-react';

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

    // Add UI State
    const [viewMode, setViewMode] = useState<'hierarki' | 'global'>('hierarki');
    const [activeProvince, setActiveProvince] = useState<string>('SEMUA');
    const [sortOption, setSortOption] = useState<'default' | 'progress_asc' | 'progress_desc' | 'volume_desc'>('default');

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

    // AI Analytical Engine (Filter & Sort Pipeline)
    const processedData = React.useMemo(() => {
        let result = [...monitoringData];

        // 1. Filter by Province
        if (activeProvince !== 'SEMUA') {
            result = result.filter(item => item.wilayah_induk === activeProvince);
        }

        // 2. Sort by Parameter
        if (sortOption === 'progress_asc') {
            result.sort((a, b) => a.progres - b.progres);
        } else if (sortOption === 'progress_desc') {
            result.sort((a, b) => b.progres - a.progres);
        } else if (sortOption === 'volume_desc') { // Sisa Beban Tugas (Target - Selesai)
            result.sort((a, b) => (b.target - b.selesai) - (a.target - a.selesai));
        }

        return result;
    }, [monitoringData, activeProvince, sortOption]);


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
                {/* Executive Control Panel */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-se-biru" />
                            Analytical Engine: Progres Wilayah
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Gunakan kontrol di bawah untuk membedah data performa 29 Kabupaten.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100/80 p-1 rounded-xl border border-gray-200 shadow-inner">
                            <button
                                onClick={() => setViewMode('hierarki')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'hierarki' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Hierarki Provinsi
                            </button>
                            <button
                                onClick={() => setViewMode('global')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'global' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <ListFilter className="w-4 h-4" />
                                Peringkat Global
                            </button>
                        </div>

                        {/* Sorting Dropdown */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-se-jingga transition-colors" />
                            </div>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as any)}
                                className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-se-jingga/20 focus:border-se-jingga outline-none transition-all shadow-sm font-medium appearance-none min-w-[200px] cursor-pointer"
                            >
                                <option value="default">Urutan Default Google Sheet</option>
                                <option value="progress_asc">Peringkat Terendah (Kritis)</option>
                                <option value="progress_desc">Peringkat Tertinggi (Top Performers)</option>
                                <option value="volume_desc">Sisa Beban Tugas Terbanyak</option>
                            </select>
                        </div>

                        {/* Province Filter Dropdown */}
                        <div className="relative group">
                            <select
                                value={activeProvince}
                                onChange={(e) => setActiveProvince(e.target.value)}
                                className="pl-4 pr-8 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-se-jingga/20 focus:border-se-jingga outline-none transition-all shadow-sm font-medium appearance-none cursor-pointer"
                            >
                                <option value="SEMUA">Semua Provinsi (29 Kab)</option>
                                <option value="PAPUA">Papua Induk</option>
                                <option value="PAPUA SELATAN">Papua Selatan</option>
                                <option value="PAPUA TENGAH">Papua Tengah</option>
                                <option value="PAPUA PEGUNUNGAN">Papua Pegunungan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto custom-scrollbar relative">
                    <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
                        <thead className="bg-white text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="p-4 pl-6">Wilayah Kerja</th>
                                <th className="p-4">Provinsi Induk</th>
                                <th className="p-4 text-right">Target</th>
                                <th className="p-4 text-right">Selesai</th>
                                <th className="p-4 w-1/3">Progres Ground Check</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 relative">
                            {viewMode === 'hierarki' ? (
                                // --- HIERARCHICAL MODE ---
                                ['PAPUA', 'PAPUA SELATAN', 'PAPUA TENGAH', 'PAPUA PEGUNUNGAN'].map((prov) => {
                                    // Hanya render provinsi ini jika filter "SEMUA" aktif, atau jika sedang terpilih.
                                    if (activeProvince !== 'SEMUA' && activeProvince !== prov) return null;

                                    const kabs = processedData.filter(d => d.wilayah_induk === prov);
                                    if (kabs.length === 0) return null;

                                    const provTarget = kabs.reduce((s, i) => s + i.target, 0);
                                    const provSelesai = kabs.reduce((s, i) => s + i.selesai, 0);
                                    const provProgres = provTarget > 0 ? ((provSelesai / provTarget) * 100).toFixed(2) : '0.00';
                                    const provCode = prov === 'PAPUA' ? '94' : prov === 'PAPUA SELATAN' ? '95' : prov === 'PAPUA TENGAH' ? '96' : '97';

                                    return (
                                        <React.Fragment key={prov}>
                                            {/* Render Kabupatens */}
                                            {kabs.map((row) => {
                                                const isCritical = row.progres < 50;
                                                return (
                                                    <motion.tr layout key={row.id} className={`transition-colors ${isCritical ? 'bg-red-50/40 hover:bg-red-50/80' : 'hover:bg-gray-50/50'}`}>
                                                        <td className={`p-4 pl-6 font-bold text-gray-900 border-l-[3px] flex items-center gap-2 ${isCritical ? 'border-red-500' : 'border-transparent'}`}>
                                                            {isCritical && <AlertCircle className="w-4 h-4 text-red-500" />}
                                                            {row.wilayah}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-400">{row.wilayah_induk}</td>
                                                        <td className="p-4 text-right font-mono text-sm text-gray-600">{row.target.toLocaleString('id-ID')}</td>
                                                        <td className="p-4 text-right font-mono text-sm font-medium text-gray-900">{row.selesai.toLocaleString('id-ID')}</td>
                                                        <td className="p-4 align-middle pr-6">
                                                            <div className="flex items-center gap-3">
                                                                <span className={`text-sm font-bold w-14 text-right ${isCritical ? 'text-red-600' : 'text-slate-700'}`}>{row.progres}%</span>
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
                                                    </motion.tr>
                                                )
                                            })}

                                            {/* Render Province Recap Row directly below its Kabupatens */}
                                            <motion.tr layout className="bg-orange-50/40 border-t border-orange-100 hover:bg-orange-50/80 transition-colors">
                                                <td className="p-4 pl-6 font-bold text-gray-900 border-l-[3px] border-se-jingga" colSpan={2}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-orange-500 font-mono text-sm">[{provCode}]</span>
                                                        <span className="italic tracking-wide text-[14px] uppercase">{prov}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-mono text-sm font-bold text-gray-800">{provTarget.toLocaleString('id-ID')}</td>
                                                <td className="p-4 text-right font-mono text-sm font-extrabold text-gray-900">{provSelesai.toLocaleString('id-ID')}</td>
                                                <td className="p-4 align-middle pr-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-extrabold text-[#f79039] w-14 text-right">{provProgres}%</span>
                                                        <div className="w-full bg-orange-100 rounded-full h-2.5 overflow-hidden drop-shadow-sm">
                                                            <div
                                                                className={`h-2.5 rounded-full transition-all duration-1000 ease-out outline outline-1 outline-[#f79039]/20 ${Number(provProgres) >= 90 ? 'bg-green-500' :
                                                                    Number(provProgres) >= 50 ? 'bg-yellow-400' :
                                                                        'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${provProgres}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                // --- GLOBAL RANKING MODE ---
                                processedData.map((row) => {
                                    const isCritical = row.progres < 50;
                                    return (
                                        <motion.tr layout key={row.id} className={`transition-colors ${isCritical ? 'bg-red-50/40 hover:bg-red-50/80' : 'hover:bg-gray-50/50'}`}>
                                            <td className={`p-4 pl-6 font-bold text-gray-900 border-l-[3px] flex items-center gap-2 ${isCritical ? 'border-red-500' : 'border-transparent'}`}>
                                                {isCritical && <AlertCircle className="w-4 h-4 text-red-500" />}
                                                {row.wilayah}
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 font-medium">
                                                <span className="px-2 py-1 bg-gray-100 rounded-md border border-gray-200 text-xs shadow-sm">
                                                    {row.wilayah_induk}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-sm text-gray-600">{row.target.toLocaleString('id-ID')}</td>
                                            <td className="p-4 text-right font-mono text-sm font-medium text-gray-900">{row.selesai.toLocaleString('id-ID')}</td>
                                            <td className="p-4 align-middle pr-6">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-sm font-bold w-14 text-right ${isCritical ? 'text-red-600' : 'text-slate-700'}`}>{row.progres}%</span>
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
                                        </motion.tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
