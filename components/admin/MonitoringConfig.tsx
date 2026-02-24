"use client";

import React, { useState } from 'react';
import { Database, Save, Loader2, Link2, ShieldAlert } from 'lucide-react';

export default function MonitoringConfig() {
    const sheetId = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';
    const [isSaving, setIsSaving] = useState(false);
    const [lastSync, setLastSync] = useState('Real-Time (Bypass CSV)');

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call to save config & trigger mirror job
        setTimeout(() => {
            setIsSaving(false);
            setLastSync(new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIT');
            alert('Konfigurasi berhasil disimpan. Sinkronisasi data ke server Garda berjalan di latar belakang.');
        }, 1200);
    };

    return (
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-gray-900">
                        <Database className="text-se-jingga w-7 h-7" />
                        Monitoring API Config
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
                        Data monitoring ditarik secara otomatis menggunakan arsitektur <b>Bypass Endpoint CSV</b> (Tanpa limit API). Data langsung dirender ke klien tanpa memerlukan Google Cloud Service Account.
                    </p>
                </div>

                <div className="text-right">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Status Sinkronisasi</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-lg border border-green-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Terhubung
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">Terakhir: {lastSync}</p>
                </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex gap-4 items-start">
                <ShieldAlert className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-900 space-y-1">
                    <p className="font-bold">Keamanan & Kecepatan Maksimal (Status: Aktif)</p>
                    <p className="text-emerald-700">Skrip bypass telah aktif. Spreadsheet target disetel ke publik (View Only), sehingga website Garda SE2026 dapat menarik data tanpa <i>bottleneck</i> server Google Cloud Platform.</p>
                </div>
            </div>

            <div className="grid gap-6 max-w-3xl">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-gray-400" />
                        Google Sheet ID Utama Tim IT (Hardcoded)
                    </label>
                    <input
                        type="text"
                        value={sheetId}
                        readOnly
                        className="w-full font-mono text-sm px-4 py-3 bg-gray-100 border border-gray-200 text-gray-600 rounded-xl cursor-not-allowed outline-none"
                    />
                    <p className="text-xs text-gray-400 font-mono pl-1">Menghubungkan ke: https://docs.google.com/spreadsheets/d/<span className="font-bold text-gray-600 border-b border-gray-300">{sheetId}</span>/edit</p>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-se-jingga transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Menyinkronisasi...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-2" />
                            Simpan & Sinkronisasi
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
