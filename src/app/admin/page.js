'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import DashboardOverview from '@/components/admin/DashboardOverview';
import AddProductForm from '@/components/admin/AddProductForm';
import AddCategoryForm from '@/components/admin/AddCategoryForm';
import ProductsList from '@/components/admin/ProductsList';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [categories, setCategories] = useState(['Marble', 'Granite', 'Quartzite', 'Onyx']);

    useEffect(() => {
        // Check cookie on mount
        const hasAuthCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('admin_auth='))
            ?.split('=')[1];

        if (hasAuthCookie === 'true') {
            setIsAuthenticated(true);
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
        router.push('/admin/login');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#eba14d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1b1b1b] text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#222222] border-r border-white/10 p-6 flex flex-col shrink-0 min-h-fit md:min-h-screen">
                <div className="mb-10 lg:text-center">
                    <h1 className="text-2xl font-semibold tracking-wide text-[#eba14d]">Hilltop Admin</h1>
                </div>

                <nav className="flex-1 flex flex-row md:flex-col gap-2 overflow-x-auto whitespace-nowrap mb-6 md:mb-0">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`text-left px-4 py-3 rounded-xl transition duration-300 md:w-full ${activeTab === 'dashboard' ? 'bg-[#eba14d] text-black font-semibold shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('add-product')}
                        className={`text-left px-4 py-3 rounded-xl transition duration-300 md:w-full ${activeTab === 'add-product' ? 'bg-[#eba14d] text-black font-semibold shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                        Add Product
                    </button>
                    <button
                        onClick={() => setActiveTab('add-category')}
                        className={`text-left px-4 py-3 rounded-xl transition duration-300 md:w-full ${activeTab === 'add-category' ? 'bg-[#eba14d] text-black font-semibold shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveTab('product-list')}
                        className={`text-left px-4 py-3 rounded-xl transition duration-300 md:w-full ${activeTab === 'product-list' ? 'bg-[#eba14d] text-black font-semibold shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                        Products List
                    </button>
                </nav>

                <div className="mt-auto hidden md:block">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-6 py-3 rounded-xl transition-all font-medium text-sm shadow-md w-full text-center"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {/* Mobile logout header */}
                <div className="flex md:hidden justify-end mb-6">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl transition-all font-medium text-sm"
                    >
                        Logout
                    </button>
                </div>

                <div className="max-w-6xl mx-auto">
                    {activeTab === 'dashboard' && <DashboardOverview />}
                    {activeTab === 'add-product' && <AddProductForm onSwitchTab={setActiveTab} categories={categories} />}
                    {activeTab === 'add-category' && <AddCategoryForm categories={categories} setCategories={setCategories} />}
                    {activeTab === 'product-list' && <ProductsList />}
                </div>
            </main>
        </div>
    );
}

// Remainder of file intentionally left empty since sub-components have been extracted.
