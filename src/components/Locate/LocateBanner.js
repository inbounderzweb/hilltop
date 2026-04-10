import React from "react";
import Image from "next/image";
import banner from "../../assets/banners/commonBanner.png";

export default function LocateBanner() {
  return (
    <section className="relative w-full h-[320px] md:h-[480px]">
      {/* Background image */}
      <Image
        src={banner}
        alt="Locate Us banner"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Content */}
      <div className="absolute bottom-[-10px] md:bottom-[-20px] left-0 right-0 z-10 px-6 text-center">
        <h2 className="text-[#F4E0C2] text-4xl md:text-7xl font-light tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Locate Us
        </h2>
      </div>
    </section>
  );
}
