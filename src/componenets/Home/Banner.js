"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import banner1 from "../../assets/banners/homebanner.png";
import banner2 from "../../assets/banners/homebanner1.png";
import banner3 from "../../assets/banners/homebanner2.png";

export default function FadeBanner() {
  const slides = useMemo(
    () => [
      {
        id: 1,
        image: banner1,
        title: "An Artistry Born Of The Earth",
        subtitle: "Formed with time. Finished with perfection.",
      },
      {
        id: 2,
        image: banner2,
        title: "Stone That Defines Luxury",
        subtitle: "Crafted for timeless spaces.",
      },
      {
        id: 3,
        image: banner3,
        title: "Where Nature Meets Precision",
        subtitle: "Engineered beauty. Natural strength.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[620px] md:h-[820px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />

          {/* ✅ NEW: Top → middle black overlay (black to transparent) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent h-[600px]" />

          {/* Existing vignette overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" /> */}

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-start text-center pt-[150px] md:pt-[180px] px-4">
         <h1
  className="font-[500] tracking-wide text-[34px] md:text-[56px] lg:text-[64px] leading-tight
             bg-[linear-gradient(180deg,#FFEFb0_0%,#E2C450_46%,#C48C38_100%)]
             bg-clip-text text-transparent
             drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
>
  {slide.title}
</h1>

            <p className="mt-3 text-white/80 text-[16px] md:text-[20px] lg:text-[22px]">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
