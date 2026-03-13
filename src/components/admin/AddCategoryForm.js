"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function AddCategoryForm() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setFetching(true);
            const res = await fetch('/api/categories?t=' + Date.now());
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCat = e.target.categoryName.value.trim();

        if (!newCat) return;

        setLoading(true);
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCat })
            });

            const data = await res.json();

            if (data.success) {
                alert(`Category "${newCat}" added successfully!`);
                e.target.reset();
                fetchCategories(); // Refresh list
            } else {
                alert(data.error || "Failed to add category");
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, categoryName) => {
        if (!window.confirm(`Are you sure you want to delete "${categoryName}"?`)) return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                setCategories(categories.filter(c => c.id !== id));
                alert("Category deleted successfully");
            } else {
                alert(data.error || "Failed to delete category");
            }
        } catch (err) {
            alert("Something went wrong during deletion");
        }
    };

    return (
        <div className="bg-[#222222] rounded-xl border border-white/5 shadow-xl p-6 animate-in fade-in duration-500">
            <span className="text-sm font-semibold text-white mb-1 tracking-wide flex items-center gap-3">
                Manage Categories
                {fetching && <Loader2 size={16} className="animate-spin text-[#eba14d]" />}
            </span>
            <p className="text-white/40 text-xs mb-6 px-1">Add new categories to organize your products.</p>

            <form onSubmit={handleSubmit} className="mb-8">
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 px-1">New Category Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        name="categoryName"
                        required
                        placeholder="e.g. Limestone"
                        disabled={loading}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#eba14d] hover:bg-[#d89243] text-black font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-lg transition shadow-md whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        {loading ? "ADDING..." : "ADD CATEGORY"}
                    </button>
                </div>
            </form>

            <div className="pt-6 border-t border-white/5">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
                    Active Categories ({categories.length})
                </h3>
                <div className="flex flex-wrap gap-2.5">
                    {categories.length === 0 && !fetching ? (
                        <p className="text-white/20 text-xs italic py-2">No categories yet.</p>
                    ) : (
                        categories.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg group hover:border-[#eba14d]/30 transition-colors">
                                <span className="text-xs text-white/80">{cat.name}</span>
                                <button
                                    className="p-1 text-white/10 hover:text-red-500 transition-colors"
                                    onClick={() => handleDelete(cat.id, cat.name)}
                                    title="Delete Category"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
