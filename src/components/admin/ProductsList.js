"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, Edit3, Trash2, X, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";

export default function ProductsList({ onEdit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [search, setSearch] = useState("");

    // Details Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Cache busting with timestamp
            const res = await fetch(`/api/products?t=${Date.now()}`, {
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
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Network error: Could not connect to the API. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

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

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return products;
        return products.filter((p) =>
            p.product_name?.toLowerCase().includes(term) ||
            p.category?.toLowerCase().includes(term) ||
            p.color_family?.toLowerCase().includes(term) ||
            p.origin?.toLowerCase().includes(term)
        );
    }, [products, search]);

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
            <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-white/90">Added Products</h2>
                        <button
                            onClick={fetchProducts}
                            className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition ${loading ? 'animate-spin' : ''}`}
                            title="Refresh List"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="bg-[#1a1a1a] border border-white/10 text-sm rounded-lg px-4 py-2 text-white placeholder:text-white/30 outline-none focus:border-[#eba14d] transition w-full sm:w-64"
                    />
                </div>

                {error && (
                    <div className="m-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle size={18} />
                        <p>{error}</p>
                        <button onClick={fetchProducts} className="ml-auto font-semibold underline">Retry</button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[850px]">
                        <thead>
                            <tr className="bg-[#1a1a1a] border-b border-white/10 text-white/50 uppercase text-xs font-semibold tracking-wider">
                                <th className="p-4 w-16 text-center">ID</th>
                                <th className="p-4">Image</th>
                                <th className="p-4">Product Info</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Color/Origin</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/30">
                                        <div className="mb-2">No products found</div>
                                        <button onClick={fetchProducts} className="text-[#eba14d] text-sm hover:underline">Refresh database</button>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/[0.02] transition">
                                        <td className="p-4 text-sm font-medium text-white/30 text-center">#{p.id}</td>
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                                <img src={p.image_url} className="w-full h-full object-cover" alt={p.product_name} />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-white/90">{p.product_name}</div>
                                            <div className="text-[10px] text-white/30 mt-0.5 uppercase tracking-widest font-semibold">{p.category}</div>
                                        </td>
                                        <td className="p-4 font-medium text-white/70">
                                            {p.category}
                                        </td>
                                        <td className="p-4 text-sm text-white/40">
                                            {p.color_family} • {p.origin}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setSelectedProduct(p)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl transition group" title="View Details">
                                                    <Eye size={18} className="group-hover:scale-110 transition" />
                                                </button>
                                                <button onClick={() => onEdit(p)} className="p-2.5 bg-white/5 hover:bg-[#eba14d]/10 text-[#eba14d] rounded-xl transition group" title="Edit">
                                                    <Edit3 size={18} className="group-hover:scale-110 transition" />
                                                </button>
                                                <button onClick={() => deleteProduct(p.id)} disabled={deletingId === p.id} className="p-2.5 bg-white/5 hover:bg-red-500/10 text-red-500 rounded-xl transition group disabled:opacity-30" title="Delete">
                                                    <Trash2 size={18} className="group-hover:scale-110 transition" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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