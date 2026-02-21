"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRegionData, RegionData } from '@/data/regionData';

// Define Shapes
export interface SiteConfig {
    logos: {
        bps: string;
        se2026: string;
        berakhlak: string;
    };
    countdownTarget: string;
    bentoLinks: BentoLink[];
    monitoringData: RegionData[];
    socialEmbeds?: {
        youtube?: string;
        youtubePlaylist?: string[];
        instagram?: string;
    };
    monitoringConfig?: {
        embedCode?: string;
    };
}

export interface BentoLink {
    id: string;
    title: string;
    category: string;
    url: string;
    icon: string; // Icon name string to be looked up
    description?: string;
    badge?: string;
}

// Default State
const defaultConfig: SiteConfig = {
    logos: {
        bps: "/images/logo-bps.png",
        se2026: "/images/logo-se2026.png",
        berakhlak: "/images/logo-berakhlak.png"
    },
    countdownTarget: "2026-05-16T00:00:00",
    bentoLinks: [],
    monitoringData: initialRegionData,
    socialEmbeds: {
        youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        youtubePlaylist: [],
        instagram: ""
    }
};

// Context
const SiteConfigContext = createContext<{
    config: SiteConfig;
    refreshConfig: () => Promise<void>;
    isLoading: boolean;
}>({
    config: defaultConfig,
    refreshConfig: async () => { },
    isLoading: true
});

// Provider
export const SiteConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);
    const [isLoading, setIsLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            // In a real scenario, this would fetch from /api/site-content
            // For now, we merge API data with defaults
            const res = await fetch('/api/site-content');
            const data = await res.json();

            setConfig(prev => ({
                ...prev,
                ...data,
                // Ensure monitoringData is populated if not in API, fallback to static
                monitoringData: data.regionalProgress || initialRegionData
            }));
        } catch (error) {
            console.error("Failed to load site config:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    return (
        <SiteConfigContext.Provider value={{ config, refreshConfig: fetchConfig, isLoading }}>
            {children}
        </SiteConfigContext.Provider>
    );
};

// Hook
export const useSiteConfig = () => useContext(SiteConfigContext);
