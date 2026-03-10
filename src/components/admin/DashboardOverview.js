"use client";

import React, { useEffect, useState } from 'react';
import { Package, Layers, Palette, Loader2, ArrowRight } from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
    const [stats, setStats] = useState({ products: 0, categories: 0, variations: 0 });
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
        }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-semibold tracking-wide text-white">
                    Dashboard Overview
                </h1>
                {loading && <Loader2 size={24} className="animate-spin text-[#eba14d]" />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {statCards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(card.tab)}
                        className="bg-[#222222] p-8 rounded-3xl border border-white/5 hover:border-[#eba14d]/40 transition-all shadow-xl group text-left relative overflow-hidden flex flex-col justify-between"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>

                        <div>
                            <div className="bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-[#eba14d]/10 transition-colors">
                                {card.icon}
                            </div>
                            <h3 className="text-white/50 text-sm font-medium uppercase tracking-widest mb-2">{card.title}</h3>
                            <p className="text-5xl font-bold text-white group-hover:text-[#eba14d] transition-colors leading-none">
                                {loading ? "..." : card.value}
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/30 group-hover:text-[#eba14d] transition-colors">
                            Manage {card.label}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
