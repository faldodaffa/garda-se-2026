"use client";

import React from 'react';
import { Calendar, Instagram, ArrowRight, ArrowLeft, Play, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import Link from 'next/link';
import InstagramMinimalist from './InstagramWidget';

const getSlug = (title: string, id: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${id}`;
};

export default function MediaCenter() {
    const { config } = useSiteConfig();
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Carousel State
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoList = config.socialEmbeds?.youtubePlaylist || [config.socialEmbeds?.youtube || "https://www.youtube.com/embed/dQw4w9WgXcQ"];
    const currentVideo = videoList[currentVideoIndex];

    const nextVideo = () => setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
    const prevVideo = () => setCurrentVideoIndex((prev) => (prev - 1 + videoList.length) % videoList.length);

    // Fetch News from Proxy
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

    // Helper to strip HTML tags (Regex + Unescape)
    const cleanExcerpt = (html: string) => {
        if (!html) return "";
        // 1. Unescape first
        const unescaped = html
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, " ");

        // 2. Remove all HTML tags
        const text = unescaped.replace(/<[^>]+>/g, '');
        // Get first sentence or limit to 150 chars
        const firstSentence = text.split('.')[0] + '.';
        return firstSentence.length > 150 ? text.substring(0, 150) + '...' : firstSentence;
    };

    const mainNews = newsData.length > 0 ? newsData[0] : null;
    const recentNews = newsData.slice(1, 6); // Take 5 items

    return (
        <div className="max-w-7xl mx-auto px-4 pb-20 w-full flex flex-col">

            {/* ROW 1: NEWS SECTION */}
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Main Featured News (2/3) */}
                <div className="lg:w-2/3">
                    {loading ? (
                        <div className="w-full h-96 bg-gray-100 rounded-[2rem] animate-pulse flex items-center justify-center text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : mainNews ? (
                        <Link href={`/berita/${getSlug(mainNews.title, mainNews.news_id)}`}>
                            <div className="group relative rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-black/5 aspect-[16/9] cursor-pointer h-full">
                                <div className="absolute inset-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={mainNews.picture || "https://images.unsplash.com/photo-1544531586-fde5298cdd40"}
                                        alt={mainNews.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                {/* Kontainer Teks di dalam Kartu Berita Utama */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-5 md:p-8 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        {/* Label Kategori (Opsional, jika ada) */}
                                        <div className="flex items-center space-x-2 text-[#f79039] font-bold text-xs md:text-sm mb-2 uppercase tracking-wider">
                                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                            <span>{mainNews.rl_date}</span>
                                        </div>

                                        {/* Judul Berita - Diperkecil untuk Mobile (text-xl atau text-2xl) */}
                                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-snug md:leading-tight mb-2 md:mb-3 line-clamp-3 md:line-clamp-none shadow-sm group-hover:text-se-jingga transition-colors">
                                            {mainNews.title}
                                        </h3>

                                        {/* Deskripsi/Sub-judul - Diperkecil untuk Mobile */}
                                        <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-2xl font-medium">
                                            {cleanExcerpt(mainNews.news)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="w-full h-96 bg-gray-50 border border-dashed rounded-[2rem] flex items-center justify-center text-gray-400">
                            Belum ada berita terbaru.
                        </div>
                    )}
                </div>

                {/* Sub News / Recent News List (1/3) */}
                <div className="flex flex-col h-full bg-white/90 backdrop-blur-xl rounded-[2rem] ring-1 ring-slate-100 shadow-[0_20px_50px_rgb(0,0,0,0.03)] p-6 lg:w-1/3">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-gray-900">Berita Terkini</h4>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '400px' }}>
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)
                        ) : recentNews.length > 0 ? (
                            recentNews.map((news: any, idx: number) => (
                                <Link key={idx} href={`/berita/${news.news_id}`}>
                                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={news.picture || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655"}
                                                alt={news.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-se-jingga transition-colors">
                                                {news.title}
                                            </h5>
                                            <p className="text-xs text-gray-400 mt-1 flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {news.rl_date}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-10">Tidak ada berita tambahan.</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link href="/berita" className="flex items-center justify-center w-full py-3 text-sm font-bold text-se-jingga bg-se-jingga/10 rounded-xl hover:bg-se-jingga hover:text-white transition">
                            Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ROW 2: YOUTUBE SECTION */}
            <div className="w-full mt-12 relative group">
                <div className="hidden md:flex absolute top-6 left-6 z-10 items-center space-x-2 bg-red-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg pointer-events-none">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Official Youtube</span>
                </div>
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] ring-1 ring-slate-100/50">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/9vzSi78d-Ys?si=TlrNLp0oDi-cB3g6"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy">
                    </iframe>
                </div>
            </div>

            {/* ROW 3: INSTAGRAM SECTION */}
            <div className="w-full mt-12">
                <div className="bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-[2.5rem] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col ring-1 ring-purple-100/50">
                    <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg shadow-purple-500/20">
                        <Instagram className="w-4 h-4" />
                        <span>Social Feed</span>
                    </div>

                    {/* Updated Minimalist CTA Layer */}
                    <div className="w-full bg-white rounded-2xl shadow-sm ring-1 ring-gray-100/50 overflow-hidden relative">
                        <InstagramMinimalist />
                    </div>
                </div>
            </div>
        </div>
    );
}
