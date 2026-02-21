"use client";

import React, { useState } from 'react';
import { Search, Bell, QrCode, Menu } from 'lucide-react';
import QRCodeModal from './QRCodeModal';
import VisitorCounter from './VisitorCounter';
import CountdownTimer from './CountdownTimer';

export default function Header() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
                {/* Branding Lockup */}
                <div className="flex items-center space-x-4 mr-8">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">
                            GARDA SE2026
                        </h1>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">BPS Provinsi Papua</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-auto hidden md:flex items-center space-x-4">
                    <div className="relative group w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200/50 rounded-xl leading-5 bg-white/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary/30 focus:border-primary/30 sm:text-sm transition-all shadow-sm backdrop-blur-sm"
                            placeholder="Cari dokumen, data, atau menu..."
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="ml-4 flex items-center space-x-3">
                    <div className="hidden xl:block transform scale-90 origin-right">
                        <CountdownTimer compact={true} />
                    </div>

                    <VisitorCounter />

                    <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

                    <button
                        onClick={() => setIsQRModalOpen(true)}
                        className="p-2 rounded-full hover:bg-white/80 hover:shadow-md transition-all text-gray-600 hover:text-primary tooltip-trigger border border-transparent hover:border-gray-100"
                        title="Show QR Code"
                    >
                        <QrCode className="w-5 h-5" />
                    </button>

                    <button className="p-2 rounded-full hover:bg-white/80 hover:shadow-md transition-all relative border border-transparent hover:border-gray-100">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>
                </div>
            </header>

            <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
        </>
    );
}
