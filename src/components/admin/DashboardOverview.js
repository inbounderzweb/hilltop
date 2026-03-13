"use client";

import React, { useEffect, useState } from 'react';
import { Package, Layers, Palette, Loader2, ArrowRight, BookOpen } from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
    const [stats, setStats] = useState({ products: 0, categories: 0, variations: 0, blogs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats?t=' + Date.now());
                const data = await res.json();
                if (data.success) {
                    setStats(data.counts);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Products",
            value: stats.products,
            icon: <Package className="text-[#eba14d]" size={24} />,
            tab: 'product-list',
            label: "Products"
        },
        {
            title: "Active Categories",
            value: stats.categories,
            icon: <Layers className="text-[#eba14d]" size={24} />,
            tab: 'add-category',
            label: "Categories"
        },
        {
            title: "Color Variations",
            value: stats.variations,
            icon: <Palette className="text-[#eba14d]" size={24} />,
            tab: 'variations',
            label: "Variations"
        },
        {
            title: "Blog Stories",
            value: stats.blogs,
            icon: <BookOpen className="text-[#eba14d]" size={24} />,
            tab: 'blogs-list',
            label: "Blogs"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(card.tab)}
                        className="group relative bg-[#151515] hover:bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-[#eba14d]/30 transition-all duration-500 shadow-2xl text-left overflow-hidden flex flex-col min-h-[130px]"
                    >
                        {/* Background Decor */}
                        {/* <div className="absolute -right-2 -top-2 text-white/5 group-hover:text-[#eba14d]/5 transition-colors duration-500 transform group-hover:scale-110">
                            {React.cloneElement(card.icon, { size: 60 })}
                        </div> */}

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-auto">
                                <div className="p-1.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-[#eba14d]/20 transition-all">
                                    {React.cloneElement(card.icon, { size: 14, className: "text-white/40 group-hover:text-[#eba14d] transition-colors" })}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={12} className="text-[#eba14d]" />
                                </div>
                            </div>

                            <div className="mt-2.5">
                                <div className="text-xl font-bold text-white tracking-tight leading-none mb-1">
                                    {loading ? (
                                        <div className="h-5 w-8 bg-white/5 animate-pulse rounded" />
                                    ) : (
                                        card.value
                                    )}
                                </div>
                                <div className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em] leading-none">
                                    {card.title}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Decor */}
                        <div className="absolute bottom-0 left-0 h-[2px] bg-[#eba14d]/20 w-full">
                            <div className="h-full bg-[#eba14d] w-0 group-hover:w-full transition-all duration-700 ease-out" />
                        </div>
                    </button>
                ))}
            </div>

            {/* Quick Actions / Getting Started (Placeholder for future) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
                <div className="lg:col-span-2 bg-[#151515] border border-white/5 rounded-xl p-6">
                    <div className="text-white font-bold text-sm mb-1">Inventory Health</div>
                    <div className="text-white/20 text-[10px] font-medium mb-4">Manage your slabs and categories to keep your catalogue up to date.</div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs font-medium">Database Synced</span>
                            </div>
                            <span className="text-[9px] font-bold text-white/30 uppercase">Just Now</span>
                        </div>
                        <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#eba14d]" />
                                <span className="text-xs font-medium">Active Categories</span>
                            </div>
                            <span className="text-[9px] font-bold text-white/30 uppercase">{stats.categories} Total</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#eba14d]/10 border border-[#eba14d]/10 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Palette size={80} className="text-[#eba14d]" />
                    </div>
                    <div className="text-[#eba14d] font-bold text-sm mb-1">Customization</div>
                    <div className="text-[#eba14d]/60 text-[10px] font-medium mb-5 leading-relaxed">
                        Add new variations and color families to provide more choices to your customers.
                    </div>
                    <button
                        onClick={() => setActiveTab('variations')}
                        className="bg-[#eba14d] text-black text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-lg hover:brightness-110 transition mt-auto"
                    >
                        Configure Now
                    </button>
                </div>
            </div>
        </div>
    );
}
