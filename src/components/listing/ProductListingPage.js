'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import dp1 from "../../assets/dproducts/dp1.jpg"
import dp2 from "../../assets/dproducts/dp2.jpg"
import dp3 from "../../assets/dproducts/dp3.jpg"
import dp4 from "../../assets/dproducts/dp4.jpg"
import dp5 from "../../assets/dproducts/dp5.jpg"
import dp6 from "../../assets/dproducts/dp6.jpg"
import arrow_forward from "../../assets/dproducts/arrow_forward.svg"
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductListingPage() {
    // ----- Mock data (replace with your API data) -----
    const PRODUCTS = useMemo(
        () => [
            { id: 1, name: 'Cosmopolitan', category: 'Quartzite', color: 'Red', image: dp1 },
            { id: 2, name: 'Cristallo Blue', category: 'Quartzite', color: 'Silver', image: dp2 },
            { id: 3, name: 'Crystal Venato', category: 'Marble', color: 'Black', image: dp3 },
            { id: 4, name: 'Iron Blue', category: 'Granite', color: 'Black', image: dp4 },
            { id: 5, name: 'Jacaranda', category: 'Quartzite', color: 'Yellow', image: dp5 },
            { id: 6, name: 'Polaris Gold', category: 'Marble', color: 'Yellow', image: dp6 },
            // add more items...
        ],
        []
    )

    // ----- Filters -----
    const categoryOptions = ['Quartzite', 'Granite', 'Marble']
    const colorOptions = ['Black', 'Red', 'Green', 'Yellow', 'Silver']

    const [query, setQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(new Set(['Quartzite']))
    const [selectedColors, setSelectedColors] = useState(new Set(['All'])) // "All" behaves like no filtering

    // ----- Pagination -----
    const PAGE_SIZE = 6
    const [page, setPage] = useState(2) // matches screenshot vibe; set to 1 if you want default

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()

        const colorFilteringOn = !(selectedColors.has('All') || selectedColors.size === 0)
        const categoryFilteringOn = selectedCategories.size > 0

        return PRODUCTS.filter((p) => {
            const matchesQuery = !q || p.name.toLowerCase().includes(q)

            const matchesCategory = !categoryFilteringOn || selectedCategories.has(p.category)

            const matchesColor = !colorFilteringOn || selectedColors.has(p.color)

            return matchesQuery && matchesCategory && matchesColor
        })
    }, [PRODUCTS, query, selectedCategories, selectedColors])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(Math.max(1, page), totalPages)

    const paged = useMemo(() => {
        const start = (safePage - 1) * PAGE_SIZE
        return filtered.slice(start, start + PAGE_SIZE)
    }, [filtered, safePage])

    // ----- Helpers -----
    const toggleSetValue = (setState, value) => {
        setState((prev) => {
            const next = new Set(prev)
            if (next.has(value)) next.delete(value)
            else next.add(value)
            return next
        })
    }

    const toggleCategory = (value) => toggleSetValue(setSelectedCategories, value)

    const toggleColor = (value) => {
        setSelectedColors((prev) => {
            const next = new Set(prev)

            // If picking "All" -> clear others and keep All
            if (value === 'All') {
                return new Set(['All'])
            }

            // If picking a specific color -> remove All and toggle that color
            next.delete('All')
            if (next.has(value)) next.delete(value)
            else next.add(value)

            // If none selected -> fall back to All
            if (next.size === 0) next.add('All')

            return next
        })
    }

    const resetFilters = () => {
        setQuery('')
        setSelectedCategories(new Set(['Quartzite']))
        setSelectedColors(new Set(['All']))
        setPage(1)
    }

    // If filters change, keep pagination sane
    React.useEffect(() => {
        setPage(1)
    }, [query, selectedCategories, selectedColors])

    return (
        <div className="min-h-screen bg-[#1b1b1b] text-white">
            <div className="mx-auto w-full w-[95%] xl:w-[85%] px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                    {/* Sidebar */}
                    <aside className={`rounded-2xl bg-[#222222] p-6 ${quicksand.className}`}>
                        <div className="space-y-6">
                            {/* Search */}
                            <div>
                                <h3 className="text-sm font-semibold text-white/90">Search</h3>
                                <div className="mt-3">
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Product keywords"
                                        className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
                                    />
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-semibold text-white/90">Categories</h3>
                                <div className="mt-4 space-y-3">
                                    <CheckboxRow
                                        label="All"
                                        checked={selectedCategories.size === 0}
                                        onChange={() => setSelectedCategories(new Set())}
                                    />
                                    {categoryOptions.map((c) => (
                                        <CheckboxRow
                                            key={c}
                                            label={c}
                                            checked={selectedCategories.has(c)}
                                            onChange={() => toggleCategory(c)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            {/* Colour */}
                            <div>
                                <h3 className="text-sm font-semibold text-white/90">Colour</h3>
                                <div className="mt-4 space-y-3">
                                    <CheckboxRow label="All" checked={selectedColors.has('All')} onChange={() => toggleColor('All')} />
                                    {colorOptions.map((c) => (
                                        <CheckboxRow
                                            key={c}
                                            label={c}
                                            checked={selectedColors.has(c)}
                                            onChange={() => toggleColor(c)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={resetFilters}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
                                >
                                    Reset filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Right section */}
                    <section className="rounded-2xl bg-[#1f1f1f] p-6">
                        {/* Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {paged.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}

                            {/* Empty state */}
                            {paged.length === 0 && (
                                <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
                                    No products found.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className={`mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row ${quicksand.className}`}>
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={safePage <= 1}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <span className="text-lg leading-none">‹</span>
                                Previous page
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
                                    const n = i + 1
                                    const active = n === safePage
                                    return (
                                        <button
                                            key={n}
                                            onClick={() => setPage(n)}
                                            className={[
                                                'h-9 w-9 rounded-xl text-sm font-medium transition',
                                                active ? 'bg-white text-black' : 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10',
                                            ].join(' ')}
                                        >
                                            {n}
                                        </button>
                                    )
                                })}
                            </div>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={safePage >= totalPages}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next page
                                <span className="text-lg leading-none">›</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

function CheckboxRow({ label, checked, onChange }) {
    return (
        <label className="flex cursor-pointer select-none items-center gap-3 text-sm text-white/80">
            <span
                className={[
                    'grid h-5 w-5 place-items-center rounded-md border',
                    checked ? 'border-white/30 bg-white/15' : 'border-white/15 bg-[#1a1a1a]',
                ].join(' ')}
            >
                {checked ? <span className="h-2.5 w-2.5 rounded-sm bg-white" /> : null}
            </span>
            <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
            <span>{label}</span>
        </label>
    )
}

function ProductCard({ product }) {
    return (
        <button className="group text-left">
            <div className="hover:bg-[#2b2b2b] transition duration-600 cursor-pointer p-2 rounded-xl">
                {/* Image */}
                <div className="relative w-full h-[210px]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>

                {/* Title row */}
                <div className="flex items-center justify-center border px-5 py-1 my-2 border border-transparent group-hover:border-[#fff3dd] rounded-xl transition duration-700">
                    <div className="space-y-1">
                        <div className=" text-white/90 text-center group-hover:text-[#eba14d] transition duration-700 tracking-widest text-[20px]">
                            {product.name}
                        </div>
                        {/* <div className="text-xs text-white/50">
                            {product.category} • {product.color}
                        </div> */}
                    </div>

                    <Image src={arrow_forward} alt="arrow_forward" />
                </div>
            </div>
        </button>
    )
}