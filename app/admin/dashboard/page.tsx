"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, LayoutDashboard, Database, Link as LinkIcon, Youtube } from 'lucide-react';

// Modular Components (Phase 42)
import BentoLinkManager from '@/components/admin/BentoLinkManager';
import YouTubeManager from '@/components/admin/YouTubeManager';
import MonitoringConfig from '@/components/admin/MonitoringConfig';

function AdminDashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get('tab') || 'dashboard';

    const tabs = [
        { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
        { id: 'bento', label: 'Kelola Tautan', icon: LinkIcon },
        { id: 'youtube', label: 'Video YouTube', icon: Youtube },
        { id: 'monitoring', label: 'API Monitoring', icon: Database },
    ];

    // Simple Render Switcher
    const renderActiveTab = () => {
        switch (tab) {
            case 'bento':
                return <BentoLinkManager />;
            case 'youtube':
                return <YouTubeManager />;
            case 'monitoring':
                return <MonitoringConfig />;
            case 'dashboard':
            default:
                return (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[500px]">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                            <LayoutDashboard className="w-10 h-10 text-se-jingga" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang di CMS Garda</h2>
                        <p className="text-gray-500 max-w-md">
                            Pusat kendali Sistem Eksekutif Sensus Ekonomi 2026. Pilih menu di samping untuk mulai mengelola konten dan sinkronisasi API.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10 h-full w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {tabs.find(t => t.id === tab)?.label || 'Dashboard'}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">Pusat Kendali Garda SE2026</p>
                </div>
            </div>

            {/* Mobile Horizontal Navigation Tabs (Visible only on very small screens if sidebar is hidden) */}
            <div className="md:hidden flex space-x-2 overflow-x-auto pb-2 custom-scrollbar shrink-0">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => router.push(`/admin/dashboard?tab=${t.id}`)}
                        className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap shadow-sm border ${tab === t.id
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <t.icon className="w-4 h-4 mr-2" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 w-full relative">
                {renderActiveTab()}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="animate-spin w-10 h-10 text-se-jingga" />
            </div>
        }>
            <AdminDashboardContent />
        </Suspense>
    );
}
