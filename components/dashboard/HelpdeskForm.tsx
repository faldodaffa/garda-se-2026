"use client";

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function HelpdeskForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setIsSubmitted(true), 600);
    };

    return (
        <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/40 shadow-2xl shadow-black/5 relative overflow-hidden group hover:shadow-orange-500/10 transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform group-hover:scale-110 transition-transform duration-700">
                <MessageSquare className="w-56 h-56" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center tracking-tight">
                            <div className="bg-orange-100 p-2.5 rounded-2xl mr-4">
                                <MessageSquare className="w-8 h-8 text-se-jingga" />
                            </div>
                            Helpdesk
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Mengalami kendala teknis terkait aplikasi, sistem SBR, Wilkerstat, atau jaringan? Sampaikan keluhan Anda kepada tim teknis BPS Provinsi Papua di sini.
                        </p>
                    </div>

                    <div className="bg-blue-50/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-100/50">
                        <h3 className="font-bold text-blue-900 text-sm mb-2 uppercase tracking-wide">Jam Operasional IT</h3>
                        <p className="text-blue-700 text-sm font-medium">Senin - Jumat: 08.00 - 16.00 WIT</p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 bg-green-50/50 rounded-3xl p-12 border border-green-100 animate-in fade-in zoom-in duration-500">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                            <h3 className="text-2xl font-bold text-gray-900">Laporan Berhasil Terkirim!</h3>
                            <p className="text-gray-600 text-center max-w-sm">
                                Tiket bantuan Anda telah diterima. Tim Helpdesk BPS Provinsi Papua akan segera menghubungi Anda secara langsung.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-4 px-6 py-2.5 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                            >
                                Kirim Laporan Baru
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="nama_lengkap" className="block text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                                    <input required id="nama_lengkap" type="text" className="w-full px-5 py-3.5 rounded-2xl border border-white/60 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 bg-white/50 backdrop-blur-sm transition-all outline-none placeholder:text-gray-400" placeholder="Nama Lengkap Anda" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="satuan_kerja" className="block text-sm font-semibold text-gray-700 ml-1">Satuan Kerja / Asal</label>
                                    <select required id="satuan_kerja" className="w-full px-5 py-3.5 rounded-2xl border border-white/60 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 bg-white/50 backdrop-blur-sm transition-all outline-none">
                                        <option value="">Pilih Institusi Anda</option>
                                        <option value="BPS Provinsi Papua">BPS Provinsi Papua</option>
                                        <option value="BPS Kab/Kota">BPS Kab/Kota (Daerah)</option>
                                        <option value="Mitra Statistik">Petugas Mitra Statistik</option>
                                        <option value="Lainnya">Publik Umum / Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="kategori_kendala" className="block text-sm font-semibold text-gray-700 ml-1">Topik Kendala (Kategorisasi Laporan)</label>
                                <select required id="kategori_kendala" className="w-full px-5 py-3.5 rounded-2xl border border-white/60 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 bg-white/50 backdrop-blur-sm transition-all outline-none">
                                    <option value="">Pilih Kategori Kendala Teknis</option>
                                    <option value="Error Sistem">Error Aplikasi & Sistem (FASIH dll)</option>
                                    <option value="Jaringan Server">Akses Jaringan & Server Down</option>
                                    <option value="SBR Wilkerstat">Masalah Pemetaan Wilkerstat / SBR</option>
                                    <option value="Dokumen Fisik">Kendala Dokumen Fisik / Administrasi</option>
                                    <option value="Masalah Lapangan">Konflik Lapangan & Responden Menolak</option>
                                    <option value="Lainnya">Lainnya...</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="deskripsi_masalah" className="block text-sm font-semibold text-gray-700 ml-1">Deskripsi & Detail Masalah</label>
                                <textarea required id="deskripsi_masalah" className="w-full px-5 py-3.5 rounded-2xl border border-white/60 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 bg-white/50 backdrop-blur-sm transition-all outline-none h-32 resize-none placeholder:text-gray-400" placeholder="Jelaskan secara spesifik lokasi, jenis error, atau nomor dokumen jika kesulitan administratif..."></textarea>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="submit" className="flex items-center px-8 py-4 bg-gradient-to-r from-se-jingga to-orange-600 text-white rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide shadow-md">
                                    <Send className="w-5 h-5 mr-2.5" />
                                    Kirim Laporan
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
