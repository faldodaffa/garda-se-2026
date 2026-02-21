import React from 'react';
import MediaWidgets from '@/components/media/MediaWidgets';
import PhotoGallery from '@/components/media/PhotoGallery';
import NewsPortal from '@/components/media/NewsPortal';

export default function MediaUpdatesPage() {
    return (
        <div className="container mx-auto p-6 space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Media & Updates</h1>
                <p className="text-gray-600">Portal berita terkini dan galeri kegiatan BPS Provinsi Papua.</p>
            </div>

            <MediaWidgets />
            <NewsPortal />
            <PhotoGallery />
        </div>
    );
}
