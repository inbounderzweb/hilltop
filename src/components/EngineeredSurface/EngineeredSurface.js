"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// ✅ Replace these with your real images
import eng1 from "@/assets/engineeredSec/eng3.png";
import eng2 from "@/assets/engineeredSec/eng2.png";
import eng3 from "@/assets/engineeredSec/masterpiece.png";


import { Quicksand } from "next/font/google";

// ✅ Create the font instance ONCE (outside component)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});




export default function EngineeredSurface() {
  return (
    <div className="w-full bg-[#1f1f1f] text-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] md:px-10 py-14">
        {/* Top Heading */}
        <div className="text-center">
          <h2 className="text-[30px] md:text-[44px] font-medium tracking-wide">
            <span className="text-[#DA9C39]">
              Engineered Surfaces
            </span>
          </h2>

          <p className={`mt-2 text-white text-[16px] md:text-[24px] ${quicksand.className}`}>
            Precision-Crafted Materials
          </p>

          {/* Tabs */}
          <div className={`mt-6 flex flex-wrap justify-center gap-4 ${quicksand.className}`}>
            <Link href="/products/Quartz" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              Quartz
            </Link>
            <Link href="/products/Porcelain" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              Porcelain
            </Link>
            <Link href="/products/SPC" className="px-8 py-2 rounded-lg text-white/80 bg-[#2d2d2d] border border-white/10 hover:border-white/30 hover:text-white transition-all text-[15px] tracking-wide">
              SPC
            </Link>
          </div>
        </div>

        {/* Layout Wrapper */}
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-24">
          {/* Block 1: Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-2">
            <div className="md:col-span-7">
              <Link href="/products/engineered-surfaces" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                  <Image
                    src={eng1}
                    alt="Engineering image - 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="md:col-span-5 md:pl-4 text-center md:text-left">
              <h2 className="leading-[1.08] font-medium text-white/90">
                Composed
                <br />
                Discovery
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Created through intention. Minerals are measured, balanced, and refined.
              </p>
            </div>
          </div>

          {/* Block 2: Text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-2">
            <div className="md:col-span-5 md:pr-4 order-2 md:order-1 text-center md:text-left">
              <h2 className="leading-[1.08] font-medium text-white/90">
                Where Science
                <br />
                Shapes Strength
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Structural stability, durability, and uniform performance through calibrated pressure and controlled heat.              </p>
            </div>

            <div className="md:col-span-7 order-1 md:order-2">
              {/* slight offset like reference */}
              <div className="md:ml-auto md:w-[92%]">
                <Link href="/products/engineered-surfaces" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                  <div className="relative w-full h-[220px] sm:h-[280px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                    <Image
                      src={eng2}
                      alt="Engineering image - 2"
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-2">
            <div className="md:col-span-7">
              <Link href="/products/engineered-surfaces" className="relative w-full overflow-hidden rounded-[18px] block cursor-pointer group">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[420px] transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                  <Image
                    src={eng3}
                    alt="Engineering image - 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </Link>
            </div>

            <div className="md:col-span-5 md:pl-4 text-center md:text-left">
              <h2 className="leading-[1.08] font-medium text-white/90">
                Human Ingenuity’s
                <br />
                Own Masterpieces
              </h2>
              <p className={`mt-4 text-white text-[14px] md:text-[15px] leading-relaxed ${quicksand.className}`}>
                Born of human ingenuity, shaped by choice into consistent strength, refined clarity, and performance.              </p>
            </div>
          </div>
        </div>

        {/* Soft vignette like premium pages */}
        <div className="pointer-events-none absolute left-0 right-0 -z-10" />
      </div>
    </div>
  );
}
