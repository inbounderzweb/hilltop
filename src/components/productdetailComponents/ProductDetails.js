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
        <div className={`min-h-screen bg-[#1b1b1b] text-white py-20 ${quicksand.className}`}>
            <div className="mx-auto w-[95%] xl:w-[85%] px-4">

                {/* Navigation / Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 text-white/40 hover:text-[#eba14d] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#eba14d]/10 transition-all border border-white/5 group-hover:border-[#eba14d]/20">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-[11px]">Back to Collection</span>
                    </Link>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        <span className="hover:text-white transition-colors cursor-default">Products</span>
                        <ChevronRight size={10} />
                        <span className="hover:text-white transition-colors cursor-default">{product.category}</span>
                        <ChevronRight size={10} />
                        <span className="text-[#eba14d]">{product.product_name}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left: Gallery Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/3] w-full bg-[#222222] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
                            {activeImage.link ? (
                                <a
                                    href={activeImage.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative w-full h-full cursor-alias"
                                >
                                    <Image
                                        src={activeImage.url || product.image_url}
                                        alt={product.product_name}
                                        fill
                                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                        priority
                                    />
                                    {/* Link Indicator Overlay */}
                                    <div className="absolute top-8 right-8 bg-[#eba14d] text-black w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-subtle z-10">
                                        <ExternalLink size={20} />
                                    </div>
                                </a>
                            ) : (
                                <Image
                                    src={activeImage.url || product.image_url}
                                    alt={product.product_name}
                                    fill
                                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                    priority
                                />
                            )}

                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex flex-wrap gap-4 pt-2">
                                {allImages.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <button
                                            onClick={() => setActiveImage({ url: img.url, link: img.link })}
                                            className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage.url === img.url
                                                ? 'border-[#eba14d] scale-95 ring-4 ring-[#eba14d]/20'
                                                : 'border-white/5 grayscale-[50%] hover:grayscale-0 hover:border-white/20'
                                                }`}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`${product.product_name} gallery ${idx}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                        {img.link && (
                                            <a
                                                href={img.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`absolute -top-1 -right-1 w-7 h-7 bg-[#eba14d] text-black rounded-lg flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10 ${activeImage.url === img.url ? 'ring-2 ring-black' : ''}`}
                                                title="View Source"
                                            >
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info Section */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#eba14d]/10 border border-[#eba14d]/20 rounded-full mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#eba14d] animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#eba14d]">{product.category}</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                                    {product.product_name}
                                </h1>
                                <p className="text-white/40 text-lg leading-relaxed font-medium">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                <InfoCard
                                    icon={<Globe size={20} className="text-[#eba14d]" />}
                                    label="Origin"
                                    value={product.origin}
                                />
                                <InfoCard
                                    icon={<Palette size={20} className="text-[#eba14d]" />}
                                    label="Color Family"
                                    value={product.color_family}
                                />
                            </div>

                            <div className="pt-10 border-t border-white/5 space-y-6">
                                <div className="flex items-center gap-6">
                                    <button className="flex-1 bg-[#eba14d] text-black h-16 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#eba14d]/10 transform hover:-translate-y-1 active:scale-95">
                                        Inquire Now
                                    </button>
                                </div>
                                <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">
                                    Genuine {product.category} curated for Hilltop
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-20 border-t border-white/5">
                        <h3 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-between">
                            <span>You May Also Like</span>
                            <Link href="/products" className="text-sm text-[#eba14d] hover:text-white transition-colors flex items-center gap-2">
                                View All <ArrowRight size={16} />
                            </Link>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <Link key={p.id} href={`/products/details/${p.id}`} className="group">
                                    <div className="bg-[#222222] border border-white/5 rounded-[2rem] p-4 hover:border-[#eba14d]/20 transition-all duration-500">
                                        <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-4 bg-[#1a1a1a]">
                                            <Image
                                                src={p.image_url}
                                                alt={p.product_name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <h4 className="font-bold text-lg group-hover:text-[#eba14d] transition-colors">{p.product_name}</h4>
                                        <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-1">{p.origin}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="bg-[#222222] border border-white/5 p-6 rounded-[2rem] hover:border-[#eba14d]/20 transition-all group">
            <div className="mb-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#eba14d]/10 transition-colors">
                {icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{label}</p>
            <p className="font-bold text-white text-lg tracking-wide">{value}</p>
        </div>
    )
}