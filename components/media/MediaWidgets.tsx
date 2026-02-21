import React from 'react';
import { Youtube, Instagram } from 'lucide-react';

export default function MediaWidgets() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* YouTube Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-red-600 p-4 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                        <Youtube className="w-6 h-6" />
                        <span className="font-semibold">BPS Provinsi Papua</span>
                    </div>
                    <span className="text-xs bg-white/20 py-1 px-3 rounded-full">Subscribe</span>
                </div>
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative group cursor-pointer">
                    <div className="absolute w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                    <p className="absolute bottom-4 left-4 text-gray-500 text-sm">Feature Video Placeholder</p>
                </div>
            </div>

            {/* Instagram Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                        <Instagram className="w-6 h-6" />
                        <span className="font-semibold">@bpspapua</span>
                    </div>
                    <span className="text-xs bg-white/20 py-1 px-3 rounded-full">Follow</span>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
