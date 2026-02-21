"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Link as LinkIcon,
    Youtube,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Simple Auth Check
    useEffect(() => {
        const session = document.cookie.includes('admin_session=true');
        if (!session) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard?tab=dashboard' },
        { label: 'Bento Links (CSV)', icon: LinkIcon, href: '/admin/dashboard?tab=bento' },
        { label: 'YouTube Manager', icon: Youtube, href: '/admin/dashboard?tab=youtube' },
        { label: 'Monitoring Config', icon: Settings, href: '/admin/dashboard?tab=monitoring' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex bg-[#231F20] text-white flex-col transition-all duration-300 shadow-xl z-50",
                    isOpen ? "w-64" : "w-20"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-gray-800">
                    {isOpen ? (
                        <span className="font-extrabold text-xl tracking-tight text-se-jingga">CMS GARDA</span>
                    ) : (
                        <span className="font-extrabold text-xl text-se-jingga">G</span>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href}>
                            <div className="flex items-center p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer group">
                                <item.icon className="w-5 h-5" />
                                {isOpen && <span className="ml-3 font-medium text-sm">{item.label}</span>}
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition"
                    >
                        <LogOut className="w-5 h-5" />
                        {isOpen && <span className="ml-3 font-bold text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "md:hidden fixed inset-y-0 left-0 w-64 bg-[#231F20] text-white flex flex-col z-50 transform transition-transform duration-300 ease-in-out shadow-2xl",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-gray-800">
                    <span className="font-extrabold text-xl tracking-tight text-se-jingga">CMS GARDA</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="flex items-center p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer group">
                                <item.icon className="w-5 h-5" />
                                <span className="ml-3 font-medium text-sm">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="ml-3 font-bold text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Mobile Hamburger Trigger */}
                        <button
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-gray-500 text-xs md:text-sm font-medium hidden sm:block">BPS Provinsi Papua - Admin Control Panel</h2>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-se-jingga flex items-center justify-center text-white font-bold text-xs border border-orange-200 shadow-sm">
                            A
                        </div>
                        <span className="text-sm font-bold text-gray-700 hidden sm:block">Administrator</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
