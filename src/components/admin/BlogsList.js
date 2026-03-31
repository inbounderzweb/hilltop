"use client";

import React, { useEffect, useState } from "react";
import { Trash2, RefreshCw, AlertCircle, Eye, Edit3 } from "lucide-react";

export default function BlogsList({ onEdit }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/blogs?t=" + Date.now());
            const data = await res.json();
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                setError(data.error || "Failed to fetch blogs");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog post?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/blogs/id/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setBlogs(blogs.filter((b) => b.id !== id));
            } else {
                alert(data.error || "Failed to delete");
            }
        } catch (error) {
            alert("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && blogs.length === 0) {
        return (
            <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-12 text-center">
                <div className="w-8 h-8 border-4 border-[#eba14d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50">Fetching blogs...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#222222] rounded-xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <span className="text-sm font-semibold text-white/90 uppercase tracking-widest">Blog Posts</span>
                <button
                    onClick={fetchBlogs}
                    className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={12} />
                </button>
            </div>

            {error && (
                <div className="m-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-[11px]">
                    <AlertCircle size={14} />
                    <p>{error}</p>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#1a1a1a] border-b border-white/10 text-white/30 uppercase text-[10px] font-bold tracking-widest">
                            <th className="p-3 w-16">Preview</th>
                            <th className="p-3">Title & Summary</th>
                            <th className="p-3">Metadata</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-white/20 text-xs">No blog posts found</td>
                            </tr>
                        ) : (
                            blogs.map((b) => (
                                <tr key={b.id} className="hover:bg-white/1 transition">
                                    <td className="p-3">
                                        <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-black/40 shadow-inner group">
                                            <img 
                                                src={b.image_url?.startsWith('http') || b.image_url?.startsWith('/') ? b.image_url : `/${b.image_url}`} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                                alt={b.title} 
                                                onError={(e) => { e.target.src = "https://placehold.co/100x100/1a1a1a/DA9C39?text=Blog"; }}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-3 min-w-[250px]">
                                        <div className="font-semibold text-white/80 text-sm leading-tight mb-1">{b.title}</div>
                                        <div className="text-[11px] text-white/30 line-clamp-1">{b.excerpt}</div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{b.author_name}</div>
                                        <div className="text-[9px] text-white/20 mt-0.5">{new Date(b.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-1 text-white/30">
                                            <a href={`/blogs/${b.slug}`} target="_blank" rel="noreferrer" className="p-1.5 hover:text-white" title="View Blog">
                                                <Eye size={14} />
                                            </a>
                                            <button
                                                onClick={() => onEdit(b)}
                                                className="p-1.5 hover:text-[#eba14d]"
                                                title="Edit Blog"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() => deleteBlog(b.id)}
                                                disabled={deletingId === b.id}
                                                className="p-1.5 hover:text-red-500 disabled:opacity-30"
                                                title="Delete Blog"
                                            >
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
        </div>
    );
}
