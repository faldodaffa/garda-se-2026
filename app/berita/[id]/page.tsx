import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, AlertCircle } from 'lucide-react';

// Fetch specific news details using BPS "VIEW" API
async function getNewsDetail(id: string) {
    const BPS_VIEW_API_URL = `https://webapi.bps.go.id/v1/api/view/domain/9400/model/news/lang/ind/id/${id}/key/e70c8dae94e2972dbfc16cf893527f0e/`;

    try {
        const response = await fetch(BPS_VIEW_API_URL, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) return null;

        const json = await response.json();

        // Validation: Verify data exists
        if (!json || !json.data) return null;

        // The View API usually returns the object directly in data
        return json.data;

    } catch (error) {
        console.error("Error fetching news detail view:", error);
        return null;
    }
}

// Helper to decode HTML entities
function unescapeHTML(str: string) {
    if (!str) return "";
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
}

// Next.js 15: params must be awaited
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    // Extract ID from end of slug (e.g. "my-title-123" -> "123")
    const actualId = resolvedParams.id.split('-').pop() || resolvedParams.id;
    const news = await getNewsDetail(actualId);

    if (!news) {
        return (
            <main className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-se-jingga mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Berita Tidak Ditemukan</h1>
                    <p className="text-gray-500 mb-6">Maaf, berita yang Anda cari tidak tersedia atau terjadi kesalahan koneksi.</p>
                    <Link href="/berita" className="inline-flex items-center justify-center px-6 py-3 bg-se-jingga text-white font-bold rounded-xl hover:bg-se-jingga transition">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kembali ke Daftar
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7] pb-24 font-sans text-gray-900">
            {/* Header / Nav Back */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
                    <Link href="/berita" className="group flex items-center text-gray-600 hover:text-se-jingga transition font-medium px-4 py-2 rounded-lg hover:bg-orange-50">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Daftar Berita
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 md:px-0 mt-12">
                {/* Meta Header */}
                <div className="mb-8">
                    <span className="inline-flex items-center space-x-2 text-gray-500 font-medium text-sm bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{news.rl_date}</span>
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-8">
                        {news.title}
                    </h1>

                    {/* Featured Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={news.picture || "https://images.unsplash.com/photo-1544531586-fde5298cdd40"}
                        alt={news.title}
                        className="w-full h-auto aspect-video object-cover rounded-2xl shadow-2xl shadow-orange-500/10 mb-10"
                    />
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    {(() => {
                        // 1. Decode HTML Entities first (because BPS API returns escaped HTML)
                        const decodedNews = unescapeHTML(news.news || "");

                        // 2. Sanitize HTML
                        const cleanHTML = decodedNews
                            .replace(/style="[^"]*"/gi, '')
                            .replace(/style='[^']*'/gi, '')
                            .replace(/class="[^"]*"/gi, '')
                            .replace(/class='[^']*'/gi, '')
                            .replace(/<\/?font[^>]*>/gi, '')
                            .replace(/<span[^>]*>/gi, '<span>');

                        return (
                            <div
                                className="prose prose-lg md:prose-xl max-w-none text-se-hitam prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl mx-auto w-full"
                                dangerouslySetInnerHTML={{ __html: cleanHTML }}
                            />
                        );
                    })()}

                    {/* Footer Share */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 italic text-sm">
                            Sumber Resmi: <span className="font-semibold text-gray-700">Badan Pusat Statistik Provinsi Papua</span>
                        </p>
                        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-bold transition w-full md:w-auto">
                            <Share2 className="w-4 h-4" />
                            <span>Bagikan Berita</span>
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}
