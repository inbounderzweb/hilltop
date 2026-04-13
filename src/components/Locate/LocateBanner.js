import React from "react";
import Image from "next/image";
import banner from "../../assets/banners/commonBanner.png";

export default function LocateBanner() {
  return (
    <section className="relative w-full h-[400px] md:h-[600px] z-20">
      {/* Background image */}
      <Image
        src={banner}
        alt="Locate Us banner"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Gradient overlay (only at bottom to keep logo bright) */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none z-[5]" />

      {/* Content */}
      <div className="absolute bottom-0 md:bottom-[-5px] left-0 right-0 z-10 px-6 text-center">
        <h2 className="text-[#F4E0C2] text-4xl md:text-xl font-light tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Locate Us
        </h2>
      </div>
    </section>
  );
}
