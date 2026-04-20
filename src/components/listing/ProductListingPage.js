'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Quicksand } from "next/font/google";
import { Loader2, Search, SlidersHorizontal, Package, Check, ChevronRight, ChevronLeft, ArrowRight, Download } from 'lucide-react';

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

    // Main Product Fetch
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
    }, []);

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
        setPage(1);
    };

    const resetFilters = () => {
        setQuery('');
        setSelectedCategories(new Set());
        setSelectedColors(new Set());
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
        }
    }, [page, query, selectedCategories, selectedColors, initialCategory]);

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

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">

                    {/* Sidebar Filters */}
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

                    {/* Main Content */}
                    <main className="min-w-0">
                        {activeBrochure && (
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
                                    <div className="flex items-center justify-center gap-4 sm:gap-8 pt-10 overflow-x-auto no-scrollbar">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={safePage === 1}
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

                                                return getVisiblePages(safePage, totalPages).map((p, index) => (
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
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={safePage === totalPages}
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