"use client";

import HeroAppleScroll from "@/components/visuals/HeroAppleScroll";
import dynamic from "next/dynamic";

const BentoGrid = dynamic(() => import('@/components/dashboard/BentoGrid'), { ssr: false });
const MediaCenter = dynamic(() => import('@/components/dashboard/MediaCenter'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col bg-[#FFFBEE]">

      {/* 1. Hero Section */}
      <section className="relative w-full z-10">
        <HeroAppleScroll />
      </section>

      {/* 2. Akses Cepat Petugas (Bento Grid) + Elegant Dot Pattern Background */}
      <section className="relative z-20 w-full py-20 md:py-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="relative flex flex-col items-center justify-center mb-12 md:mb-16 px-4 max-w-7xl mx-auto text-center z-10">
          <div className="h-1.5 w-20 md:w-24 bg-gradient-to-r from-se-jingga to-orange-500 rounded-full mb-6 md:mb-8 shadow-sm"></div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            Akses Cepat Petugas
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Semua dokumen, pedoman, dan format administrasi Sensus Ekonomi 2026 terpusat di sini.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <BentoGrid />
        </div>
      </section>

      {/* 3. Media Center */}
      <section className="relative w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] pb-24 pt-20 md:pt-28 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] z-30">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16 px-4 max-w-7xl mx-auto text-center">
          <div className="h-1.5 w-20 md:w-24 bg-gradient-to-r from-red-500 to-rose-600 rounded-full mb-6 md:mb-8 shadow-sm"></div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            Media Center
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Kabar terbaru, rilis pers, dan galeri dokumentasi kegiatan lapangan SE2026 BPS Provinsi Papua.
          </p>
        </div>
        <MediaCenter />
      </section>

    </div>
  );
}
