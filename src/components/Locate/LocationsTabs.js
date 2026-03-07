"use client";

import React, { useMemo, useState } from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TABS = [
  { key: "hq", label: "Head Quarters" },
  { key: "factory", label: "Factory" },
  { key: "experience", label: "Experience Centre" },
];

const DATA = {
  hq: [
    {
      title: "HILLTOP STONES",
      subtitle: "PVT LTD, INDIA",
      address:
        "No 736, Gupta House, 7th Cross Road,3rd Block, Koramangala, Bengaluru - 560 034 Karnataka, India.",
      phone: "+91 80 2222 7778",
      email: "banglore@hilltopgranite.com",
    },
  ],
  factory: [
    {
      title: "HILLTOP STONES",
      subtitle: "INDIA GRANITE, FACTORY",
      address:
        "220/2b, Thyagarasanapalli Village NH7 Hosur - Krishnagiri Road, Shoolagiri PO & Taluk Krishnagiri District, Tamilnadu - 635117 India",
      phone: "+91 80 2222 7778",
      email: "banglore@hilltopgranite.com",
    },
  ],
  experience: [
    {
      title: "COLORS OF RAINBOW",
      subtitle: "FACTORY",
      address:
        "Sy.no.209/5B & 6B, 321/1 Gollapalli Shoolagiri PO & Taluk, Krishnagiri Tamilnadu - 635117, India",
      phone: "+91 80 2222 7778",
      email: "banglore@hilltopgranite.com",
    },
  ],
};

function PhoneIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 16.5v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.64-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 1.5 3.18 2 2 0 0 1 3.49 1h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.51a2 2 0 0 1-.45 2.11L7.6 8.4a16 16 0 0 0 8 8l1.06-1.0a2 2 0 0 1 2.11-.45c.81.24 1.65.42 2.51.54A2 2 0 0 1 21 16.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m22 8-10 7L2 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationCardCentered({ item }) {
  return (
    <div className={`mx-auto flex w-full max-w-2xl flex-col items-center text-center ${quicksand.className}`}>
      <div className="text-white">
        <div className="text-[18px] sm:text-[20px] font-semibold tracking-wide leading-tight">
          {item.title}
        </div>
        <div className="text-[18px] sm:text-[20px] font-semibold tracking-wide leading-tight">
          {item.subtitle}
        </div>
      </div>

      <p className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-white/70 max-w-xl">
        {item.address}
      </p>

      <div className="mt-8 space-y-4">
        <a
          href={`tel:${item.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-3 text-white/80 hover:text-white"
        >
          <span className="text-[#c89b3c]">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="text-[15px] sm:text-[16px]">{item.phone}</span>
        </a>

        <a
          href={`mailto:${item.email}`}
          className="flex items-center justify-center gap-3 text-white/80 hover:text-white"
        >
          <span className="text-[#c89b3c]">
            <MailIcon className="h-5 w-5" />
          </span>
          <span className="text-[15px] sm:text-[16px] break-all">{item.email}</span>
        </a>
      </div>
    </div>
  );
}

export default function IndiaLocationsTabs() {
  const [active, setActive] = useState("factory");
  const items = useMemo(() => DATA?.[active] ?? [], [active]);

  // since you said each tab currently has only ONE address, we take first item
  const item = items[0];

  return (
    <section className={`w-full bg-[#1b1b1b] ${quicksand.className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-3xl sm:text-4xl tracking-[0.25em] font-medium">
            INDIA
          </h2>
        </div>

        {/* Tabs + Panel wrapper */}
        <div className="mt-10 sm:mt-12">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="India locations"
            className="relative z-10 mx-auto flex w-full max-w-5xl gap-2 sm:gap-6 justify-center"
          >
            {TABS.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={[
                    "flex-1 rounded-t-2xl rounded-b-md sm:rounded-b-lg",
                    "bg-[#2f2f2f]",
                    "px-4 py-3 sm:px-10 sm:py-6",
                    "text-sm sm:text-base font-medium",
                    "transition",
                    isActive ? "text-[#c89b3c]" : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Main Panel */}
          <div
            role="tabpanel"
            className={[
              "relative",
              "mt-[-10px] sm:mt-[-14px]",
              "rounded-[0px] sm:rounded-[32px]",
              "bg-[#2f2f2f]",
              "px-6 py-12 sm:px-12 sm:py-14",
            ].join(" ")}
          >
            {item ? (
              <LocationCardCentered item={item} />
            ) : (
              <div className="text-center text-white/70">No address available.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}