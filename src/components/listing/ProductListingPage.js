'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Quicksand } from "next/font/google";
import { Loader2, Search, SlidersHorizontal, Package, Check, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductListingPage({ initialCategory, allowedCategories }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedColors, setSelectedColors] = useState(new Set()); // Empty = All Colors
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10; // Increased for better layout

    // Initial Fetch for Categories and Colors (static-ish data)
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [catRes, colRes] = await Promise.all([
                    fetch('/api/categories?t=' + Date.now()),
                    fetch('/api/variations/options?type=color&t=' + Date.now())
                ]);
                const [catData, colData] = await Promise.all([catRes.json(), colRes.json()]);

                if (catData.success) {
                    let fetchedCats = catData.categories.map(c => c.name);
                    if (allowedCategories) {
                        fetchedCats = fetchedCats.filter(c => allowedCategories.includes(c));
                    }
                    setCategories(fetchedCats);
                }
                if (colData.success) setColors(colData.options.map(o => o.value));
            } catch (err) {
                console.error("Failed to fetch filters", err);
            }
        };
        fetchMetadata();
    }, []);

    // Main Product Fetch & Sync with initialCategory
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/products?t=' + Date.now());
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

        // Handle URL Param Sync
        if (initialCategory) {
            const decoded = decodeURIComponent(initialCategory);
            setSelectedCategories(new Set([decoded]));
        } else {
            setSelectedCategories(new Set()); // Reset to All if no param
        }
    }, [initialCategory]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const categoryFilteringOn = selectedCategories.size > 0;
        const colorFilteringOn = selectedColors.size > 0;

        return products.filter((p) => {
            const isAllowed = allowedCategories ? allowedCategories.includes(p.category) : true;
            const matchesQuery = !q || p.product_name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
            const matchesCategory = !categoryFilteringOn || selectedCategories.has(p.category);
            const matchesColor = !colorFilteringOn || selectedColors.has(p.color_family);
            return matchesQuery && matchesCategory && matchesColor && isAllowed;
        }).sort((a, b) => a.product_name.localeCompare(b.product_name));
    }, [products, query, selectedCategories, selectedColors, allowedCategories]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(Math.max(1, page), totalPages);

    const paged = useMemo(() => {
        const start = (safePage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, safePage]);

    const toggleSetValue = (setState, value) => {
        setState((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    const resetFilters = () => {
        setQuery('');
        setSelectedCategories(new Set());
        setSelectedColors(new Set());
        setPage(1);
    };

    useEffect(() => {
        setPage(1);
    }, [query, selectedCategories, selectedColors]);

    return (
        <div className="min-h-screen bg-[#151515] text-white py-14 md:py-20">
            <div className="mx-auto w-[92%] xl:w-[85%] max-w-[1400px]">

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">

                    {/* Sidebar Filters */}
                    <aside className="bg-[#222222] rounded-xl p-8 h-fit space-y-10">
                        {/* Search */}
                        <div className="space-y-4">
                            <h3 className={`text-white text-base font-bold ${quicksand.className}`}>Search</h3>
                            <div className="relative group">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Marble, Granite, Quartz..."
                                    className={`w-full bg-black/20 placeholder:text-white border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#DA9C39] outline-none transition-all duration-700 ease-out ${quicksand.className}`}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="space-y-6">
                            <h3 className={`text-white text-base font-bold ${quicksand.className}`}>Categories</h3>
                            <div className="space-y-4">
                                <CheckboxItem
                                    label="All"
                                    active={selectedCategories.size === 0}
                                    onClick={() => setSelectedCategories(new Set())}
                                />
                                {categories.map(cat => (
                                    <CheckboxItem
                                        key={cat}
                                        label={cat}
                                        active={selectedCategories.has(cat)}
                                        onClick={() => toggleSetValue(setSelectedCategories, cat)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10"></div>

                        {/* Colour */}
                        <div className="space-y-6">
                            <h3 className={`text-white text-base font-bold ${quicksand.className}`}>Colour</h3>
                            <div className="space-y-4">
                                <CheckboxItem
                                    label="All"
                                    active={selectedColors.size === 0}
                                    onClick={() => setSelectedColors(new Set())}
                                />
                                {colors.map(color => (
                                    <CheckboxItem
                                        key={color}
                                        label={color}
                                        active={selectedColors.has(color)}
                                        onClick={() => toggleSetValue(setSelectedColors, color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center min-h-[500px]">
                                <Loader2 className="animate-spin text-[#DA9C39] mb-4" size={48} />
                                <p className={`text-white/40 tracking-widest uppercase text-xs font-bold ${quicksand.className}`}>Loading Products...</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-y-12 gap-x-8">
                                    {paged.map((p) => (
                                        <Link key={p.id} href={`/products/details/${p.id}`} className="group block">
                                            {/* <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-6"> */}
                                            <div className="relative aspect-2/1 rounded-xl overflow-hidden mb-6">
                                                <Image
                                                    src={p.image_url}
                                                    alt={p.product_name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform duration-1000 ease-out">
                                                <span className={`text-white text-lg font-normal ${quicksand.className}`}>
                                                    {p.product_name}
                                                </span>
                                                <ArrowRight size={18} className="text-white" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {filtered.length === 0 && (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                                        <Package className="text-white/10 mb-6" size={60} />
                                        <h3 className={`text-2xl font-normal ${quicksand.className}`}>No Products Found</h3>
                                        <p className={`text-white/40 mt-2 ${quicksand.className}`}>Try adjusting your filters or search keywords.</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-8 pt-10">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={safePage === 1}
                                            className="flex items-center gap-2 text-white/70 hover:text-[#DA9C39] disabled:opacity-30 transition-all duration-700"
                                        >
                                            <ChevronLeft size={18} />
                                            <span className="text-[14px]">Previous page</span>
                                        </button>

                                        <div className="flex items-center gap-6">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setPage(i + 1)}
                                                    className={`text-[14px] transition-all duration-700 font-serif ${safePage === i + 1
                                                        ? 'text-[#DA9C39] font-bold'
                                                        : 'text-white/30 hover:text-white'
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={safePage === totalPages}
                                            className="flex items-center gap-2 text-white/70 hover:text-[#DA9C39] disabled:opacity-30 transition-all duration-700"
                                        >
                                            <span className="text-[14px]">Next page</span>
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

function CheckboxItem({ label, active, onClick }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <div
                onClick={onClick}
                className={`w-4 h-4 rounded border transition-all duration-700 flex items-center justify-center ${active
                    ? 'bg-transparent border-[#DA9C39]'
                    : 'bg-transparent border-white/20 group-hover:border-white/40'
                    }`}
            >
                {active && <Check size={12} className="text-[#DA9C39] stroke-3" />}
            </div>
            <span
                onClick={onClick}
                className={`text-[15px] transition-colors duration-700 ${active ? 'text-white' : 'text-white/60 hover:text-white'} ${quicksand.className}`}
            >
                {label}
            </span>
        </label>
    )
}