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
    ArrowRight,
    Play
} from 'lucide-react'
import Link from 'next/link'
import { Quicksand } from "next/font/google";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState({ url: null, link: null, type: 'image' });
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 1.2,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2.2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 4, spacing: 30 },
            },
        },
    });

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
                    setActiveItem({
                        url: data.product.image_url,
                        link: null,
                        type: 'image'
                    });

                    // Fetch related products (same category, or just other recent products)
                    const relatedRes = await fetch(`/api/products?t=${Date.now()}`);
                    const relatedData = await relatedRes.json();
                    if (relatedData.success) {
                        // Priority 1: Same category
                        let filtered = relatedData.products.filter(
                            p => p.category === data.product.category && p.id !== data.product.id
                        );
                        
                        // Priority 2: If same category is empty, take any other products
                        if (filtered.length === 0) {
                            filtered = relatedData.products.filter(p => p.id !== data.product.id);
                        }
                        
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

    const allItems = [
        { url: product.image_url, link: null, type: 'image' },
        ...(Array.isArray(product.gallery) ? product.gallery.map(img => ({ ...img, type: 'image' })) : []),
        ...(product.product_video_url ? [{ url: product.product_video_url, link: null, type: 'video' }] : [])
    ];

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="min-h-screen bg-[#1b1b1b] text-white py-14 md:py-20">
            <div className="mx-auto w-[92%] xl:w-[85%] max-w-[1400px]">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left: Gallery Section */}
                    <div className="space-y-6">
                        <div className="relative aspect-4/3 w-full bg-[#222222] rounded-xl overflow-hidden shadow-2xl group flex items-center justify-center">
                            {activeItem.type === 'video' ? (
                                <div className="absolute inset-0 w-full h-full">
                                    {getYouTubeId(activeItem.url) ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${getYouTubeId(activeItem.url)}?autoplay=0&controls=1`}
                                            title="Product Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video
                                            className="w-full h-full object-contain"
                                            controls
                                            src={activeItem.url}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ) : (
                                <Image
                                    src={activeItem.url || product.image_url}
                                    alt={product.product_name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}

                            {/* Navigation Arrows inside image */}
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const currentIndex = allItems.findIndex(item => item.url === activeItem.url);
                                        const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
                                        setActiveItem(allItems[prevIndex]);
                                    }}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-[#eba14d] hover:text-black transition-all pointer-events-auto"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const currentIndex = allItems.findIndex(item => item.url === activeItem.url);
                                        const nextIndex = (currentIndex + 1) % allItems.length;
                                        setActiveItem(allItems[nextIndex]);
                                    }}
                                    className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-[#eba14d] hover:text-black transition-all pointer-events-auto"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {allItems.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {allItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveItem(item)}
                                        className={`relative w-24 aspect-4/3 shrink-0 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-[#2a2a2a] ${activeItem.url === item.url
                                            ? 'border-[#eba14d]'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        {item.type === 'video' ? (
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-[#333] text-white">
                                                <Play size={24} className="fill-[#eba14d] text-[#eba14d]" />
                                                <span className="text-[10px] mt-1 font-bold">VIDEO</span>
                                            </div>
                                        ) : (
                                            <Image
                                                src={item.url}
                                                alt={`${product.product_name} thumbnail ${idx}`}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
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
                            <div className="grid grid-cols-2 pb-6 border-b border-white/10">
                                <span className="text-[#DA9C39] text-xl font-medium">Origin</span>
                                <span className={`text-white/90 text-lg ${quicksand.className}`}>{product.origin}</span>
                            </div>
                            {/* <div className="grid grid-cols-2 pb-6">
                                <span className="text-[#DA9C39] text-xl font-medium">Thickness</span>
                                <span className={`text-white/90 text-lg ${quicksand.className}`}>{product.thickness || "Standard"}</span>
                            </div> */}
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

                    <div className="relative group/slider px-2">
                        <div ref={sliderRef} className="keen-slider">
                            {relatedProducts.map((p) => (
                                <div key={p.id} className="keen-slider__slide">
                                    <Link href={`/products/details/${p.id}`} className="group block">
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
                                            <ArrowRight size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {relatedProducts.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                                    className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#DA9C39] hover:text-black transition-all z-10 opacity-0 group-hover/slider:opacity-100 hidden md:flex"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                                    className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#DA9C39] hover:text-black transition-all z-10 opacity-0 group-hover/slider:opacity-100 hidden md:flex"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
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