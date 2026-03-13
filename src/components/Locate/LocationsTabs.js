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
      subtitle: "PVT LTD, HEAD OFFICE",
      address:
        "No 736, Gupta House, 7th Cross Road, 3rd Block, Koramangala, Bengaluru - 560 034 Karnataka, India.",
      phone: "+91 99000 63557",
      email: "info@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5833215849!2d77.6223!3d12.9344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14434608c029%3A0x1d473489e2480e6!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
  ],
  factory: [
    {
      title: "HILLTOP STONES",
      subtitle: "INDIA GRANITE FACTORY",
      address:
        "220/2b, Thyagarasanapalli Village NH7 Hosur - Krishnagiri Road, Shoolagiri PO & Taluk Krishnagiri District, Tamilnadu - 635117 India",
      phone: "+91 89519 43587",
      email: "factory@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.895!2d78.0123!3d12.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae71!2sShoolagiri!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
  ],
  experience: [
    {
      title: "COLORS OF RAINBOW",
      subtitle: "EXPERIENCE CENTRE",
      address:
        "Sy.no.209/5B & 6B, 321/1 Gollapalli Shoolagiri PO & Taluk, Krishnagiri Tamilnadu - 635117, India",
      phone: "+91 89519 43587",
      email: "rainbow@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.8!2d78.01!3d12.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae!2sKrishnagiri!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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
    <div className={`mx-auto flex w-full max-w-5xl flex-col lg:flex-row items-start gap-10 ${quicksand.className}`}>
      <div className="flex-1 text-left">
        <div className="text-white">
          <div className="text-[20px] sm:text-[24px] font-bold tracking-wide leading-tight text-[#c89b3c]">
            {item.title}
          </div>
          <div className="text-[18px] sm:text-[20px] font-semibold tracking-wide leading-tight mt-1">
            {item.subtitle}
          </div>
        </div>

        <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-white/70 max-w-xl">
          {item.address}
        </p>

        <div className="mt-10 space-y-5">
          <a
            href={`tel:${item.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-4 text-white/80 hover:text-[#c89b3c] transition-colors group"
          >
            <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c89b3c]/10 transition-colors">
              <PhoneIcon className="h-5 w-5 text-[#c89b3c]" />
            </span>
            <span className="text-[16px] sm:text-[17px] font-medium">{item.phone}</span>
          </a>

          <a
            href={`mailto:${item.email}`}
            className="flex items-center gap-4 text-white/80 hover:text-[#c89b3c] transition-colors group"
          >
            <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c89b3c]/10 transition-colors">
              <MailIcon className="h-5 w-5 text-[#c89b3c]" />
            </span>
            <span className="text-[16px] sm:text-[17px] font-medium break-all">{item.email}</span>
          </a>
        </div>
      </div>

      {item.map_url && (
        <div className="flex-1 w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
          <iframe
            src={item.map_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </div>
      )}
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
              "rounded-none sm:rounded-[32px]",
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