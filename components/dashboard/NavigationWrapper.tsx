"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function NavigationWrapper() {
    const pathname = usePathname();
    // Show Sidebar strictly for /admin routes
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <Sidebar />;
    }

    return <Navbar />;
}
