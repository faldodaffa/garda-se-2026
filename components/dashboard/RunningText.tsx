"use client";

import React, { useEffect, useState } from 'react';
import { Bell, AlertCircle } from 'lucide-react';

export default function RunningText() {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/site-content')
            .then(res => res.json())
            .then(data => {
                if (data.runningText && data.runningText.items) {
                    setItems(data.runningText.items);
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="bg-[#231F20] text-white overflow-hidden py-2 relative z-50 border-b border-white/10 shadow-md">
            <div className="container mx-auto flex items-center">
                {/* Label */}
                <div className="flex items-center px-4 z-20 bg-[#231F20] shadow-[10px_0_20px_#231F20]">
                    <span className="flex h-2 w-2 relative mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-red-400">Live Updates</span>
                </div>

                {/* Marquee Content */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 text-sm font-medium text-gray-300">
                        {items.map((item, index) => (
                            <span key={index} className="flex items-center">
                                {item.icon === 'AlertCircle' ? <AlertCircle className="w-3 h-3 mr-2 text-blue-400" /> : <Bell className={`w-3 h-3 mr-2 ${item.color === 'yellow' ? 'text-yellow-500' : 'text-green-500'}`} />}
                                {item.text}
                                {item.subtext && <span className="text-white ml-1 font-bold">{item.subtext}</span>}
                            </span>
                        ))}
                        <span className="text-gray-500">|</span>
                        <span className="italic text-gray-400">Garda Sensus Ekonomi 2026 - BPS Provinsi Papua</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
