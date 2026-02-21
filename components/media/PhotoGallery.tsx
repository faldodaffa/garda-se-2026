import React from 'react';

export default function PhotoGallery() {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-1 bg-primary rounded-full mr-3"></span>
                Galeri Kegiatan
            </h2>
            <div className="columns-1 md:columns-3 gap-4 space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group cursor-pointer">
                        <div className={`bg-gray-200 w-full ${i % 2 === 0 ? 'h-64' : 'h-48'} flex items-center justify-center`}>
                            <span className="text-gray-400">Photo {i}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p className="text-white text-sm font-medium">Kegiatan Sosialisasi SE2026</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
