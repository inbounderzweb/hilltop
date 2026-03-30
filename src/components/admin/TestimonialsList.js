"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

export default function TestimonialsList({ onEdit }) {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials?t=" + Date.now());
            const data = await res.json();
            if (data.success) {
                setTestimonials(data.testimonials || []);
            }
        } catch (error) {
            console.error("Failed to load testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setTestimonials(prev => prev.filter(t => t.id !== id));
            } else {
                alert(data.error || "Failed to delete");
            }
        } catch (error) {
            alert("Error deleting testimonial");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-[#eba14d]" size={32} />
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <div className="bg-[#151515] rounded-xl border border-white/5 p-12 text-center">
                <p className="text-white/40 text-sm font-semibold tracking-wide uppercase">No testimonials found</p>
                <div className="w-10 h-1 bg-white/5 mx-auto rounded-full mt-4" />
            </div>
        );
    }

    return (
        <div className="bg-[#151515] rounded-xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-[#222222] border border-white/5 rounded-xl p-6 relative group overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                            {t.avatar ? (
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10 object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/20 text-xs font-bold uppercase overflow-hidden">
                                    {t.name?.charAt(0) || "?"}
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-white text-sm">{t.name}</h3>
                                <div className="flex text-[#eba14d] text-[10px] mt-0.5">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={i < t.stars ? "text-[#eba14d]" : "text-white/20"}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-white/60 text-xs italic line-clamp-4 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                            &quot;{t.content}&quot;
                        </p>

                        {/* Action buttons on hover */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(t)}
                                className="w-8 h-8 flex items-center justify-center bg-[#eba14d]/10 text-[#eba14d] rounded-lg hover:bg-[#eba14d] hover:text-black transition-colors border border-[#eba14d]/20"
                                title="Edit Testimonial"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(t.id)}
                                className="w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                                title="Delete Testimonial"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
