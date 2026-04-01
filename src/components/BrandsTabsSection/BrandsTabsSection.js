"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

import logo1 from "../../assets/logos/l1.png";
import logo2 from "../../assets/logos/l2.png";
import logo3 from "../../assets/logos/l3.png";
import logo4 from "../../assets/logos/l4.png";
import logo5 from "../../assets/logos/l5.png";
import usalogo1 from "../../assets/logos/usalogo1.png";
import usalogo2 from "../../assets/logos/usalogo2.png";
import usalogo3 from "../../assets/logos/usalogo3.png";
import newicon from "../../assets/logos/Layer_1.png";
import hilltop from '../../assets/logos/hilltop.jpeg';
import vermora from '../../assets/logos/vermora.jpeg';



export default function BrandsTabsSection() {
  const [tab, setTab] = useState("USA");

  // colors
  const CARD = "white";
  const STRIP = "#da9c3a"; // Deep neutral for a "recessed" inactive base

  const data = useMemo(
    () => ({
      USA: {
        signature: [
          { id: "usa-1", src: logo1, alt: "Logo 1" },
          { id: "usa-2", src: logo2, alt: "Logo 2" },
          { id: "usa-3", src: logo3, alt: "Logo 3" },
          { id: "usa-4", src: logo4, alt: "Logo 4" },
          { id: "usa-5", src: logo5, alt: "Logo 5" },
        ],
        partnered: [
          { id: "usa-p1", src: usalogo1, alt: "Logo 2" },
          { id: "usa-p2", src: usalogo2, alt: "Logo 5" },
          { id: "usa-p3", src: usalogo3, alt: "Logo 4" },
          { id: "usa-p4", src: newicon, alt: "New Icon" },
        ],
      },
      India: {
        signature: [
          { id: "in-1", src: logo1, alt: "Logo 1" },
          { id: "in-2", src: logo2, alt: "Logo 2" },
          { id: "in-3", src: logo3, alt: "Logo 3" },
          { id: "in-4", src: logo4, alt: "Logo 4" },
          { id: "in-5", src: logo5, alt: "Logo 5" },
        ],
        partnered: [
          { id: "in-p1", src: hilltop, alt: "Logo 5" },
          { id: "in-p2", src: vermora, alt: "Logo 4" },
          // { id: "in-p3", src: logo3, alt: "Logo 3" },
          // { id: "in-p4", src: logo1, alt: "Logo 1" },
        ],
      },
    }),
    []
  );

  const active = data[tab];

  return (
    <section className="w-full py-8 md:py-12 ">
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN CARD */}
        <div
          className="relative overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
          style={{ background: CARD }}
        >
          {/* TAB STRIP (INSIDE CARD) */}
          <div className="">
            <div className="mx-auto w-full">
              {/* ✅ Keep rounded strip with overflow hidden */}
              <div
                className="relative h-[50px] md:h-[86px] overflow-hidden"
                style={{ background: STRIP }}
              >
                {/* ✅ Inner flex MUST be overflow-visible so the “S” cutouts can show */}
                <div className="absolute inset-0 flex overflow-visible">
                  <InvertedSTab
                    label="USA"
                    side="left"
                    active={tab === "USA"}
                    onClick={() => setTab("USA")}
                    cardColor={CARD}
                    stripColor={STRIP}
                  />
                  <InvertedSTab
                    label="India"
                    side="right"
                    active={tab === "India"}
                    onClick={() => setTab("India")}
                    cardColor={CARD}
                    stripColor={STRIP}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-2 sm:px-5 md:px-16 pt-4 md:pt-12 pb-4 md:pb-14">
            <SectionHeader title="Our Signature Brands" />
            <LogoGrid items={active.signature} />

            <div className="h-4 md:h-12" />

            <SectionHeader title="Our Partnered Brands" />
            <LogoGrid items={active.partnered} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ✅ Inverted “S” join:
 * We carve the active tab using TWO cutouts on the inner edge:
 * - top cutout
 * - bottom cutout
 *
 * IMPORTANT: This must NOT be clipped by overflow-hidden on the flex container.
 */
function InvertedSTab({ label, active, onClick, cardColor, stripColor, side }) {
  const CUT = 26; // size of the S curves (try 24/26/28 to match exactly)

  const isLeft = side === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex-1 h-[50px] md:h-[86px] overflow-hidden",
        "flex items-center justify-center transition-all duration-700 text-[22px] md:text-[28px]",
        active
          ? "text-white font-bold"
          : "text-[#DA9C39] font-medium"
      ].join(" ")}
      style={{
        background: active ? stripColor : cardColor,
      }}
      aria-pressed={active}
    >
      <span className="relative flex flex-col items-center">
        {label}
        <span
          className={[
            "mt-1 w-12 h-[3px] bg-white rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(255,255,255,0.7)]",
            active ? "translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-0"
          ].join(" ")}
        />
      </span>
    </button>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-5 md:gap-7">
      <div className="h-px flex-1 bg-[#b6842c]/55" />
      <h3 className="text-[#b6842c] text-[22px] md:text-[36px] font-medium whitespace-nowrap">
        {title}
      </h3>
      <div className="h-px flex-1 bg-[#b6842c]/55" />
    </div>
  );
}

function LogoGrid({ items }) {
  return (
    <div className="mt-3 md:mt-12 flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-6 md:gap-y-12">
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-center px-4">
          <div className="relative w-[110px] sm:w-[160px] md:w-[200px] h-[42px] md:h-[52px]">
            <Image src={it.src} alt={it.alt} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
