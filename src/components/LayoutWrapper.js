'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <Footer />}
        </>
    );
}
