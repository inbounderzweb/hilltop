"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// ✅ Replace these with your real images
import earthImg from "../../assets/geologicalsection/geo2.jpg";
import rockImg from "../../assets/geologicalsection/geo1.jpg";
import museumImg from "../../assets/geologicalsection/geo3.png";
import { Quicksand } from "next/font/google";

// ✅ Create the font instance ONCE (outside component)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export default function GeologicalSignaturesSection() {
  return (
    <div className="w-full bg-[#1f1f1f] text-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-0 md:px-10">
        {/* Top Heading */}
        <div className="text-center">
          <h2 className="text-[30px] md:text-[44px] font-[500] tracking-wide">
            <span className="text-[#DA9C39]">
              Geological Signatures
            </span>
          </h2>
          <p className={`mt-2 text-white text-[16px] md:text-[24px] ${quicksand.className}`}>
            Nature-Formed Materials
          </p>

          {/* Tabs */}
          <div className={`mt-6 flex flex-wrap justify-center gap-4 ${quicksand.className}`}>
            <Link href="/products/Marble" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              Marble
            </Link>
            <Link href="/products/Granite" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              Granite
            </Link>
            <Link href="/products/Quartzite" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              Quartzite
            </Link>
          </div>
        </div>

        {/* Layout Wrapper */}
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-24">
          {/* Block 1: Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 md:px-4">
            <div className="md:col-span-7">
              <Link href="/products/natural-stones" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                <div className="relative w-full h-[280px] sm:h-[320px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                  <Image
                    src={earthImg}
                    alt="Geological landscape"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="md:col-span-5 px-4 md:px-0 md:pl-4 text-center md:text-left">
              <h2 className="text-[32px] md:text-[42px] leading-[1.08] font-[500] text-white/90">
                Born Of
                <br />
                Earth’s Forces
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Forged through time, pressure, and natural processes, stone carries the quiet strength of the planet itself.
              </p>
            </div>
          </div>

          {/* Block 2: Text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 md:px-4">
            <div className="md:col-span-5 md:pr-4 order-2 md:order-1 text-center md:text-left">
              <h2 className="text-[32px] md:text-[42px] leading-[1.08] font-[500] text-white/90">
                Marked By Strokes
                <br />
                That Never Repeat
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Each pattern so unique, no two stones are ever alike.
              </p>
            </div>

            <div className="md:col-span-7 order-1 md:order-2">
              <div className="md:ml-auto md:w-[92%]">
                <Link href="/products/natural-stones" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                    <Image
                      src={rockImg}
                      alt="Natural stone"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Block 3: Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 md:px-4">
            <div className="md:col-span-7">
              <Link href="/products/natural-stones" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                <div className="relative w-full h-[280px] sm:h-[320px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                  <Image
                    src={museumImg}
                    alt="Stone as art"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </Link>
            </div>

            <div className="md:col-span-5 md:pl-4 text-center md:text-left">
              <h2 className="text-[32px] md:text-[42px] leading-[1.08] font-[500] text-white/90">
                Mother Nature&apos;s
                <br />
                Own Masterpieces
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Where raw beauty attains a form both timeless and exquisite.
              </p>
            </div>
          </div>
        </div>

        {/* Soft vignette like premium pages */}
        <div className="pointer-events-none absolute left-0 right-0 -z-10" />
      </div>
    </div>
  );
}
