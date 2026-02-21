"use client";

import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from '../dashboard/CountdownTimer';
import Link from 'next/link';

export default function HeroAppleScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation States
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [textOpacity, setTextOpacity] = useState(1);
    const [textTranslateY, setTextTranslateY] = useState(0);

    const frameCount = 120; // Total Apple frames configured

    // 1. Progressive Loading / Lazy Sequence (FCP < 1 Detik)
    useEffect(() => {
        let isMounted = true;

        const preloadSequence = async () => {
            // A. MUAT FRAME PERTAMA (BLOCKING SECARA KILAT HANYA UNTUK FRAME 1)
            const firstImg = new Image();
            firstImg.src = `/sequence/ezgif-frame-001.jpg`;
            await new Promise((resolve) => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve; // Lanjut meski error
            });

            if (!isMounted) return;

            // Inisialisasi array kosong sepanjang 120 slot dan isi index 0
            const initialImages = new Array(frameCount);
            initialImages[0] = firstImg;
            setImages(initialImages);

            // BEBAS TUGAS: Matikan layar loading SEKARANG JUGA setelah frame 1 siap
            setIsLoaded(true);

            // B. SISA FRAME DILOAD DIAM-DIAM DI BACKGROUND (NON-BLOCKING)
            for (let i = 2; i <= frameCount; i++) {
                if (!isMounted) break;

                const img = new Image();
                const formattedIndex = i.toString().padStart(3, '0');

                // Gunakan callback onload untuk mengupdate state secara bertahap tanpa memblokir
                img.onload = () => {
                    if (isMounted) {
                        setImages((prev) => {
                            const newArr = [...prev];
                            newArr[i - 1] = img;
                            return newArr;
                        });
                    }
                };

                // Trigger fetch dari server
                img.src = `/sequence/ezgif-frame-${formattedIndex}.jpg`;
            }
        };

        preloadSequence();
        return () => { isMounted = false; };
    }, []);

    // 2. Mathematical Scroll Fraction & Parallax
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            // Dapatkan posisi elemen secara absolut terhadap layar/mata pengguna
            const rect = containerRef.current.getBoundingClientRect();

            // Berapa piksel elemen ini sudah tersapu ke atas melewati layar?
            const scrollDistance = -rect.top;

            // Total jarak aman yang bisa digulir
            const scrollableHeight = rect.height - window.innerHeight;

            // Hitung persentase absolut (0.0 hingga 1.0)
            let rawProgress = scrollDistance / scrollableHeight;
            rawProgress = Math.max(0, Math.min(1, rawProgress)); // Kunci (Clamp)

            // RADICAL MULTIPLIER: Selesaikan animasi saat baru mencapai 85% layar!
            const finalProgress = Math.min(1, rawProgress * 1.15);

            // Render Frame secara akurat (0 - 119)
            const nextFrameIndex = Math.min(frameCount - 1, Math.floor(finalProgress * frameCount));
            setCurrentFrameIndex(nextFrameIndex);

            // --- PERBAIKAN KOREOGRAFI TEKS (EFEK TIRAI) ---
            // Teks menghilang kilat di 20% awal scroll
            const textOpacity = Math.max(0, 1 - (rawProgress * 5));

            // Teks JATUH ke bawah layar seperti pintu jebakan (angka positif besar)
            const textTranslateY = rawProgress * 1500;

            setTextOpacity(textOpacity);
            setTextTranslateY(textTranslateY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial setup trigger
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. Render Canvas dynamically synced to currentFrameIndex (Dengan Placeholder Aman)
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // PROGRESSIVE RENDER SAFEGUARD: Cari gambar target saat ini
        let targetImg = images[currentFrameIndex];

        // JIKA gambar target BELUM ada atau BELUM selesai didownload (complete),
        // telusuri mundur ke belakang untuk mencari gambar terakhir yang SUDAH lengkap.
        // Dengan ini kanvas TIDAK AKAN KOSONG/BLANK meskipun scroll mendahului download.
        if (!targetImg || !targetImg.complete) {
            for (let i = currentFrameIndex - 1; i >= 0; i--) {
                if (images[i] && images[i].complete) {
                    targetImg = images[i];
                    break;
                }
            }
        }

        // Render Frame yang paling stabil
        if (targetImg && targetImg.complete) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scale = Math.max(canvas.width / targetImg.width, canvas.height / targetImg.height);
            const x = (canvas.width / 2) - (targetImg.width / 2) * scale;
            const y = (canvas.height / 2) - (targetImg.height / 2) * scale;

            context.drawImage(targetImg, x, y, targetImg.width * scale, targetImg.height * scale);
        }
    }, [isLoaded, currentFrameIndex, images]);

    return (
        <div ref={containerRef} className="relative w-full h-[500vh] bg-[#fdfaf5] overflow-clip">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Static Background Fallback (Instantly visible while the 120-frame canvas loads in parallel) */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url('/sequence/ezgif-frame-001.jpg')`,
                        opacity: isLoaded ? 0 : 1 // Fade out cleanly when canvas takes over
                    }}
                />

                {/* Canvas Animasi (Berjalan dari frame 1 penuh) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
                    style={{ opacity: isLoaded ? 1 : 0 }}
                />

                {/* Subdued Loading Indicator Overlay (Non-blocking) */}
                {!isLoaded && (
                    <div className="absolute top-8 right-8 flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm z-50">
                        <div className="w-4 h-4 border-2 border-[#f79039] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[#f79039] text-xs font-bold tracking-widest uppercase">Memuat Visual...</span>
                    </div>
                )}

                {/* Overlay Gelap Tipis agar Canvas tidak terlalu menyilaukan */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Pembungkus Absolut Teks (NO UI BLOCKING - RENDERS INSTANTLY) */}
                <div
                    className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center px-4 md:px-8 z-10"
                    style={{
                        opacity: textOpacity,
                        transform: `translateY(${textTranslateY}px)`
                    }}
                >
                    {/* Kotak Glassmorphism */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/60 p-5 md:p-8 text-center w-[92%] md:w-full max-w-4xl mx-auto flex flex-col items-center">

                        {/* Pulsing Live Badge */}
                        <div className="flex items-center space-x-2 px-3 md:px-4 py-1.5 bg-red-50 text-red-600 font-bold tracking-widest text-[10px] md:text-sm rounded-full mb-3 md:mb-6 border border-red-200 shadow-sm">
                            <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                            <span>PELAKSANAAN 2026</span>
                        </div>

                        {/* High Trust CRO Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight drop-shadow-sm mb-3">
                            Portal Resmi <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f79039] to-orange-500">
                                Garda SE2026
                            </span>
                        </h1>

                        <h2 className="text-sm md:text-lg font-bold text-slate-600 mb-5 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                            Pusat Komando & Informasi Pelaksanaan Sensus Ekonomi BPS Provinsi Papua.
                        </h2>

                        {/* Wadah Countdown */}
                        <div className="w-full bg-slate-900/5 rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-900/10 backdrop-blur-sm mb-6">
                            <CountdownTimer />
                        </div>

                        {/* CRO UI: High Conversion Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full justify-center">
                            <Link
                                href="/monitoring"
                                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-se-jingga to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base text-center"
                            >
                                Pantau Progres Lapangan
                            </Link>
                            <Link
                                href="/dokumen"
                                className="w-full sm:w-auto px-8 py-3.5 bg-white/80 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 text-sm md:text-base text-center"
                            >
                                Akses Dokumen Resmi
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
