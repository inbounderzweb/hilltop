'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import arrow_forward from "../../assets/dproducts/arrow_forward.svg"
import { Quicksand } from "next/font/google";
import { Loader2, Search, SlidersHorizontal, Package, Check, ChevronRight } from 'lucide-react';

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductListingPage({ initialCategory }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedColors, setSelectedColors] = useState(new Set()); // Empty = All Colors
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 9; // Increased for better layout

    // Initial Fetch for Categories and Colors (static-ish data)
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [catRes, colRes] = await Promise.all([
                    fetch('/api/categories?t=' + Date.now()),
                    fetch('/api/variations/options?type=color&t=' + Date.now())
                ]);
                const [catData, colData] = await Promise.all([catRes.json(), colRes.json()]);

                if (catData.success) setCategories(catData.categories.map(c => c.name));
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
            const matchesQuery = !q || p.product_name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
            const matchesCategory = !categoryFilteringOn || selectedCategories.has(p.category);
            const matchesColor = !colorFilteringOn || selectedColors.has(p.color_family);
            return matchesQuery && matchesCategory && matchesColor;
        });
    }, [products, query, selectedCategories, selectedColors]);

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
        <div className={`min-h-screen bg-[#1b1b1b] text-white pb-20 ${quicksand.className}`}>
            <div className="mx-auto w-[95%] xl:w-[85%] px-4">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Collection</h2>
                        <p className="text-white/40 max-w-xl">
                            Browse our exquisite selection of natural stones curated from across the globe.
                            Showing <span className="text-[#eba14d] font-semibold">{filtered.length}</span> products.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#eba14d] transition-colors" size={20} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search stones..."
                            className="w-full bg-[#222222] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 outline-none focus:border-[#eba14d] focus:ring-1 focus:ring-[#eba14d]/20 transition-all"
                        />
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

                    {/* Sidebar Filters */}
                    <aside className="space-y-8">
                        {/* Categories */}
                        <div className="bg-[#222222] rounded-3xl p-6 border border-white/5">
                            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
                                <SlidersHorizontal size={14} /> Categories
                            </h3>
                            <div className="space-y-2">
                                <FilterButton
                                    label="All Varieties"
                                    active={selectedCategories.size === 0}
                                    onClick={() => setSelectedCategories(new Set())}
                                />
                                {categories.map(cat => (
                                    <FilterButton
                                        key={cat}
                                        label={cat}
                                        active={selectedCategories.has(cat)}
                                        onClick={() => toggleSetValue(setSelectedCategories, cat)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="bg-[#222222] rounded-3xl p-6 border border-white/5">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Colors</h3>
                            <div className="grid grid-cols-1 gap-2">
                                <FilterButton
                                    label="All Colors"
                                    active={selectedColors.size === 0}
                                    onClick={() => setSelectedColors(new Set())}
                                />
                                {colors.map(color => (
                                    <FilterButton
                                        key={color}
                                        label={color}
                                        active={selectedColors.has(color)}
                                        onClick={() => toggleSetValue(setSelectedColors, color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="w-full py-4 text-xs font-bold uppercase tracking-widest text-[#eba14d] border border-[#eba14d]/20 rounded-2xl hover:bg-[#eba14d]/5 transition-all"
                        >
                            Reset All Filters
                        </button>
                    </aside>

                    {/* Main Grid */}
                    <main>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#222222]/30 rounded-[3rem] border border-white/5">
                                <Loader2 className="animate-spin text-[#eba14d] mb-4" size={48} />
                                <p className="text-white/20 tracking-widest uppercase text-[10px] font-bold">Synchronizing Database...</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paged.map((p) => (
                                        <ProductCard key={p.id} product={p} />
                                    ))}
                                </div>

                                {filtered.length === 0 && (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#222222]/30 rounded-[3rem] border border-white/5 px-6 text-center">
                                        <div className="bg-white/5 p-6 rounded-full mb-6">
                                            <Package className="text-white/10" size={40} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">No Matching Stones Found</h3>
                                        <p className="text-white/30 text-sm max-w-xs">
                                            Try broadening your search or choosing a different color/category combination.
                                        </p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex items-center justify-center gap-2">
                                        <PaginationButton
                                            icon="‹"
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={safePage === 1}
                                        />

                                        <div className="flex gap-2">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setPage(i + 1)}
                                                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${safePage === i + 1
                                                            ? 'bg-[#eba14d] text-black shadow-lg shadow-[#eba14d]/20'
                                                            : 'bg-[#222222] text-white/40 hover:text-white border border-white/5'
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <PaginationButton
                                            icon="›"
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={safePage === totalPages}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

function FilterButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${active
                    ? 'bg-[#eba14d]/10 border-[#eba14d]/30 text-[#eba14d]'
                    : 'bg-transparent border-transparent text-white/40 hover:bg-white/5 hover:text-white'
                }`}
        >
            <span className="text-sm font-medium">{label}</span>
            {active && <Check size={16} />}
        </button>
    )
}

function PaginationButton({ icon, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-12 h-12 rounded-2xl bg-[#222222] text-white/40 hover:text-white border border-white/5 disabled:opacity-20 transition-all flex items-center justify-center font-bold text-xl"
        >
            {icon}
        </button>
    )
}

function ProductCard({ product }) {
    return (
        <Link href={`/products/details/${product.id}`} className="group h-full">
            <div className="bg-[#222222] border border-white/5 rounded-[2.5rem] p-4 h-full hover:border-[#eba14d]/40 hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 flex flex-col">
                <div className="relative w-full aspect-[11/10] overflow-hidden rounded-[2rem] bg-[#1a1a1a]">
                    <Image
                        src={product.image_url}
                        alt={product.product_name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#eba14d]">{product.category}</span>
                    </div>
                </div>

                <div className="mt-6 flex-1 px-2 pb-2 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#eba14d] transition-colors line-clamp-1 mb-2">
                            {product.product_name}
                        </h3>
                        <div className="flex items-center gap-4 text-white/30 text-[11px] font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#eba14d]" /> {product.origin}</span>
                            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> {product.color_family}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-[#eba14d] transition-colors">View Details</span>
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#eba14d] group-hover:text-black transition-all group-hover:rotate-45">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}