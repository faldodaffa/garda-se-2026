"use client";

import React from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
    const [viewCount, setViewCount] = React.useState<number | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // TODO: TIM IT - Masukkan API Hitung Kunjungan di sini
        const fetchVisitorCount = async () => {
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                // Mock data
                setViewCount(1245);
            } catch (error) {
                console.error("Failed to fetch visitor count", error);
                setViewCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVisitorCount();
    }, []);

    return (
        <div className="hidden md:flex items-center space-x-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm text-sm font-medium text-gray-700">
            <Eye className="w-4 h-4 text-primary" />
            {isLoading ? (
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <span>{viewCount?.toLocaleString()} Total Kunjungan</span>
            )}
        </div>
    );
}
