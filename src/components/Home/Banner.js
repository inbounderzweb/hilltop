"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import banner1 from "../../assets/banners/homebanner.png";
import banner3 from "../../assets/banners/homebanner2.png";
import { motion } from "framer-motion";

import { Quicksand } from "next/font/google";

// ✅ Create the font instance ONCE (outside component)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


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
        id: 3,
        image: banner3,
        title: "Where Nature Meets Precision",
        subtitle: "Engineered beauty. Natural strength.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const bannerDuration = 4500;

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, bannerDuration);
    return () => clearInterval(t);
  }, [slides.length]);

  const next = () => setActive((prev) => (prev + 1) % slides.length);
  const prev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[650px] md:h-[850px] overflow-hidden touch-pan-y">
      <motion.div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const swipeThreshold = 50;
          if (info.offset.x < -swipeThreshold) next();
          else if (info.offset.x > swipeThreshold) prev();
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={[
              "absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none",
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

            {/* Top → middle black overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-transparent h-[700px]" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-start text-center pt-[80px] md:pt-[200px] px-4">
              <h1
                className={`font-medium text-[38px] md:text-[64px] lg:text-[72px]
             bg-linear-to-b from-[#FFEFb0] via-[#E2C450] to-[#C48C38]
             bg-clip-text text-transparent
             drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]`}
              >
                {slide.title}
              </h1>

              <span className={` text-white text-[16px] lg:text-[30px] ${quicksand.className}`}>
                {slide.subtitle}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Slide Indicators / Responsive Progress Bar - Horizontal on Mobile, Vertical on Desktop */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-10 md:top-1/2 md:-translate-y-1/2 z-30 flex flex-row md:flex-col gap-10 md:translate-x-0">
        {slides.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <span className={`text-[16px] font-bold tracking-tighter transition-all duration-300 ${i === active ? 'text-[#f79421] -translate-y-1' : 'text-white'}`}>
              0{i + 1}
            </span>
            <button
              onClick={() => setActive(i)}
              className="relative w-[40px] h-[4px] md:w-[4px] md:h-[100px] bg-white rounded-full overflow-hidden transition-all hover:bg-white"
              aria-label={`Go to slide ${i + 1}`}
            >
              {/* Progress Fill */}
              {i === active && (
                <div
                  className="absolute top-0 left-0 bg-[#f79421] rounded-full shadow-[0_0_12px_rgba(247,148,33,0.7)]"
                  style={{
                    width: '100%',
                    height: '100%',
                    animation: `bannerProgressResponsive ${bannerDuration}ms linear forwards`
                  }}
                />
              )}

              {/* Completed slides */}
              {i < active && (
                <div className="absolute inset-0 bg-white" />
              )}
            </button>
          </div>
        ))
        }
      </div>

      <style jsx global>{`
        @keyframes bannerProgressResponsive {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
        
        @media (min-width: 768px) {
          @keyframes bannerProgressResponsive {
            from { transform: scaleY(0); transform-origin: top; }
            to { transform: scaleY(1); transform-origin: top; }
          }
        }
      `}</style>
    </section>
  );
}
