"use client";

import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    useEffect(() => {
        // Easter Egg hanya dijalankan sekali di client-side
        console.log(
            "%c🚀 Portal Garda SE2026",
            "font-size: 24px; font-weight: 900; color: #f79039; text-shadow: 2px 2px 0px #231F20;"
        );
        console.log(
            "%cArchitected & Developed by: @faldodaffa",
            "font-size: 14px; font-weight: bold; color: #10B981;"
        );
        console.log(
            "%cAI Pair Programmers: Google Gemini & Google Anti Gravity",
            "font-size: 12px; font-style: italic; color: #64748B;"
        );
        console.log("--------------------------------------------------");
    }, []);

    return (
        <footer className="bg-[#231F20] text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-default">
                    {/* Left: 3 Logos */}
                    <div className="lg:col-span-7 flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 items-center w-full">
                        <img
                            src="/images/logo-footer-1.png"
                            alt="Logo Footer 1"
                            className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                        />
                        <img
                            src="/images/logo-footer-2.png"
                            alt="Logo Footer 2"
                            className="h-10 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                        />
                        <img
                            src="/images/logo-footer-3.png"
                            alt="Logo Footer 3"
                            className="h-10 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Right: Official Address Exact Text */}
                    <div className="lg:col-span-5 text-sm text-gray-300 md:text-left text-center flex flex-col items-center md:items-start space-y-1">
                        <p className="font-bold">Badan Pusat Statistik Provinsi Papua</p>
                        <p>(BPS-Statistics of Papua Province)</p>
                        <p>Jl. Dr. Sam Ratulangi Dok II Jayapura 99112</p>
                        <p>Telp. (0967) 5165 999; 5165 107</p>
                        <p>Hp : 0821 24 535 535 | Email : se.9400@bps.go.id</p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; 2026 BPS Provinsi Papua. All rights reserved.</p>
                    <Link href="/admin/login" className="mt-4 md:mt-0 flex items-center text-gray-400 hover:text-se-jingga transition-colors">
                        <Lock className="w-3 h-3 mr-1" /> Admin Login
                    </Link>
                </div>
            </div>
        </footer>
    );
}
