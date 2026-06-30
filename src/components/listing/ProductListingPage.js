'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Quicksand } from "next/font/google";
import { Loader2, Package, Check, ChevronRight, ChevronLeft, ArrowRight, Download, ArrowUpDown } from 'lucide-react';

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductListingPage({
    initialCategory,
    allowedCategories,
    showFilters = true,
    sectionTitle,
    sortMode = 'name',
    newArrivalsOnly = false,
}) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1, limit: 10 });

    const [query, setQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedColors, setSelectedColors] = useState(new Set()); // Empty = All Colors
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(sortMode);
    const PAGE_SIZE = 10; // Increased for better layout
    const safePage = pagination.page;

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
    }, [allowedCategories]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                params.set('page', String(page));
                params.set('limit', String(PAGE_SIZE));
                params.set('sort', sort);
                if (query.trim()) params.set('q', query.trim());
                if (selectedCategories.size > 0) params.set('category', [...selectedCategories].join(','));
                if (selectedColors.size > 0) params.set('color', [...selectedColors].join(','));
                if (allowedCategories?.length) params.set('allowedCategories', allowedCategories.join(','));
                if (newArrivalsOnly) params.set('newArrivalsOnly', 'true');

                const res = await fetch(`/api/products?${params.toString()}&t=${Date.now()}`, { signal: controller.signal });
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                    setPagination(data.pagination || { total: data.products.length, totalPages: 1, page: 1, limit: PAGE_SIZE });
                    if (data.pagination?.page && data.pagination.page !== page) {
                        setPage(data.pagination.page);
                    }
                }
            } catch (err) {
                if (err?.name === 'AbortError') return;
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        return () => controller.abort();
    }, [page, query, selectedCategories, selectedColors, sort, allowedCategories, newArrivalsOnly]);

    const toggleSetValue = (setState, value) => {
        setState((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
        setPage(1);
    };

    const resetFilters = () => {
        setQuery('');
        setSelectedCategories(new Set());
        setSelectedColors(new Set());
        setSort(sortMode);
        setPage(1);
    };

    const hasMountedPage = React.useRef(false);

    useEffect(() => {
        if (!hasMountedPage.current) {
            hasMountedPage.current = true;
            let initialSet = new Set();
            let initialRestored = false;

            if (initialCategory) {
                const decoded = decodeURIComponent(initialCategory);
                // The API categories might be fetched later, so we just use the decoded value.
                // We'll normalize it to uppercase if it's "spc" to match API "SPC"
                const normalized = decoded.toLowerCase() === 'spc' ? 'SPC' : decoded;
                initialSet.add(normalized);
                initialRestored = true;
            }

            if (!initialRestored) {
                try {
                    const prevUrl = sessionStorage.getItem('hilltop_products_url');
                    const currUrl = window.location.pathname;

                    if (prevUrl === currUrl) {
                        const savedPage = sessionStorage.getItem('hilltop_products_page');
                        if (savedPage) setPage(parseInt(savedPage, 10));

                        const savedQuery = sessionStorage.getItem('hilltop_products_query');
                        if (savedQuery) setQuery(savedQuery);

                        const savedCategories = sessionStorage.getItem('hilltop_products_categories');
                        if (savedCategories) {
                            initialSet = new Set(JSON.parse(savedCategories));
                            initialRestored = true;
                        }

                        const savedColors = sessionStorage.getItem('hilltop_products_colors');
                        if (savedColors) setSelectedColors(new Set(JSON.parse(savedColors)));

                        const savedSort = sessionStorage.getItem('hilltop_products_sort');
                        if (savedSort) setSort(savedSort);
                    }
                } catch (e) {
                    console.error("Failed to restore filters", e);
                }
            }

            setSelectedCategories(initialSet);
            sessionStorage.setItem('hilltop_products_url', window.location.pathname);

        } else {
            sessionStorage.setItem('hilltop_products_url', window.location.pathname);
            sessionStorage.setItem('hilltop_products_page', page.toString());
            sessionStorage.setItem('hilltop_products_query', query);
            sessionStorage.setItem('hilltop_products_categories', JSON.stringify([...selectedCategories]));
            sessionStorage.setItem('hilltop_products_colors', JSON.stringify([...selectedColors]));
            sessionStorage.setItem('hilltop_products_sort', sort);
        }
    }, [page, query, selectedCategories, selectedColors, sort, initialCategory]);

    // const categoryToBrochure = {
    //     "Granite": "GRANITE.pdf",
    //     "Marble": "MARBLE.pdf",
    //     "Porcelain": "PORZE.pdf",
    //     "Quartz": "QUARTZ.pdf",
    //     "Spc": "FLOOREVO SPC.pdf",
    //     "Nano Glass": "NANO_GLASS_BROCHURE.pdf"
    // };

    const categoryToBrochure = {}

    let activeBrochure = null;
    // Hide brochure button if 'All' is selected (0) or multiple categories are selected (>1)
    if (selectedCategories.size === 1) {
        for (let cat of selectedCategories) {
            if (categoryToBrochure[cat]) {
                activeBrochure = categoryToBrochure[cat];
                break;
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#151515] text-white py-14 md:py-20">
            <div className="mx-auto w-[92%] xl:w-[85%] max-w-[1400px]">

                {sectionTitle && (
                    <div className="mb-10 md:mb-14 text-center">
                        <p className={`text-[#DA9C39] text-xs font-bold tracking-[0.28em] uppercase mb-4 ${quicksand.className}`}>
                            New Arrivals
                        </p>
                        <h2 className="text-[#F4E0C2] text-3xl md:text-5xl font-light">
                            {sectionTitle}
                        </h2>
                    </div>
                )}

                <div className={showFilters ? "grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16" : ""}>

                    {/* Sidebar Filters */}
                    {showFilters && (
                    <aside className="bg-[#222222] rounded-xl p-8 h-fit space-y-10">
                        {/* Search */}
                        <div className="space-y-4">
                            <h3 className={`text-white text-base font-bold ${quicksand.className}`}>Search</h3>
                            <div className="relative group">
                                <input
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setPage(1);
                                    }}
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
                                    onClick={() => {
                                        setSelectedCategories(new Set());
                                        setPage(1);
                                    }}
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

                        {/* Sort */}
                        <div className="space-y-4">
                            <h3 className={`text-white text-base font-bold flex items-center gap-2 ${quicksand.className}`}>
                                <ArrowUpDown size={16} />
                                Sort
                            </h3>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#DA9C39] outline-none transition-all duration-700 ease-out ${quicksand.className}`}
                            >
                                <option value="newest" className="bg-[#151515]">Newest first</option>
                                <option value="name" className="bg-[#151515]">Name A-Z</option>
                                <option value="oldest" className="bg-[#151515]">Oldest first</option>
                            </select>
                        </div>

                        {/* Colour */}
                        <div className="space-y-6">
                            <h3 className={`text-white text-base font-bold ${quicksand.className}`}>Colour</h3>
                            <div className="space-y-4">
                                <CheckboxItem
                                    label="All"
                                    active={selectedColors.size === 0}
                                    onClick={() => {
                                        setSelectedColors(new Set());
                                        setPage(1);
                                    }}
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
                    )}

                    {/* Main Content */}
                    <main className="min-w-0">
                        {!showFilters && (
                            <div className="mb-10 space-y-4 rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h3 className={`text-white text-sm font-bold ${quicksand.className}`}>Search</h3>
                                        <input
                                            value={query}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                                setPage(1);
                                            }}
                                            placeholder="Marble, Granite, Quartz..."
                                            className={`w-full bg-black/20 placeholder:text-white border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#DA9C39] outline-none transition-all duration-700 ease-out ${quicksand.className}`}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className={`text-white text-sm font-bold flex items-center gap-2 ${quicksand.className}`}>
                                            <ArrowUpDown size={16} />
                                            Sort
                                        </h3>
                                        <select
                                            value={sort}
                                            onChange={(e) => {
                                                setSort(e.target.value);
                                                setPage(1);
                                            }}
                                            className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#DA9C39] outline-none transition-all duration-700 ease-out ${quicksand.className}`}
                                        >
                                            <option value="newest" className="bg-[#151515]">Newest first</option>
                                            <option value="name" className="bg-[#151515]">Name A-Z</option>
                                            <option value="oldest" className="bg-[#151515]">Oldest first</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-3">
                                        <h3 className={`text-white text-sm font-bold ${quicksand.className}`}>Categories</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <FilterChip
                                                label="All"
                                                active={selectedCategories.size === 0}
                                                onClick={() => {
                                                    setSelectedCategories(new Set());
                                                    setPage(1);
                                                }}
                                            />
                                            {categories.map((cat) => (
                                                <FilterChip
                                                    key={cat}
                                                    label={cat}
                                                    active={selectedCategories.has(cat)}
                                                    onClick={() => toggleSetValue(setSelectedCategories, cat)}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className={`text-white text-sm font-bold ${quicksand.className}`}>Colour</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <FilterChip
                                                label="All"
                                                active={selectedColors.size === 0}
                                                onClick={() => {
                                                    setSelectedColors(new Set());
                                                    setPage(1);
                                                }}
                                            />
                                            {colors.map((color) => (
                                                <FilterChip
                                                    key={color}
                                                    label={color}
                                                    active={selectedColors.has(color)}
                                                    onClick={() => toggleSetValue(setSelectedColors, color)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showFilters && activeBrochure && (
                            <div className="flex justify-end mb-10">
                                <a
                                    href={`/brochures/${activeBrochure}`}
                                    download={activeBrochure}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-3 border border-[#DA9C39] text-[#DA9C39] px-8 py-2.5 rounded-lg bg-transparent font-semibold hover:bg-[#DA9C39] hover:text-black transition-all duration-300 ${quicksand.className}`}
                                >
                                    <span>Download Brochure</span>
                                    <Download size={20} />
                                </a>
                            </div>
                        )}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center min-h-[500px]">
                                <Loader2 className="animate-spin text-[#DA9C39] mb-4" size={48} />
                                <p className={`text-white/40 tracking-widest uppercase text-xs font-bold ${quicksand.className}`}>Loading Products...</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                <div className="flex items-center justify-between gap-4 text-white/40 text-sm">
                                    <span>
                                        Showing {products.length} of {pagination.total} products
                                    </span>
                                    <span>
                                        Page {pagination.page} of {pagination.totalPages}
                                    </span>
                                </div>

                                <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} gap-y-12 gap-x-8`}>
                                    {products.map((p) => (
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

                                {products.length === 0 && (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                                        <Package className="text-white/10 mb-6" size={60} />
                                        <h3 className={`text-2xl font-normal ${quicksand.className}`}>No Products Found</h3>
                                        <p className={`text-white/40 mt-2 ${quicksand.className}`}>
                                            {newArrivalsOnly ? "Mark products as New Arrivals from the admin product form." : "Try adjusting your filters or search keywords."}
                                        </p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 sm:gap-8 pt-10 overflow-x-auto no-scrollbar">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={pagination.page === 1}
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/70 hover:text-[#DA9C39] disabled:opacity-20 transition-all duration-500 shrink-0"
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        <div className="flex items-center justify-center gap-1 sm:gap-3 px-2">
                                            {(() => {
                                                const getVisiblePages = (current, total) => {
                                                    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
                                                    if (current <= 3) return [1, 2, 3, '...', total];
                                                    if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
                                                    return [1, '...', current, '...', total];
                                                };

                                                return getVisiblePages(pagination.page, pagination.totalPages).map((p, index) => (
                                                    p === '...' ? (
                                                        <span key={`ellipsis-${index}`} className="text-white/30 px-1">...</span>
                                                    ) : (
                                                        <button
                                                            key={`page-${p}`}
                                                            onClick={() => setPage(p)}
                                                            className={`min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 flex items-center justify-center rounded-lg text-[14px] sm:text-[16px] transition-all duration-500 ${safePage === p
                                                                ? 'text-[#DA9C39] font-bold bg-[#DA9C39]/10'
                                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                                }`}
                                                        >
                                                            {p}
                                                        </button>
                                                    )
                                                ));
                                            })()}
                                        </div>

                                        <button
                                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                            disabled={pagination.page === pagination.totalPages}
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/70 hover:text-[#DA9C39] disabled:opacity-20 transition-all duration-500 shrink-0"
                                            aria-label="Next page"
                                        >
                                            <ChevronRight size={20} />
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

function FilterChip({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition-all duration-300 ${active
                ? 'border-[#DA9C39] bg-[#DA9C39]/10 text-[#F4E0C2]'
                : 'border-white/10 bg-black/20 text-white/70 hover:border-white/25 hover:text-white'
                }`}
        >
            {label}
        </button>
    );
}
