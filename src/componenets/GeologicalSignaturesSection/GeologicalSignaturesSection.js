"use client";

import React from "react";
import Image from "next/image";

// ✅ Replace these with your real images
import earthImg from "../../assets/geologicalsection/geo1.jpg";
import rockImg from "../../assets/geologicalsection/geo2.jpg";
import museumImg from "../../assets/geologicalsection/geo3.png";

export default function GeologicalSignaturesSection() {
  return (
    <section className="w-full bg-[#1f1f1f] text-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 py-14 md:py-20">
        {/* Top Heading */}
        <div className="text-center">
          <h2 className="text-[30px] md:text-[44px] font-[500] tracking-wide">
            <span className="bg-gradient-to-r from-[#ffefb0] via-[#e2c450] to-[#c48c38] bg-clip-text text-transparent">
              Geological Signatures
            </span>
          </h2>
          <p className="mt-2 text-white/65 text-[14px] md:text-[16px]">
            Nature-Formed Materials
          </p>
        </div>

        {/* Layout Wrapper */}
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-24">
          {/* Block 1: Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <div className="relative w-full overflow-hidden rounded-[0px]">
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px]">
                  <Image
                    src={earthImg}
                    alt="Geological landscape"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:pl-4">
              <h3 className="text-[34px] md:text-[44px] leading-[1.08] font-[500] text-white/90">
                Born of
                <br />
                Earth&apos;s Forces
              </h3>
              <p className="mt-4 text-white/60 text-[14px] md:text-[15px] leading-relaxed max-w-[360px]">
                Forged through time, pressure, and natural processes, stone carries
                the quiet strength of the planet itself.
              </p>
            </div>
          </div>

          {/* Block 2: Text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 md:pr-4 order-2 md:order-1">
              <h3 className="text-[34px] md:text-[44px] leading-[1.08] font-[500] text-white/90">
                Marked By Strokes
                <br />
                That Never Repeat
              </h3>
              <p className="mt-4 text-white/60 text-[14px] md:text-[15px] leading-relaxed max-w-[360px]">
                Each pattern so unique, no two stones are ever alike.
              </p>
            </div>

            <div className="md:col-span-7 order-1 md:order-2">
              {/* slight offset like reference */}
              <div className="md:ml-auto md:w-[92%]">
                <div className="relative w-full overflow-hidden rounded-[0px]">
                  <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px]">
                    <Image
                      src={rockImg}
                      alt="Natural stone"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <div className="relative w-full overflow-hidden rounded-[0px]">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px]">
                  <Image
                    src={museumImg}
                    alt="Stone as art"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:pl-4">
              <h3 className="text-[34px] md:text-[44px] leading-[1.08] font-[500] text-white/90">
                Mother Nature&apos;s
                <br />
                Own Masterpieces
              </h3>
              <p className="mt-4 text-white/60 text-[14px] md:text-[15px] leading-relaxed max-w-[360px]">
                Where raw beauty attains a form both timeless and exquisite.
              </p>
            </div>
          </div>
        </div>

        {/* Soft vignette like premium pages */}
        <div className="pointer-events-none absolute left-0 right-0 -z-10" />
      </div>
    </section>
  );
}
