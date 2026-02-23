"use client";

import React, { useState, useEffect } from 'react';
import { UploadCloud, Link as LinkIcon, Download, Search, Info, Edit2, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

// Standard Bento Data Model
interface BentoLink {
    id: string | number;
    kategori: string;
    nama: string;
    deskripsi: string;
    label: string;
    url: string;
}

const defaultBentoData: BentoLink[] = [
    // 1. Administrasi SE2026
    { id: 1, kategori: 'Administrasi SE2026', nama: 'Buku Pedoman SE2026', deskripsi: 'Buku 1 - Buku 6 (Pedoman Lengkap)', label: 'PENTING', url: '#' },
    { id: 2, kategori: 'Administrasi SE2026', nama: 'SK Tim Pelaksana', deskripsi: 'Surat Keputusan Tim', label: '', url: '#' },
    { id: 3, kategori: 'Administrasi SE2026', nama: 'SK Tim GARDA', deskripsi: 'Tim Penjamin Kualitas', label: '', url: '#' },
    { id: 4, kategori: 'Administrasi SE2026', nama: 'Surat-menyurat', deskripsi: 'Arsip Persuratan', label: '', url: '#' },
    { id: 5, kategori: 'Administrasi SE2026', nama: 'Administrasi Rapat', deskripsi: 'Notulensi & Daftar Hadir', label: '', url: '#' },
    { id: 6, kategori: 'Administrasi SE2026', nama: 'Laporan Kegiatan', deskripsi: 'Laporan Bulanan & Triwulanan', label: '', url: '#' },

    // 2. Informasi & Persiapan SE2026
    { id: 7, kategori: 'Informasi & Persiapan SE2026', nama: 'Gambaran Umum & KBLI 2025', deskripsi: 'Konsep Definisi & Klasifikasi', label: '', url: '#' },
    { id: 8, kategori: 'Informasi & Persiapan SE2026', nama: 'SBR & Profiling Mandiri', deskripsi: 'Statistical Business Register', label: '', url: '#' },
    { id: 9, kategori: 'Informasi & Persiapan SE2026', nama: 'Pemutakhiran Wilkerstat', deskripsi: 'Peta Blok Sensus', label: '', url: '#' },
    { id: 10, kategori: 'Informasi & Persiapan SE2026', nama: 'Identifikasi KBLI Dominan', deskripsi: 'Analisis Potensi Wilayah', label: '', url: '#' },
    { id: 11, kategori: 'Informasi & Persiapan SE2026', nama: 'Briefing Sub-SLS & Rapat RI', deskripsi: 'Koordinasi Wilayah', label: '', url: '#' },
    { id: 12, kategori: 'Informasi & Persiapan SE2026', nama: 'Contoh Narasi Usaha', deskripsi: 'Panduan Deskripsi Usaha', label: '', url: '#' },

    // 3. Publisitas & Media
    { id: 13, kategori: 'Publisitas & Media', nama: 'Strategi & Branding', deskripsi: 'Strategi, Theme Song & Logo', label: '', url: '#' },
    { id: 14, kategori: 'Publisitas & Media', nama: 'Desain Medsos & Video', deskripsi: 'Konten Instagram/YouTube', label: '', url: '#' },
    { id: 15, kategori: 'Publisitas & Media', nama: 'Merch & Ekraf', deskripsi: 'Seragam & Souvenir', label: '', url: '#' },
    { id: 16, kategori: 'Publisitas & Media', nama: 'Rekap Konten & Sosialisasi', deskripsi: 'Laporan Publisitas', label: '', url: '#' },
    { id: 17, kategori: 'Publisitas & Media', nama: 'Outdoor Advertising', deskripsi: 'Spanduk, Baliho, Videotron', label: '', url: '#' },
    { id: 18, kategori: 'Publisitas & Media', nama: 'Dukungan Eksternal', deskripsi: 'Dukungan Pemda/Dinas', label: '', url: '#' },
];

export default function BentoLinkManager() {
    const [bentoLinks, setBentoLinks] = useState<BentoLink[]>(defaultBentoData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<string | null>(null);

    // 1. DATA LOADER ON MOUNT — Fetch from Supabase Cloud DB
    useEffect(() => {
        const loadFromSupabase = async () => {
            try {
                const { data, error } = await supabase
                    .from('bento_links')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {
                    setBentoLinks(data as BentoLink[]);
                } else {
                    // Table exists but is empty, seed with default data
                    await seedDefaultData();
                }
            } catch (e) {
                console.warn('Supabase fetch failed, falling back to localStorage', e);
                // Fallback to localStorage
                const savedData = localStorage.getItem('garda_se2026_bento_links');
                if (savedData) {
                    try { setBentoLinks(JSON.parse(savedData)); } catch { /* ignore */ }
                }
            }
            setIsLoaded(true);
        };

        const seedDefaultData = async () => {
            try {
                const { error } = await supabase
                    .from('bento_links')
                    .upsert(defaultBentoData.map(item => ({
                        id: Number(item.id),
                        kategori: item.kategori,
                        nama: item.nama,
                        deskripsi: item.deskripsi,
                        label: item.label,
                        url: item.url
                    })), { onConflict: 'id' });
                if (error) throw error;
            } catch (e) {
                console.error('Failed to seed default data to Supabase', e);
            }
        };

        loadFromSupabase();
    }, []);

    // 2. SAVE TO SUPABASE — Triggered manually via Save button
    const saveToSupabase = async () => {
        setIsSaving(true);
        setSaveStatus(null);

        // Diagnostic check: are env vars present?
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
            setSaveStatus(`⚠️ Env vars tidak terbaca! URL=${url ? '✅' : '❌'} KEY=${key ? '✅' : '❌'}. Pastikan sudah di-set di Vercel dan Redeploy.`);
            localStorage.setItem('garda_se2026_bento_links', JSON.stringify(bentoLinks));
            setIsSaving(false);
            return;
        }

        try {
            const payload = bentoLinks.map(item => ({
                id: Number(item.id),
                kategori: item.kategori,
                nama: item.nama,
                deskripsi: item.deskripsi,
                label: item.label,
                url: item.url
            }));

            const { error } = await supabase
                .from('bento_links')
                .upsert(payload, { onConflict: 'id' });

            if (error) {
                console.error('Supabase upsert error details:', JSON.stringify(error));
                throw new Error(`Supabase Error: ${error.message} (Code: ${error.code})`);
            }

            // Also keep localStorage as fallback
            localStorage.setItem('garda_se2026_bento_links', JSON.stringify(bentoLinks));
            setSaveStatus('✅ Berhasil disimpan ke Database Cloud! Semua perangkat akan tersinkronisasi.');
        } catch (e: any) {
            console.error('Supabase save failed:', e);
            localStorage.setItem('garda_se2026_bento_links', JSON.stringify(bentoLinks));
            setSaveStatus(`⚠️ Gagal: ${e?.message || 'Unknown error'}. Data disimpan lokal saja.`);
        }
        setIsSaving(false);
        setTimeout(() => setSaveStatus(null), 8000);
    };

    // --- State for Inline Editing ---
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<BentoLink>>({});

    const handleEditClick = (item: BentoLink) => {
        setEditingId(item.id);
        setEditFormData(item);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleSaveEdit = (id: string | number) => {
        setBentoLinks(bentoLinks.map(item => item.id === id ? { ...item, ...editFormData } as BentoLink : item));
        setEditingId(null);
    };


    const downloadTemplate = () => {
        // Export ALL current bento links as a native Excel .xlsx file
        const worksheetData = bentoLinks.map(link => ({
            'Kategori': link.kategori,
            'Nama Dokumen': link.nama,
            'Deskripsi': link.deskripsi,
            'Label': link.label,
            'URL Tujuan': link.url
        }));

        const ws = XLSX.utils.json_to_sheet(worksheetData);

        // Auto-fit column widths for better readability
        ws['!cols'] = [
            { wch: 30 }, // Kategori
            { wch: 30 }, // Nama Dokumen
            { wch: 40 }, // Deskripsi
            { wch: 12 }, // Label
            { wch: 50 }, // URL Tujuan
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Tautan Bento');
        XLSX.writeFile(wb, 'template_dokumen_se2026.xlsx');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = event.target?.result;
            if (!data) return;

            try {
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows: any[] = XLSX.utils.sheet_to_json(firstSheet);

                // Parse Excel rows into BentoLink array
                const replacementLinks: BentoLink[] = rows.map((row, index) => ({
                    id: index + 1,
                    kategori: String(row['Kategori'] || '').trim(),
                    nama: String(row['Nama Dokumen'] || '').trim(),
                    deskripsi: String(row['Deskripsi'] || '').trim(),
                    label: String(row['Label'] || '').trim(),
                    url: String(row['URL Tujuan'] || '#').trim()
                })).filter(item => item.nama);

                if (replacementLinks.length === 0) {
                    setSaveStatus('⚠️ File Excel kosong atau format header tidak sesuai.');
                    setTimeout(() => setSaveStatus(null), 5000);
                    return;
                }

                // REPLACE mode: Excel data fully replaces existing data
                setBentoLinks(replacementLinks);

                // Auto-save to Supabase Cloud
                try {
                    await supabase.from('bento_links').delete().gte('id', 0);
                    const { error } = await supabase
                        .from('bento_links')
                        .insert(replacementLinks.map(item => ({
                            id: Number(item.id),
                            kategori: item.kategori,
                            nama: item.nama,
                            deskripsi: item.deskripsi,
                            label: item.label,
                            url: item.url
                        })));

                    if (error) throw error;
                    localStorage.setItem('garda_se2026_bento_links', JSON.stringify(replacementLinks));
                    setSaveStatus(`✅ ${replacementLinks.length} dokumen dari Excel berhasil menggantikan data lama & tersimpan ke Cloud!`);
                } catch (err) {
                    console.error('Excel auto-save to Supabase failed:', err);
                    localStorage.setItem('garda_se2026_bento_links', JSON.stringify(replacementLinks));
                    setSaveStatus(`⚠️ Excel diproses lokal, tapi gagal sync ke Cloud. Klik "☁️ Simpan ke Cloud" manual.`);
                }
            } catch (parseErr) {
                console.error('Failed to parse Excel file:', parseErr);
                setSaveStatus('⚠️ Gagal membaca file. Pastikan format file .xlsx atau .csv yang valid.');
            }
            setTimeout(() => setSaveStatus(null), 6000);
        };
        reader.readAsArrayBuffer(file);

        e.target.value = '';
    };

    const filteredLinks = bentoLinks.filter(l => l.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 flex flex-col gap-8 h-full">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-gray-900">
                        <LinkIcon className="text-se-jingga w-6 h-6" />
                        Kelola Tautan Bento
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-lg">
                        Manajemen terpusat kotak menu pintar halaman Dokumen. Gunakan Edit baris langsung, atau upload Excel massal.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={downloadTemplate}
                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Template Excel
                    </button>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            title="Upload Excel / CSV"
                        />
                        <button className="w-full px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-se-jingga hover:shadow-lg transition-all shadow-sm">
                            <UploadCloud className="w-4 h-4 text-orange-400" />
                            Update Serentak (Upload Excel)
                        </button>
                    </div>
                    <button
                        onClick={saveToSupabase}
                        disabled={isSaving}
                        className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        {isSaving ? 'Menyimpan...' : '☁️ Simpan ke Cloud'}
                    </button>
                </div>
            </div>

            {/* Cloud Save Status */}
            {saveStatus && (
                <div className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium",
                    saveStatus.includes('✅') ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                )}>
                    {saveStatus}
                </div>
            )}

            {/* List Table UI */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari nama dokumen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:ring-2 focus:ring-se-jingga outline-none transition-all"
                    />
                </div>

                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Header Columns: Added "Aksi" column space */}
                    <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200 grid grid-cols-12 gap-2 md:gap-4 text-xs font-extrabold text-gray-500 tracking-wider uppercase">
                        <div className="col-span-3">Nama</div>
                        <div className="col-span-2 hidden md:block">Kategori</div>
                        <div className="col-span-3">Deskripsi</div>
                        <div className="col-span-3">URL Target</div>
                        <div className="col-span-1 text-center">Aksi</div>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto custom-scrollbar">
                        {filteredLinks.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                                <Info className="w-8 h-8 mb-2 opacity-20" />
                                <p>Tidak ada tautan/dokumen ditemukan.</p>
                            </div>
                        ) : (
                            filteredLinks.map((link) => (
                                <div key={link.id} className="px-4 py-3 grid grid-cols-12 gap-2 md:gap-4 items-center hover:bg-se-jingga/5 transition-colors">

                                    {editingId === link.id ? (
                                        /* --- EDIT MODE --- */
                                        <>
                                            <div className="col-span-3 flex flex-col gap-1">
                                                <input type="text" className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs text-gray-800 focus:ring-se-jingga focus:border-se-jingga outline-none"
                                                    value={editFormData.nama || ''} onChange={(e) => setEditFormData({ ...editFormData, nama: e.target.value })} placeholder="Nama" />
                                                <input type="text" className="w-full border border-gray-300 rounded-md px-2 py-1 text-[10px] text-gray-500 font-bold placeholder-red-300 uppercase focus:ring-se-jingga outline-none"
                                                    value={editFormData.label || ''} onChange={(e) => setEditFormData({ ...editFormData, label: e.target.value })} placeholder="Label (Opsi)" />
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <input type="text" className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs text-gray-800 focus:ring-se-jingga outline-none"
                                                    value={editFormData.kategori || ''} onChange={(e) => setEditFormData({ ...editFormData, kategori: e.target.value })} placeholder="Kategori" />
                                            </div>
                                            <div className="col-span-3">
                                                <textarea className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-800 focus:ring-se-jingga outline-none min-h-[50px] resize-none"
                                                    value={editFormData.deskripsi || ''} onChange={(e) => setEditFormData({ ...editFormData, deskripsi: e.target.value })} placeholder="Deskripsi Singkat" />
                                            </div>
                                            <div className="col-span-3">
                                                <input type="text" className="w-full border border-orange-300 bg-orange-50 rounded-md px-2 py-1.5 text-xs text-blue-600 focus:ring-se-jingga focus:border-se-jingga outline-none"
                                                    value={editFormData.url || ''} onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })} placeholder="https://..." />
                                            </div>
                                            <div className="col-span-1 flex gap-1 justify-center items-start">
                                                <button onClick={() => handleSaveEdit(link.id)} className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200" title="Simpan">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button onClick={handleCancelEdit} className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200" title="Batal">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        /* --- READ MODE --- */
                                        <>
                                            <div className="col-span-3 font-bold text-gray-800 text-sm pr-2">
                                                {link.nama}
                                                {link.label && (
                                                    <span className="mt-1 block w-fit px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 whitespace-nowrap">
                                                        {link.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-span-2 hidden md:block">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-600 truncate max-w-full">
                                                    {link.kategori}
                                                </span>
                                            </div>
                                            <div className="col-span-3 text-xs text-gray-500 line-clamp-2">
                                                {link.deskripsi}
                                            </div>
                                            <div className="col-span-3 text-[11px] font-mono text-gray-400 truncate">
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-se-jingga underline decoration-transparent hover:decoration-se-jingga transition-all">
                                                    {link.url}
                                                </a>
                                            </div>
                                            <div className="col-span-1 flex justify-center pb-2">
                                                <button
                                                    onClick={() => handleEditClick(link)}
                                                    className="p-1.5 w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 border border-slate-200 rounded-lg hover:bg-se-jingga hover:text-white hover:border-se-jingga transition-all shadow-sm"
                                                    title="Edit Baris Ini"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-xs text-gray-500 font-medium flex justify-between">
                        <span>Menampilkan {filteredLinks.length} dokumen.</span>
                        <span className="text-gray-400">Pilih baris untuk mengedit info secara spesifik.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
