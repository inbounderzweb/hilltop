"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Loader2 } from "lucide-react";

export default function AddProductForm({ onSwitchTab, initialData = null }) {
    const isEdit = !!initialData;

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        origin: "",
        color_family: "",
        description: "",
    });

    const [mainImage, setMainImage] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");

    // Gallery state
    const [gallery, setGallery] = useState([]); // [{ file: null, link: "", existingUrl: "" }]

    // Real-time fetching state
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [fetchingCategories, setFetchingCategories] = useState(false);
    const [fetchingColors, setFetchingColors] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchFreshColors = async () => {
        try {
            setFetchingColors(true);
            const res = await fetch('/api/variations/options?type=color&t=' + Date.now(), { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setColors(data.options.map(o => o.value));
            }
        } catch (err) {
            console.error("Failed to refresh colors", err);
        } finally {
            setFetchingColors(false);
        }
    };

    const fetchFreshCategories = async () => {
        try {
            setFetchingCategories(true);
            const res = await fetch('/api/categories?t=' + Date.now(), { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories.map(c => c.name));
            }
        } catch (err) {
            console.error("Failed to refresh categories", err);
        } finally {
            setFetchingCategories(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchFreshCategories();
        fetchFreshColors();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                product_name: initialData.product_name || "",
                category: initialData.category || "",
                origin: initialData.origin || "",
                color_family: initialData.color_family || "",
                description: initialData.description || "",
            });
            setExistingImageUrl(initialData.image_url || "");

            if (initialData.gallery && Array.isArray(initialData.gallery)) {
                setGallery(initialData.gallery.map(item => ({
                    file: null,
                    link: item.link || "",
                    existingUrl: item.url || ""
                })));
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 500 * 1024) {
            alert("Image size must be less than 500KB");
            e.target.value = "";
            return;
        }
        setMainImage(file);
    };

    const addGalleryItem = () => {
        setGallery([...gallery, { file: null, link: "", existingUrl: "" }]);
    };

    const removeGalleryItem = (index) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };

    const updateGalleryItem = (index, field, value) => {
        const newGallery = [...gallery];
        if (field === 'file') {
            if (value && value.size > 500 * 1024) {
                alert("Image size must be less than 500KB");
                return;
            }
            newGallery[index].file = value;
        } else {
            newGallery[index][field] = value;
        }
        setGallery(newGallery);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit && !mainImage) {
            alert("Please select a product image");
            return;
        }

        setLoading(true);

        try {
            const payload = new FormData();
            payload.append("product_name", formData.product_name);
            payload.append("category", formData.category);
            payload.append("origin", formData.origin);
            payload.append("color_family", formData.color_family);
            payload.append("description", formData.description);

            if (mainImage) {
                payload.append("image", mainImage);
            }
            if (isEdit) {
                payload.append("existing_image_url", existingImageUrl);
            }

            // Gallery handling
            const links = [];
            const existingItems = [];

            gallery.forEach((item) => {
                if (item.file) {
                    payload.append("gallery_images", item.file);
                    links.push(item.link);
                } else if (item.existingUrl) {
                    existingItems.push({ url: item.existingUrl, link: item.link });
                }
            });

            payload.append("gallery_links", JSON.stringify(links));
            payload.append("existing_gallery", JSON.stringify(existingItems));

            const url = isEdit ? `/api/products/${initialData.id}` : "/api/products";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                body: payload,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to save product");
                return;
            }

            alert(isEdit ? "Product updated successfully!" : "Product successfully added!");

            if (!isEdit) {
                setFormData({
                    product_name: "",
                    category: "",
                    origin: "",
                    color_family: "",
                    description: "",
                });
                setMainImage(null);
                setGallery([]);
            }

            if (onSwitchTab) {
                onSwitchTab("product-list");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-white mb-8 tracking-wide">
                {isEdit ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Product Name *</label>
                            <input
                                required
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleChange}
                                placeholder="Classic White Marble"
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-white/70">Category *</label>
                                {fetchingCategories && <Loader2 size={14} className="animate-spin text-[#eba14d]" />}
                            </div>
                            <select
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                onFocus={fetchFreshCategories}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Origin *</label>
                            <input
                                required
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                placeholder="Italy, Brazil"
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-white/70">Color Family *</label>
                                {fetchingColors && <Loader2 size={14} className="animate-spin text-[#eba14d]" />}
                            </div>
                            <select
                                required
                                name="color_family"
                                value={formData.color_family}
                                onChange={handleChange}
                                onFocus={fetchFreshColors}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]"
                            >
                                <option value="" disabled>Select Color</option>
                                {colors.map((color, idx) => (
                                    <option key={idx} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Description *</label>
                            <textarea
                                required
                                rows="4"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Details about the marble..."
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#eba14d] outline-none transition resize-none ring-0 focus:ring-1 focus:ring-[#eba14d]"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Image */}
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Main Product Image {isEdit ? "(Leave empty to keep current)" : "*"}</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <input type="file" accept="image/*" onChange={handleMainImageChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                        </div>
                        {isEdit && existingImageUrl && !mainImage && (
                            <div className="h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                                <img src={existingImageUrl} className="w-full h-full object-cover" alt="Current" />
                            </div>
                        )}
                        {mainImage && (
                            <p className="text-xs text-[#eba14d] mt-2">New image selected: {mainImage.name}</p>
                        )}
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white/90">Gallery Images & Links</h3>
                        <button type="button" onClick={addGalleryItem} className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-white/90 px-3 py-2 rounded-lg transition">
                            <Plus size={16} /> Add More Image
                        </button>
                    </div>

                    <div className="grid gap-4">
                        {gallery.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-xl relative group">
                                <button type="button" onClick={() => removeGalleryItem(idx)} className="absolute top-2 right-2 text-white/20 hover:text-red-500 transition">
                                    <X size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-xs font-medium text-white/50 uppercase">Gallery Image</label>
                                        <div className="flex items-center gap-3">
                                            <input type="file" accept="image/*" onChange={(e) => updateGalleryItem(idx, 'file', e.target.files[0])} className="text-xs text-white/70 w-full" />
                                            {item.existingUrl && !item.file && (
                                                <img src={item.existingUrl} className="w-10 h-10 rounded border border-white/10" alt="Gallery" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-medium text-white/50 uppercase">Custom Link (Hyperlink)</label>
                                        <input
                                            value={item.link}
                                            onChange={(e) => updateGalleryItem(idx, 'link', e.target.value)}
                                            placeholder="https://example.com/product-specs"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#eba14d] outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                    {isEdit && (
                        <button type="button" onClick={() => onSwitchTab('product-list')} className="bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition duration-300">
                            Cancel
                        </button>
                    )}
                    <button type="submit" disabled={loading} className="bg-[#eba14d] hover:bg-[#d89243] text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md flex items-center gap-2">
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? "Processing..." : isEdit ? "Update Product" : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}