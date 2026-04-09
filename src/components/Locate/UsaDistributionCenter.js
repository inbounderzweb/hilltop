"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Quicksand } from "next/font/google";
import dallas from '../../assets/LocateUsimages/Dallas.jpeg';
import austin from '../../assets/LocateUsimages/austin.jpeg';
import houston from '../../assets/logos/houston.jpeg';
import Image from "next/image";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TABS = [
  { key: "austin", label: "Austin" },
  { key: "dallas", label: "Dallas" },
  { key: "houston", label: "Houston" },
];

const DATA = {
  austin: [
    {
      title: "HILLTOP STONES & INTERIORS",
      subtitle: "AUSTIN, TX",
      image: austin,
      address: "2120 Grand Ave Pkwy # 150, Austin, TX 78728, USA",
      phone: "+1 512 220 2140",
      email: "austin@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d-97.6709471!3d30.4575449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cf956cc67d8d%3A0xe73dc33cb775dd20!2sHilltop%20Stones%20%26%20Interiors!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
    }
  ],
  dallas: [
    {
      title: "HILLTOP GRANITE DALLAS",
      subtitle: "DALLAS, TX",
      image: dallas,
      address: "12401 N Stemmons Fwy #140, Farmers Branch, TX 75234, USA",
      phone: "+1 972 243 3156",
      email: "dallas@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d-96.9014416!3d32.9186935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c27c710736c65%3A0x980978c11876c18e!2sHilltop%20Granite%20Dallas!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
    }
  ],
  houston: [
    {
      title: "HILLTOP STONES & INTERIORS",
      subtitle: "HOUSTON, TX",
      image: houston,
      address: "8760 Clay Rd Suite B, Houston, TX 77080, USA",
      phone: "+1 832 867 9053",
      email: "houston@hilltopgranite.com",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d-95.5117749!3d29.8337533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c5c75f448103%3A0x545602f0ebf1c451!2sHilltop%20Stones%20%26%20Interiors!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
    }
  ]
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
    <div className={`mx-auto flex w-full max-w-5xl flex-col lg:flex-row gap-10 items-start`}>
      <div className="flex-1 text-left">
        <div className="text-white">
          <Image src={item.image} alt={item.title} width={400} height={250} className="mb-4 rounded-lg w-full h-[220px] lg:h-[300px] object-cover" />
          <div className={`text-[20px] sm:text-[24px] font-bold tracking-wide leading-tight text-[#c89b3c]`}>
            {item.title}
          </div>
          <div className={`text-[18px] sm:text-[20px] font-semibold tracking-wide leading-tight mt-1 ${quicksand.className}`}>
            {item.subtitle}
          </div>
        </div>

        <p className={`mt-6 text-[15px] sm:text-[16px] leading-relaxed text-white/70 max-w-xl ${quicksand.className}`}>
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
            <span className={`text-[16px] sm:text-[17px] font-medium ${quicksand.className}`}>{item.phone}</span>
          </a>

          <a
            href={`mailto:${item.email}`}
            className="flex items-center gap-4 text-white/80 hover:text-[#c89b3c] transition-colors group"
          >
            <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c89b3c]/10 transition-colors">
              <MailIcon className="h-5 w-5 text-[#c89b3c]" />
            </span>
            <span className={`text-[16px] sm:text-[17px] font-medium break-all ${quicksand.className}`}>{item.email}</span>
          </a>
        </div>
      </div>

      {item.map_url && (
        <div className="flex-1 w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden border border-white/5">
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

export default function UsaDistributionCenter() {
  const [active, setActive] = useState("austin");
  const items = useMemo(() => DATA?.[active] ?? [], [active]);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        if (["austin", "dallas", "houston"].includes(hash)) {
          setActive(hash);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const item = items[0];

  return (
    <div className={`w-full bg-[#1b1b1b]`} id="usa">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-4xl sm:text-5xl tracking-widest font-medium uppercase">
            USA
          </h2>
          <h3 className="text-white text-3xl sm:text-4xl mt-2 font-medium">
            Experience Centre
          </h3>
        </div>

        {/* Tabs + Panel wrapper */}
        <div className="mt-16">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="USA locations"
            className="relative z-10 mx-auto flex w-full flex-wrap max-w-5xl gap-1 sm:gap-6 justify-center"
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
                    "flex-1 rounded-t-xl sm:rounded-t-2xl rounded-b-md sm:rounded-b-lg",
                    "bg-[#2f2f2f]",
                    "px-2 py-3 sm:px-10 sm:py-6",
                    "text-[12px] min-[375px]:text-[13px] sm:text-base font-medium whitespace-normal leading-tight uppercase",
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
              "rounded-2xl sm:rounded-[32px]",
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
    </div>
  );
}