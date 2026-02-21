import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NewsPortal() {
    const news = [
        { title: "Pelatihan Petugas Sensus Ekonomi 2026 Dimulai", date: "12 Feb 2026", image: "bg-blue-100" },
        { title: "BPS Papua Gelar Apel Siaga SE2026", date: "10 Feb 2026", image: "bg-green-100" },
        { title: "Sosialisasi Digitalisasi Sensus Ekonomi", date: "05 Feb 2026", image: "bg-se-jingga" },
        { title: "Kunjungan Kerja Kepala BPS RI", date: "01 Feb 2026", image: "bg-purple-100" },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="w-10 h-1 bg-secondary rounded-full mr-3"></span>
                    Berita Terkini
                </h2>
                <Link href="#" className="text-primary text-sm font-medium hover:underline flex items-center">
                    Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                        <div className={`h-40 ${item.image} flex items-center justify-center`}>
                            <span className="text-gray-400">Thumbnail</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                <Calendar className="w-3 h-3 mr-1" />
                                {item.date}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
