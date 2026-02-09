"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

import logo1 from "../../assets/logos/l1.png";
import logo2 from "../../assets/logos/l2.png";
import logo3 from "../../assets/logos/l3.png";
import logo4 from "../../assets/logos/l4.png";
import logo5 from "../../assets/logos/l5.png";

export default function BrandsTabsSection() {
  const [tab, setTab] = useState("India");

  // colors
  const CARD = "#f2ddb9";  // big box
  const STRIP = "#f7efe2"; // tab strip background

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
          { id: "usa-p1", src: logo2, alt: "Logo 2" },
          { id: "usa-p2", src: logo5, alt: "Logo 5" },
          { id: "usa-p3", src: logo4, alt: "Logo 4" },
          { id: "usa-p4", src: logo1, alt: "Logo 1" },
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
          { id: "in-p1", src: logo5, alt: "Logo 5" },
          { id: "in-p2", src: logo4, alt: "Logo 4" },
          { id: "in-p3", src: logo3, alt: "Logo 3" },
          { id: "in-p4", src: logo1, alt: "Logo 1" },
        ],
      },
    }),
    []
  );

  const active = data[tab];

  return (
    <section className="w-full bg-[#1f1f1f] py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        {/* MAIN CARD */}
        <div
          className="relative overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
          style={{ background: CARD, borderRadius: 38 }}
        >
          {/* TAB STRIP (INSIDE CARD) */}
          <div className="">
            <div className="mx-auto w-full">
              {/* ✅ Keep rounded strip with overflow hidden */}
              <div
                className="relative h-[86px] rounded-[26px] overflow-hidden"
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
          <div className="px-6 sm:px-10 md:px-16 pt-10 md:pt-12 pb-12 md:pb-14">
            <SectionHeader title="Our Signature Brands" />
            <LogoGrid items={active.signature} cols="lg:grid-cols-5" />

            <div className="h-10 md:h-12" />

            <SectionHeader title="Our Partnered Brands" />
            <LogoGrid items={active.partnered} cols="lg:grid-cols-4" />
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
        "relative flex-1 h-[86px]",
        "flex items-center justify-center",
        "text-[#a06a22] text-[22px] md:text-[28px] font-[500]",
        "transition-all duration-300",
        active ? "z-[2]" : "z-[1] opacity-90 hover:opacity-100",
      ].join(" ")}
      style={{
        background: active ? cardColor : stripColor,
      }}
      aria-pressed={active}
    >
      {/* ✅ Carve the INVERTED S only for the ACTIVE tab */}
      {active && (
        <>
          {/* TOP CUT (inner edge) */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              width: CUT,
              height: CUT,
              background: stripColor,
              top: 0,
              ...(isLeft ? { right: -CUT } : { left: -CUT }),
              ...(isLeft
                ? { borderBottomLeftRadius: CUT }
                : { borderBottomRightRadius: CUT }),
            }}
          />

          {/* BOTTOM CUT (inner edge) */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              width: CUT,
              height: CUT,
              background: stripColor,
              bottom: 0,
              ...(isLeft ? { right: -CUT } : { left: -CUT }),
              ...(isLeft
                ? { borderTopLeftRadius: CUT }
                : { borderTopRightRadius: CUT }),
            }}
          />
        </>
      )}

      {label}
    </button>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-5 md:gap-7">
      <div className="h-[1px] flex-1 bg-[#b6842c]/55" />
      <h3 className="text-[#b6842c] text-[22px] md:text-[36px] font-[500] whitespace-nowrap">
        {title}
      </h3>
      <div className="h-[1px] flex-1 bg-[#b6842c]/55" />
    </div>
  );
}

function LogoGrid({ items, cols }) {
  return (
    <div
      className={[
        "mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-10 items-center",
        cols,
      ].join(" ")}
    >
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-center">
          <div className="relative w-[170px] sm:w-[210px] md:w-[240px] h-[52px] md:h-[62px]">
            <Image src={it.src} alt={it.alt} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
