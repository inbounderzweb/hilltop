"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, Edit3, Trash2, X, ExternalLink, RefreshCw, AlertCircle, ArrowUpDown, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductsList({ onEdit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [arrivalFilter, setArrivalFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1, limit: 10 });
    const [categories, setCategories] = useState([]);

    // Details Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`/api/categories?t=${Date.now()}`, {
                cache: "no-store",
                headers: {
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setCategories(Array.isArray(data.categories) ? data.categories.map((c) => c.name).filter(Boolean) : []);
            }
        } catch (err) {
            console.error("Fetch categories error:", err);
        }
    };

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.set("page", String(page));
            params.set("limit", String(pageSize));
            params.set("sort", sortBy === "name-asc" ? "name" : sortBy === "oldest" ? "oldest" : "newest");
            if (search.trim()) params.set("q", search.trim());
            if (categoryFilter !== "all") params.set("category", categoryFilter);
            if (arrivalFilter === "yes") params.set("newArrivalsOnly", "true");

            const res = await fetch(`/api/products?${params.toString()}&t=${Date.now()}`, {
                cache: "no-store",
                headers: {
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                }
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Failed to load products from database.");
                return;
            }

            setProducts(Array.isArray(data.products) ? data.products : []);
            setPagination(data.pagination || { total: data.products.length, totalPages: 1, page, limit: pageSize });
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Network error: Could not connect to the API. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, search, sortBy, categoryFilter, arrivalFilter]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            setDeletingId(id);
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok || !data.success) {
                alert(data.error || "Failed to delete");
                return;
            }
            setProducts((prev) => prev.filter((p) => Number(p.id) !== Number(id)));
            alert("Product deleted successfully");
        } catch (error) {
            alert("Delete failed. Connection error.");
        } finally {
            setDeletingId(null);
        }
    };

    const totalPages = Math.max(1, pagination.totalPages || 1);
    const safePage = Math.min(Math.max(1, pagination.page || page), totalPages);
    const startItem = pagination.total === 0 ? 0 : ((safePage - 1) * pageSize) + 1;
    const endItem = Math.min(safePage * pageSize, pagination.total);
    const visiblePageCount = 5;

    const visiblePages = useMemo(() => {
        if (totalPages <= visiblePageCount) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (safePage <= 3) return [1, 2, 3, "...", totalPages];
        if (safePage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", safePage, "...", totalPages];
    }, [safePage, totalPages]);

    const hasFilters = search || sortBy !== "newest" || categoryFilter !== "all" || arrivalFilter !== "all";

    if (loading && products.length === 0) {
        return (
            <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-12 text-center">
                <div className="w-8 h-8 border-4 border-[#eba14d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50">Fetching products...</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-[#222222] rounded-xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
                <div className="p-4 border-b border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white/90 uppercase tracking-widest">Added Products</span>
                            <button
                                onClick={fetchProducts}
                                className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition ${loading ? 'animate-spin' : ''}`}
                                title="Refresh List"
                            >
                                <RefreshCw size={12} />
                            </button>
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="bg-[#1a1a1a] border border-white/10 text-[11px] rounded-lg px-3 py-1.5 text-white placeholder:text-white/20 outline-none focus:border-[#eba14d] transition w-full sm:w-48"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                <Filter size={12} />
                                Category
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => {
                                    setCategoryFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-[#1a1a1a] border border-white/10 text-[11px] rounded-lg px-3 py-2 text-white outline-none focus:border-[#eba14d] transition"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                <Filter size={12} />
                                New Arrival
                            </div>
                            <select
                                value={arrivalFilter}
                                onChange={(e) => {
                                    setArrivalFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-[#1a1a1a] border border-white/10 text-[11px] rounded-lg px-3 py-2 text-white outline-none focus:border-[#eba14d] transition"
                            >
                                <option value="all">All Products</option>
                                <option value="yes">New Arrivals</option>
                                <option value="no">Not New</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                <ArrowUpDown size={12} />
                                Sort
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-[#1a1a1a] border border-white/10 text-[11px] rounded-lg px-3 py-2 text-white outline-none focus:border-[#eba14d] transition"
                            >
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                            </select>
                        </div>
                    </div>

                    {hasFilters && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setSortBy("newest");
                                    setCategoryFilter("all");
                                    setArrivalFilter("all");
                                    setPage(1);
                                }}
                                className="text-[10px] font-bold uppercase tracking-widest text-[#eba14d] hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="m-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-[11px]">
                        <AlertCircle size={14} />
                        <p>{error}</p>
                        <button onClick={fetchProducts} className="ml-auto font-bold underline uppercase tracking-widest">Retry</button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#1a1a1a] border-b border-white/10 text-white/30 uppercase text-[10px] font-bold tracking-[0.15em]">
                                <th className="p-3 w-12 text-center">ID</th>
                                <th className="p-3 w-16">Slab</th>
                                <th className="p-3">Product Detail</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Variation</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-white/20 text-xs">
                                        <div className="mb-1">No products found</div>
                                        <button onClick={fetchProducts} className="text-[#eba14d] text-[10px] font-bold uppercase tracking-widest hover:underline">Refresh database</button>
                                    </td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/1 transition">
                                        <td className="p-3 text-[10px] font-bold text-white/20 text-center">#{p.id}</td>
                                        <td className="p-3">
                                            <div className="w-10 h-10 rounded border border-white/10 overflow-hidden bg-black/40">
                                                <img src={p.image_url} className="w-full h-full object-cover" alt={p.product_name} />
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="font-semibold text-white/80 text-sm leading-tight mb-0.5">{p.product_name}</div>
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{p.origin}</div>
                                                {Boolean(Number(p.is_new_arrival)) && (
                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#eba14d] px-1.5 py-0.5 rounded bg-[#eba14d]/10 border border-[#eba14d]/20">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#eba14d]/60 px-2 py-0.5 bg-[#eba14d]/5 rounded">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="p-3 text-[11px] text-white/50 leading-relaxed">
                                            {p.color_family}
                                            {p.thickness && <div className="text-[9px] text-white/20">{p.thickness}</div>}
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="flex items-center justify-end gap-1.5 text-white/30">
                                                <button onClick={() => setSelectedProduct(p)} className="p-1.5 hover:text-white transition" title="Preview">
                                                    <Eye size={14} />
                                                </button>
                                                <button onClick={() => onEdit(p)} className="p-1.5 hover:text-[#eba14d] transition" title="Edit">
                                                    <Edit3 size={14} />
                                                </button>
                                                <button onClick={() => deleteProduct(p.id)} disabled={deletingId === p.id} className="p-1.5 hover:text-red-500 transition disabled:opacity-30" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-white/10 px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="text-[11px] text-white/40">
                        Showing <span className="text-white/70 font-semibold">{startItem}</span> - <span className="text-white/70 font-semibold">{endItem}</span> of <span className="text-white/70 font-semibold">{pagination.total}</span> products
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                            Items per page
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="bg-[#1a1a1a] border border-white/10 text-[11px] rounded-lg px-3 py-2 text-white outline-none focus:border-[#eba14d] transition"
                            >
                                {[10, 20, 50].map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/70 disabled:opacity-30 hover:text-[#eba14d] transition flex items-center justify-center"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="flex items-center gap-1">
                                {visiblePages.map((item, index) => (
                                    item === "..." ? (
                                        <span key={`ellipsis-${index}`} className="px-2 text-white/30">...</span>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => setPage(item)}
                                            className={`min-w-9 h-9 px-3 rounded-lg text-[11px] font-bold transition border ${safePage === item
                                                ? "bg-[#eba14d]/10 border-[#eba14d]/20 text-[#eba14d]"
                                                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/70 disabled:opacity-30 hover:text-[#eba14d] transition flex items-center justify-center"
                                aria-label="Next page"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-12">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedProduct(null)}></div>
                    <div className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col md:flex-row">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-50">
                            <X size={20} />
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 p-4 md:p-8 bg-black/20">
                            <img src={selectedProduct.image_url} className="w-full aspect-square object-cover rounded-xl border border-white/5 shadow-2xl" alt={selectedProduct.product_name} />

                            {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Gallery Assets</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {selectedProduct.gallery.map((item, idx) => (
                                            <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-white/5">
                                                <img src={item.url} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={`Gallery ${idx}`} />
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                                        <ExternalLink size={20} className="text-[#eba14d]" />
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-12">
                            <div className="mb-8">
                                <div className="text-[#eba14d] text-xs font-bold tracking-widest uppercase mb-2">{selectedProduct.category}</div>
                                <h3 className="text-4xl font-bold text-white mb-4">{selectedProduct.product_name}</h3>
                                <div className="h-1 w-20 bg-[#eba14d] rounded-full mb-8"></div>

                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Origin</div>
                                        <div className="text-white font-medium">{selectedProduct.origin}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Color Family</div>
                                        <div className="text-white font-medium">{selectedProduct.color_family}</div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Description</div>
                                    <p className="text-white/60 leading-relaxed text-sm">{selectedProduct.description}</p>
                                </div>

                                <button
                                    onClick={() => { setSelectedProduct(null); onEdit(selectedProduct); }}
                                    className="w-full bg-white/5 hover:bg-[#eba14d] hover:text-black py-4 rounded-xl text-white font-bold transition duration-300 border border-white/10"
                                >
                                    Edit This Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
