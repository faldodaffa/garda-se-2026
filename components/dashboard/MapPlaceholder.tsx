"use client";

import React from 'react';
import { Map } from 'lucide-react';

export default function MapPlaceholder() {
    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/40 shadow-sm h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Map className="w-5 h-5 mr-2 text-primary" />
                Wilayah Tugas
            </h2>
            <div className="flex-1 bg-blue-50/50 rounded-xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-8 relative overflow-hidden group">

                {/* Animated pulsing circle representing active data activity */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 bg-primary/5 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 delay-300">
                    <div className="w-24 h-24 bg-secondary/10 rounded-full animate-ping"></div>
                </div>

                <p className="text-center font-semibold text-gray-500 relative z-10">
                    Peta Interaktif Provinsi Papua
                </p>
                <p className="text-center text-xs text-gray-400 mt-2 max-w-xs relative z-10">
                    Visualisasi wilayah kerja, progres pendataan, dan sebaran petugas akan ditampilkan di sini.
                </p>

                <button className="mt-6 px-4 py-2 bg-white text-primary text-sm font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors relative z-10">
                    Buka Peta Fullscreen
                </button>
            </div>
        </div>
    );
}
