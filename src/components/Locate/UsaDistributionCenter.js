"use client";

import React from "react";
import { Quicksand } from "next/font/google";
import dallas from '../../assets/LocateUsimages/Dallas.jpeg'
import austin from '../../assets/LocateUsimages/austin.jpeg'
// import houston from '../../assets/LocateUsimages/houston.jpeg'
import Image from "next/image";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

const LOCATIONS = [
  {
    title: "HILLTOP STONES & INTERIORS",
    image: austin,
    subtitle: "AUSTIN, TX",
    address: "2120 Grand Ave Pkwy # 150, Austin, TX 78728, USA",
    phone: "+1 512 220 2140",
    email: "austin@hilltopgranite.com",
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1!2d-97.6709471!3d30.4575449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cf956cc67d8d%3A0xe73dc33cb775dd20!2sHilltop%20Stones%20%26%20Interiors!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
  {
    title: "HILLTOP GRANITE DALLAS",
    image: dallas,
    subtitle: "DALLAS, TX",
    address: "12401 N Stemmons Fwy #140, Farmers Branch, TX 75234, USA",
    phone: "+1 972 243 3156",
    email: "dallas@hilltopgranite.com",
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1!2d-96.9014416!3d32.9186935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c27c710736c65%3A0x980978c11876c18e!2sHilltop%20Granite%20Dallas!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
  {
    title: "HILLTOP STONES & INTERIORS",
    image: austin,
    subtitle: "HOUSTON, TX",
    address: "8760 Clay Rd Suite B, Houston, TX 77080, USA",
    phone: "+1 832 867 9053",
    email: "houston@hilltopgranite.com",
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1!2d-95.5117749!3d29.8337533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c5c75f448103%3A0x545602f0ebf1c451!2sHilltop%20Stones%20%26%20Interiors!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
];

function LocationCard({ item }) {
  return (
    <div className="min-w-0 flex flex-col h-full">
      <div className="text-white">
        <Image src={item.image} alt={item.title} width={400} height={200} className="mb-4 rounded-lg" />
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-wide leading-tight mb-3">
          {item.title}
        </p>
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-wide leading-tight">
          {item.subtitle}
        </p>
      </div>

      <p className={`mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/70 max-w-prose ${quicksand.className}`}>
        {item.address}
      </p>

      {/* Map Box */}
      {item.map_url && (
        <div className="mt-5 w-full h-[180px] rounded-xl overflow-hidden border border-white/5 shadow-inner">
          <iframe
            src={item.map_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </div>
      )}

      <div className="mt-7 space-y-4 mb-8">
        <a
          href={`tel:${item.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-3 text-white/85 hover:text-white transition"
        >
          <span className="text-[#c89b3c]">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className={`text-[15px] sm:text-[16px] ${quicksand.className}`}>{item.phone}</span>
        </a>

        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-3 text-white/85 hover:text-white transition"
        >
          <span className="text-[#c89b3c]">
            <MailIcon className="h-5 w-5" />
          </span>
          <span className={`text-[15px] sm:text-[16px] break-all ${quicksand.className}`}>{item.email}</span>
        </a>
      </div>
    </div>
  );
}

export default function UsaDistributionCenter() {
  return (
    <div className={`w-full bg-[#1b1b1b]`} id="usa">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-4xl sm:text-5xl tracking-[0.28em] font-medium">
            USA
          </h2>
        </div>

        {/* Tab + Panel */}
        <div className="relative mt-16">
          {/* Back tab (must stay ABOVE panel) */}
          <div className="z-20 flex justify-center">
            <div className="w-full max-w-5xl rounded-t-[22px] bg-[#2b2b2b] px-6 py-6 sm:px-10 sm:py-7">
              <div className="text-center text-white text-[16px] sm:text-[18px] tracking-[0.18em] font-medium">
                Experience Center
              </div>
            </div>
          </div>

          {/* Main panel (behind tab) */}
          <div className="relative rounded-b-[24px] lg:rounded-[24px] rounded-t-none lg:rounded-t-[24px] bg-[#3a3a3a] px-6 pt-10 pb-10 sm:px-12 sm:pt-16 sm:pb-12 mt-[-10px] lg:mt-[-20px] shadow-xl">
            <div className="grid gap-10 lg:grid-cols-3">
              {LOCATIONS.map((item, idx) => (
                <LocationCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}