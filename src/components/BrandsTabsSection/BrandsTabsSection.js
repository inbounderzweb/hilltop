


"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

/**
 * Replace these with your real logos
 * or use /public paths.
 */
import logo1 from "../../assets/logos/l1.png";
import logo2 from "../../assets/logos/l2.png";
import logo3 from "../../assets/logos/l3.png";
import logo4 from "../../assets/logos/l4.png";
import logo5 from "../../assets/logos/l5.png";

export default function BrandsTabsSection() {
  const [tab, setTab] = useState("India");

  const data = useMemo(
    () => ({
      USA: {
        signature: [
          { id: "usa-1", src: logo1, alt: "Girias Colors" },
          { id: "usa-2", src: logo2, alt: "Girias FloorEvo" },
          { id: "usa-3", src: logo3, alt: "Luminous" },
          { id: "usa-4", src: logo4, alt: "Porze" },
          { id: "usa-5", src: logo5, alt: "Quartz" },
        ],
        partnered: [
          { id: "usa-p1", src: logo1, alt: "Quartz" },
          { id: "usa-p2", src: logo2, alt: "Porze" },
          { id: "usa-p3", src: logo3, alt: "Hilltop" },
          { id: "usa-p4", src: logo4, alt: "Luminous" },
        ],
      },
      India: {
        signature: [
          { id: "in-1", src: logo1, alt: "Girias Colors" },
          { id: "in-2", src: logo2, alt: "Girias FloorEvo" },
          { id: "in-3", src: logo3, alt: "Luminous" },
          { id: "in-4", src: logo4, alt: "Porze" },
          { id: "in-5", src: logo5, alt: "Quartz" },
        //   add comments
        ],
        partnered: [
          { id: "in-p1", src: logo1, alt: "Quartz" },
          { id: "in-p2", src: logo2, alt: "Porze" },
          { id: "in-p3", src: logo3, alt: "Luminous" },
          { id: "in-p4", src: logo4, alt: "Girias Colors" },
        ],
      },
    }),
    []
  );

  const active = data[tab];

  return (
    <section className="w-full bg-[#1f1f1f] py-12 md:py-16">
      <div className="mx-auto max-w-[1300px] px-4 md:px-10">
        {/* Outer shell to match your card padding + shadow */}
        <div className="relative">
          {/* Card */}
          <div className="relative rounded-[26px] bg-[#f2ddb9] shadow-[0_18px_55px_rgba(0,0,0,0.45)] overflow-hidden">
            {/* Tabs INSIDE the card */}
            <div className="flex justify-center pt-6">
              <div className="w-full max-w-[720px] px-6 sm:px-10">
                {/* Tabs bar background (same as screenshot top strip) */}
                <div className="rounded-[18px] bg-[#f7efe2] overflow-hidden flex">
                  <Tab
                    label="USA"
                    active={tab === "USA"}
                    onClick={() => setTab("USA")}
                  />
                  <Tab
                    label="India"
                    active={tab === "India"}
                    onClick={() => setTab("India")}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-10 md:px-16 pt-10 md:pt-12 pb-12 md:pb-14">
              <SectionHeader title="Our Signature Brands" />
              <LogoGridFive items={active.signature} />

              <div className="h-10 md:h-12" />

              <SectionHeader title="Our Partnered Brands" />
              <LogoGridFour items={active.partnered} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Components ---------------- */

function Tab({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 h-[72px] md:h-[82px]", // ✅ Equal height like UI
        "flex items-center justify-center",
        "text-[#a06a22] text-[22px] md:text-[26px] font-[500]",
        "transition",
        active
          ? "bg-[#f2ddb9]" // ✅ same as card, looks embedded
          : "bg-[#f7efe2] opacity-90 hover:opacity-100",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-5 md:gap-7">
      <div className="h-[1px] flex-1 bg-[#b6842c]/55" />
      <h3 className="text-[#b6842c] text-[22px] md:text-[34px] font-[500] whitespace-nowrap">
        {title}
      </h3>
      <div className="h-[1px] flex-1 bg-[#b6842c]/55" />
    </div>
  );
}

/**
 * ✅ Signature: 5 logos row on desktop
 * Mobile/tablet auto wrap
 */
function LogoGridFive({ items }) {
  return (
    <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 items-center">
      {items.map((it) => (
        <LogoCell key={it.id} src={it.src} alt={it.alt} />
      ))}
    </div>
  );
}

/**
 * ✅ Partnered: 4 logos row on desktop
 */
function LogoGridFour({ items }) {
  return (
    <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10 items-center">
      {items.map((it) => (
        <LogoCell key={it.id} src={it.src} alt={it.alt} />
      ))}
    </div>
  );
}

function LogoCell({ src, alt }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[190px] sm:w-[210px] md:w-[240px] h-[52px] md:h-[62px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="240px"
        />
      </div>
    </div>
  );
}
