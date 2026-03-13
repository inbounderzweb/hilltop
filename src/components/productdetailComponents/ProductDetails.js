'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    Loader2,
    ArrowLeft,
    Globe,
    Palette,
    Tag,
    Info,
    Maximize2,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState({ url: null, link: null });
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/products/${productId}?t=${Date.now()}`);
                const data = await res.json();

                if (data.success) {
                    setProduct(data.product);
                    // Set both URL and Link for the initial view
                    setActiveImage({
                        url: data.product.image_url,
                        link: null // Main image currently doesn't have a separate link field
                    });

                    // Fetch related products (same category)
                    const relatedRes = await fetch(`/api/products?t=${Date.now()}`);
                    const relatedData = await relatedRes.json();
                    if (relatedData.success) {
                        const filtered = relatedData.products
                            .filter(p => p.category === data.product.category && p.id !== data.product.id)
                            .slice(0, 4);
                        setRelatedProducts(filtered);
                    }
                } else {
                    setError(data.error || "Product not found");
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
                setError("Something went wrong while fetching the product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className={`min-h-[600px] flex flex-col items-center justify-center bg-[#1b1b1b] text-white ${quicksand.className}`}>
                <Loader2 className="animate-spin text-[#eba14d] mb-6" size={60} />
                <p className="text-white/40 tracking-[0.2em] font-bold uppercase text-xs">Loading Excellence...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={`min-h-[600px] flex flex-col items-center justify-center bg-[#1b1b1b] text-white px-6 text-center ${quicksand.className}`}>
                <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/20">
                    <Info className="text-red-500" size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-4">{error || "Product Not Found"}</h2>
                <p className="text-white/40 mb-10 max-w-md">We couldn't find the stone you're looking for. It might have been moved or removed from our collection.</p>
                <Link
                    href="/products"
                    className="flex items-center gap-2 bg-[#eba14d] text-black px-8 py-4 rounded-2xl font-bold hover:bg-[#d89243] transition-all shadow-xl shadow-[#eba14d]/10"
                >
                    <ArrowLeft size={20} /> Back to Collection
                </Link>
            </div>
        );
    }

    const allImages = [
        { url: product.image_url, link: null },
        ...(Array.isArray(product.gallery) ? product.gallery : [])
    ];

    return (
        <div className="min-h-screen bg-[#1b1b1b] text-white py-14 md:py-20">
            <div className="mx-auto w-[92%] xl:w-[85%] max-w-[1400px]">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left: Gallery Section */}
                    <div className="space-y-6">
                        <div className="relative aspect-4/3 w-full bg-[#222222] rounded-xl overflow-hidden shadow-2xl group">
                            <Image
                                src={activeImage.url || product.image_url}
                                alt={product.product_name}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Navigation Arrows inside image */}
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const currentIndex = allImages.findIndex(img => img.url === activeImage.url);
                                        const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                                        setActiveImage(allImages[prevIndex]);
                                    }}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-[#eba14d] hover:text-black transition-all pointer-events-auto"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const currentIndex = allImages.findIndex(img => img.url === activeImage.url);
                                        const nextIndex = (currentIndex + 1) % allImages.length;
                                        setActiveImage(allImages[nextIndex]);
                                    }}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-[#eba14d] hover:text-black transition-all pointer-events-auto"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage({ url: img.url, link: img.link })}
                                        className={`relative w-24 aspect-4/3 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage.url === img.url
                                            ? 'border-[#eba14d]'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`${product.product_name} thumbnail ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info Section */}
                    <div className="flex flex-col pt-4">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal mb-8 tracking-wide">
                            {product.product_name}
                        </h1>

                        <p className={`text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl ${quicksand.className}`}>
                            {product.description || `In 1989, Kamal Giria and Nilesh Giria set out with a vision to create a trusted brand in the stone industry. Their pursuit of excellence led to the establishment of Hill Top, which today stands as one of India's largest manufacturers of granite, marble, and quartz. Now flaunting over three decades of expertise, Hill Top has earned loyalty and recognition from a growing customer base across the world.`}
                        </p>

                        <div className="border-t border-white/20 pt-8 space-y-6">
                            <div className="grid grid-cols-2 pb-6 border-b border-white/10">
                                <span className="text-[#DA9C39] text-xl font-medium">Category</span>
                                <span className={`text-white/90 text-lg ${quicksand.className}`}>{product.category}</span>
                            </div>
                            <div className="grid grid-cols-2 pb-6 border-b border-white/10">
                                <span className="text-[#DA9C39] text-xl font-medium">Colour</span>
                                <span className={`text-white/90 text-lg ${quicksand.className}`}>{product.base_color || product.color_family || "N/A"}</span>
                            </div>
                            <div className="grid grid-cols-2 pb-6">
                                <span className="text-[#DA9C39] text-xl font-medium">Origin</span>
                                <span className={`text-white/90 text-lg ${quicksand.className}`}>{product.origin}</span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link href="/locate" className="inline-block">
                                <button className={`bg-[#DA9C39] text-black px-12 py-4 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95 ${quicksand.className}`}>
                                    Contact us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Section */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <div className="w-full h-px bg-white/20 mb-16"></div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal">
                            You may also like
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map((p) => (
                                <Link key={p.id} href={`/products/details/${p.id}`} className="group block">
                                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4">
                                        <Image
                                            src={p.image_url}
                                            alt={p.product_name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        <span className="text-white text-lg font-normal">
                                            {p.product_name}
                                        </span>
                                        <ArrowRight size={18} className="text-white" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Fallback dummy items for design accuracy if no related products
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10 italic">Stone Visual</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white text-lg font-normal">
                                            Cosmopolitan
                                        </span>
                                        <ArrowRight size={18} className="text-white" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="bg-[#222222] border border-white/5 p-6 rounded-4xl hover:border-[#eba14d]/20 transition-all group">
            <div className="mb-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#eba14d]/10 transition-colors">
                {icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{label}</p>
            <p className="font-bold text-white text-lg tracking-wide">{value}</p>
        </div>
    )
}