"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// ✅ Replace with your background images
import globeBg from "../../assets/banners/globe.png";
import globbgmobile from "../../assets/banners/globemobilebg.png";

function useInViewRepeat(threshold = 0.45) {
  const ref = useRef(null);
  const [inViewTick, setInViewTick] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewTick((t) => t + 1);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inViewTick };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp({ to, duration = 1200, tick }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    // setVal(0);

    const loop = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, tick]);

  return val;
}

function formatWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function TrustCountersSection() {
  const { ref, inViewTick } = useInViewRepeat(0.5);

  const stats = useMemo(
    () => [
      { to: 36, suffix: "+", label: "Years Expertise" },
      { to: 500, suffix: "+", label: "Stone Variants" },
      { to: 65, suffix: "+", label: "Countries Served" },
      { to: 8000, suffix: "+", label: "Satisfied Customers" },
    ],
    []
  );

  const v0 = useCountUp({ to: stats[0].to, duration: 1100, tick: inViewTick });
  const v1 = useCountUp({ to: stats[1].to, duration: 1200, tick: inViewTick });
  const v2 = useCountUp({ to: stats[2].to, duration: 1150, tick: inViewTick });
  const v3 = useCountUp({ to: stats[3].to, duration: 1400, tick: inViewTick });

  const values = [v0, v1, v2, v3];

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#1f1f1f]">
      {/* Background images */}
      <div className="absolute inset-0">
        {/* Desktop BG */}
        <Image
          src={globeBg}
          alt="Global network background"
          fill
          className="hidden md:block object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* Mobile BG */}
        <Image
          src={globbgmobile}
          alt="Global network background mobile"
          fill
          className="block md:hidden object-cover"
          sizes="100vw"
          priority={false}
        />

        {/* overlays (premium) */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 to-black/60" />
      </div>

      {/* Content */}
        <div
          className="
          relative mx-auto max-w-350 px-4 md:px-10
          py-16 md:py-24
          min-h-185 md:min-h-130
          flex flex-col
        "
      >
        {/* Headline */}
     <div className="text-center">
  <h2
    className="
      text-white/95 font-medium
      leading-tight tracking-wide
      text-[34px] md:text-[52px]
    "
  >
    A Legacy of Trust <br className="hidden md:block" />
    Revered Across the <br className="md:hidden" />
    World
  </h2>
</div>

        {/* ✅ MOBILE layout (like screenshot): stacked single column */}
        <div className="mt-14 md:hidden flex flex-col items-center gap-16">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center">
              <div className="font-medium text-white leading-none text-[64px]">
                {formatWithCommas(values[idx])}
                {s.suffix}
              </div>
              <div className="mt-4 text-white/75 text-[18px] tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP layout (4 columns) */}
        <div className="hidden md:grid mt-14 grid-cols-4 gap-y-0">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center">
              <div className="font-medium text-white leading-none text-[84px]">
                {formatWithCommas(values[idx])}
                {s.suffix}
              </div>
              <div className="mt-2 text-white/70 text-[16px] tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
