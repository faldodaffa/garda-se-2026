"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Loader2, Newspaper } from 'lucide-react';

const getSlug = (title: string, id: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${id}`;
};

export default function NewsIndexPage() {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch('/api/bps-news');
                if (res.ok) {
                    const json = await res.json();
                    if (json.data && Array.isArray(json.data)) {
                        setNewsData(json.data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    // Helper to strip HTML tags
    const cleanExcerpt = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        const text = tmp.textContent || tmp.innerText || "";
        return text.split(/(?<=\.)\s/)[0] + '.'; // First sentence
    };

    return (
        <main className="min-h-screen bg-[#F5F5F7] pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-2xl mb-6">
                        <Newspaper className="w-8 h-8 text-se-jingga" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Berita & Publikasi
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Pembaruan terkini terkait Sensus Ekonomi 2026 dan kegiatan Badan Pusat Statistik Provinsi Papua.
                    </p>
                </div>
            </div>

            {/* News Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-gray-500 font-medium">Memuat berita terbaru...</p>
                    </div>
                ) : newsData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsData.map((news: any, idx: number) => (
                            <Link key={idx} href={`/berita/${news.news_id}`}>
                                <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2">
                                    <div className="h-56 relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={news.picture || "https://images.unsplash.com/photo-1544531586-fde5298cdd40"}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center space-x-2 text-se-jingga text-xs font-bold uppercase tracking-wider mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span>{news.rl_date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-se-jingga transition-colors">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {cleanExcerpt(news.news)}
                                        </p>
                                        <div className="flex items-center text-primary font-bold text-sm group-hover:underline">
                                            Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 bg-white rounded-[3rem] shadow-sm">
                        <p className="text-lg">Belum ada berita yang tersedia.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
