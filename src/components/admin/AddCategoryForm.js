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
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide flex items-center gap-3">
                Manage Categories
                {fetching && <Loader2 size={20} className="animate-spin text-[#eba14d]" />}
            </h2>
            <p className="text-white/50 text-sm mb-8">Add new categories to organize your products. These will appear in the product creation dropdown.</p>

            <form onSubmit={handleSubmit} className="mb-10">
                <label className="block text-sm font-medium text-white/70 mb-2">New Category Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        name="categoryName"
                        required
                        placeholder="e.g. Limestone"
                        disabled={loading}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d] disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#eba14d] hover:bg-[#d89243] text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                        {loading ? "Adding..." : "Add Category"}
                    </button>
                </div>
            </form>

            <div>
                <h3 className="text-sm font-medium text-white/70 mb-4 px-1 flex items-center gap-2">
                    Active Categories ({categories.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                    {categories.length === 0 && !fetching ? (
                        <p className="text-white/20 text-sm italic py-4">No categories added yet. Add one above.</p>
                    ) : (
                        categories.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-2 pl-4 pr-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl group hover:border-[#eba14d]/30 transition-colors">
                                <span className="text-sm text-white/90">{cat.name}</span>
                                <button
                                    className="p-1 text-white/10 hover:text-red-500 transition-colors"
                                    onClick={() => handleDelete(cat.id, cat.name)}
                                    title="Delete Category"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
