// src/components/About/AboutBanner.jsx
import React from "react";
import Image from "next/image";
import banner from "../../assets/banners/commonBanner.png";

export default function ProductDetailComponent() {
    return (
        <section className="relative w-full h-[320px] md:h-[480px]">
            {/* Background image */}
            <Image
                src={banner}
                alt="Product details banner"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
            />

            {/* Black gradient overlay (top → bottom) */}
            <div
                className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="absolute bottom-[-10px] md:bottom-[-20px] left-0 right-0 z-10 px-6 text-center">
                <h2 className="text-[#F4E0C2] font-semibold">
                    Product Details
                </h2>
            </div>
        </section>
    );
}
