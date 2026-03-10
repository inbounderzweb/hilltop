"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Palette, Loader2 } from 'lucide-react';

export default function ManageVariationsForm() {
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [newColor, setNewColor] = useState("");

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        try {
            setFetching(true);
            const res = await fetch('/api/variations/options?type=color&t=' + Date.now(), { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setColors(data.options);
            }
        } catch (err) {
            console.error("Failed to fetch colors", err);
        } finally {
            setFetching(false);
        }
    };

    const handleAddColor = async (e) => {
        e.preventDefault();
        if (!newColor.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/api/variations/options', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'color', value: newColor.trim() })
            });

            const data = await res.json();

            if (data.success) {
                setNewColor("");
                alert("Color added successfully!");
                fetchColors(); // Refresh list to get ID
            } else {
                alert(data.error || "Failed to add color");
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, value) => {
        if (!window.confirm(`Are you sure you want to delete color "${value}"?`)) return;

        try {
            const res = await fetch(`/api/variations/options/${id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                setColors(colors.filter(c => c.id !== id));
                alert("Color deleted successfully");
            } else {
                alert(data.error || "Failed to delete color");
            }
        } catch (err) {
            alert("Something went wrong during deletion");
        }
    };

    return (
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
                <Palette className="text-[#eba14d]" size={24} />
                Manage Color Variations
                {fetching && <Loader2 size={20} className="animate-spin text-[#eba14d] ml-2" />}
            </h2>
            <p className="text-white/50 text-sm mb-8">Add colors that will be available in the product selection dropdown.</p>

            <form onSubmit={handleAddColor} className="mb-10">
                <label className="block text-sm font-medium text-white/70 mb-2">New Color Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        required
                        placeholder="e.g. Royal Blue"
                        disabled={loading}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d] disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#eba14d] hover:bg-[#d89243] text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                        {loading ? "Adding..." : "Add Color"}
                    </button>
                </div>
            </form>

            <div>
                <h3 className="text-sm font-medium text-white/70 mb-4 px-1">Active Colors ({colors.length})</h3>
                <div className="flex flex-wrap gap-3">
                    {colors.length === 0 && !fetching ? (
                        <p className="text-white/20 text-sm italic py-4">No colors added yet.</p>
                    ) : (
                        colors.map((color) => (
                            <div key={color.id} className="flex items-center gap-2 pl-4 pr-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl group hover:border-[#eba14d]/30 transition-colors">
                                <span className="text-sm text-white/90">{color.value}</span>
                                <button
                                    className="p-1 text-white/10 hover:text-red-500 transition-colors"
                                    onClick={() => handleDelete(color.id, color.value)}
                                    title="Delete Color"
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
