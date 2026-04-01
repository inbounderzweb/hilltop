"use client";

import React from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";

import armaImg from "../../assets/about/armaan.png";
import parasImg from "../../assets/about/parasimg.png";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const leaders = [

  {
    name: "Armaan",
    role: "DIRECTOR",
    location: "India | USA",
    img: armaImg, // replace
  },
  {
    name: "Paras Ghorawat",
    role: "General Manager India",
    location: "India | USA",
    img: parasImg, // replace
  }
];

export default function VisionaryLeaders() {
  return (
    <section className="relative w-full overflow-hidden py-10 md:py-16">
      {/* Background (same vibe as your ref) */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Title */}
        <h2 className="text-center text-white text-[42px] md:text-[56px] leading-tight tracking-wide font-medium [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
          Our Visionary Leaders
        </h2>

        {/* Cards */}
        <div className="mt-10 md:mt-16 flex flex-wrap justify-center gap-8 lg:gap-12">
          {leaders.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center w-full sm:w-[320px] group">
              {/* Image box */}
              <div className="relative w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#D9D9D9] shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                {/* If you don’t have images yet, keep the grey box by leaving Image commented */}
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-fit transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                />
              </div>

              {/* Text */}
              <div className={`mt-6 text-center ${quicksand.className}`}>
                <div className="text-white text-[20px] md:text-[22px] font-bold tracking-wide">
                  {p.name}
                </div>
                <div className="mt-1 text-white/85 text-[16px] md:text-[17px] tracking-[0.18em] font-medium">
                  {p.role}
                </div>
                <div className="mt-1 text-white/70 text-[16px] md:text-[17px] font-normal">
                  {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
