"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2, Image as ImageIcon, Save } from "lucide-react";

export default function AddBlogForm({ onSwitchTab, initialData = null }) {
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("Hilltop Surfaces");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setAuthorName(initialData.author_name || "Hilltop Surfaces");
            setExcerpt(initialData.excerpt || "");
            setContent(initialData.content || "");
            setPreview(initialData.image_url || null);
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
        if (!title || !excerpt || !content || (!isEditing && !image)) {
            alert("Please fill all required fields and upload an image.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("author_name", authorName);
            formData.append("excerpt", excerpt);
            formData.append("content", content);

            if (image) {
                formData.append("image", image);
            } else if (isEditing) {
                formData.append("existing_image_url", initialData.image_url);
            }

            const url = isEditing ? `/api/blogs/id/${initialData.id}` : "/api/blogs";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                alert(isEditing ? "Blog post updated successfully!" : "Blog post added successfully!");
                onSwitchTab("blogs-list");
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
            <span className="text-sm font-semibold text-white mb-6 tracking-wide">
                {isEditing ? "Edit Blog Post" : "Add New Blog Post"}
            </span>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Blog Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Author Name</label>
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Enter author name"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Excerpt (Short Summary)</label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Write a brief summary..."
                        rows={2}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition resize-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Content (Markdown or HTML)</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write the full blog post content here..."
                        rows={8}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition font-mono"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 px-1">Featured Image</label>
                    <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-6 hover:border-[#eba14d]/50 transition cursor-pointer relative overflow-hidden bg-black/10">
                        {preview ? (
                            <img src={preview} alt="Preview" className="max-h-40 rounded-lg object-cover" />
                        ) : (
                            <>
                                <ImageIcon size={32} className="text-white/10 mb-2" />
                                <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Click to upload image</p>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            required={!isEditing}
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
                        {loading ? "PROCESSING..." : isEditing ? "UPDATE BLOG POST" : "PUBLISH BLOG POST"}
                    </button>
                </div>
            </form>
        </div>
    );
}
