import React from 'react';

export default function EduSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
            <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/40 shadow-2xl shadow-black/5 hover:shadow-[#F79039]/10 transition-shadow duration-500">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Apa itu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">SE2026?</span></h2>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                    Pusat Komando Sensus Ekonomi 2026 Wilayah Kerja BPS Provinsi Papua (Mencakup Provinsi Papua, Provinsi Papua Selatan, Provinsi Papua Tengah, dan Provinsi Papua Pegunungan).
                    Tujuannya untuk memperoleh data dasar karakteristik usaha yang sangat penting bagi perencanaan pembangunan ekonomi nasional.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6 perspective-1000">
                <div className="bg-gradient-to-br from-primary to-orange-500 rounded-[2rem] p-6 text-white text-center flex flex-col justify-center h-48 shadow-2xl transform hover:scale-105 transition-transform duration-300 rotate-[-3deg] hover:rotate-0 border-t border-white/20">
                    <span className="text-6xl font-extrabold mb-1 tracking-tighter">10</span>
                    <span className="text-sm font-semibold opacity-90 tracking-wide uppercase">Tahun Sekali</span>
                </div>
                <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 text-gray-800 text-center flex flex-col justify-center h-48 border border-white/50 shadow-xl transform hover:scale-105 transition-transform duration-300 rotate-[3deg] hover:rotate-0">
                    <span className="text-5xl font-extrabold mb-1 text-secondary tracking-tighter">All</span>
                    <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">Sektor Usaha</span>
                </div>
                <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 text-gray-800 text-center flex flex-col justify-center h-48 border border-white/50 shadow-xl transform hover:scale-105 transition-transform duration-300 rotate-[2deg] hover:rotate-0">
                    <span className="text-4xl font-extrabold mb-1 text-gray-800 tracking-tighter">Data</span>
                    <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">Basis Ekonomi</span>
                </div>
                <div className="bg-gradient-to-br from-secondary to-yellow-400 rounded-[2rem] p-6 text-white text-center flex flex-col justify-center h-48 shadow-2xl transform hover:scale-105 transition-transform duration-300 rotate-[-2deg] hover:rotate-0 border-t border-white/20">
                    <span className="text-5xl font-extrabold mb-1 tracking-tighter">2026</span>
                    <span className="text-sm font-semibold opacity-90 tracking-wide uppercase">Tahun Pelaksanaan</span>
                </div>
            </div>
        </div>
    );
}
