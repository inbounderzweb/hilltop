"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Loader2, Image as ImageIcon, Save } from "lucide-react";

export default function AddTestimonialForm({ onSwitchTab, initialData = null }) {
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState("5");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setContent(initialData.content || "");
            setRating(initialData.stars?.toString() || "5");
            setPreview(initialData.avatar || null);
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !content || !rating) {
            alert("Please fill name, content, and rating.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("content", content);
            formData.append("rating", rating);
            if (image) {
                formData.append("image", image);
            }

            const url = isEditing ? `/api/testimonials/${initialData.id}` : "/api/testimonials";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                alert(isEditing ? "Testimonial updated successfully!" : "Testimonial added successfully!");
                onSwitchTab("testimonials-list");
                if (!isEditing) {
                    setName("");
                    setContent("");
                    setRating("5");
                    setImage(null);
                    setPreview(null);
                }
            } else {
                alert(data.error || "Failed to process request");
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#222222] rounded-xl border border-white/5 shadow-xl p-6 animate-in fade-in duration-500">
            <span className="text-sm font-semibold text-white mb-6 tracking-wide block">
                {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
            </span>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Customer Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter customer name"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Rating (1-5)</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition cursor-pointer"
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Testimonial Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write the testimonial review text..."
                        rows={4}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition resize-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Profile Photo (Optional)</label>
                    <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-6 hover:border-[#eba14d]/50 transition cursor-pointer relative overflow-hidden bg-black/10">
                        {preview ? (
                            <div className="relative w-24 h-24 overflow-hidden rounded-full shadow-lg border-2 border-white/10">
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <>
                                <ImageIcon size={32} className="text-white/10 mb-2" />
                                <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Click to upload avatar</p>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#eba14d] hover:bg-[#d89243] text-black font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : isEditing ? (
                            <Save size={16} />
                        ) : (
                            <Plus size={16} />
                        )}
                        {loading ? "PROCESSING..." : isEditing ? "UPDATE TESTIMONIAL" : "PUBLISH TESTIMONIAL"}
                    </button>
                </div>
            </form>
        </div>
    );
}
