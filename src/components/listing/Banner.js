// src/components/About/AboutBanner.jsx
import React from "react";
import Image from "next/image";
import banner from "../../assets/about/banner.png";

export default function CareerBanner() {
    return (
        <section className="relative w-full h-[260px] md:h-[360px] overflow-hidden">
            {/* Background image */}
            <Image
                src={banner}
                alt="About banner"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Black gradient overlay (top → bottom) */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-6">
                <h1 className="text-[#F4E0C2] text-3xl md:text-5xl font-semibold tracking-wide">
                    Products
                </h1>
            </div>
        </section>
    );
}
