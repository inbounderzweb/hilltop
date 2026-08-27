"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRight, Globe, MapPin, Phone, X } from "lucide-react";

import logo1 from "../../assets/logos/l1.png";
import logo2 from "../../assets/logos/l2.png";
import logo3 from "../../assets/logos/l3.png";
import logo4 from "../../assets/logos/l4.png";
import logo5 from "../../assets/logos/l5.png";
import usalogo1 from "../../assets/logos/usalogo1.png";
import usalogo2 from "../../assets/logos/usalogo2.png";
import usalogo3 from "../../assets/logos/usalogo3.svg";
import newicon from "../../assets/logos/Layer_1.png";
import hilltop from '../../assets/logos/hilltop.png';
import vermora from '../../assets/logos/vermora.jpeg';
import veneta_cucine from '../../assets/logos/veneta_cucine.png';



export default function BrandsTabsSection() {
  const [tab, setTab] = useState("USA");
  const [selectedBrand, setSelectedBrand] = useState(null);

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
          { id: "usa-p1", src: usalogo1, alt: "Logo 2",title: "Visit Atlas Concorde", href: "https://www.atlasconcorde.com/en" },
          { id: "usa-p2", src: usalogo2, alt: "Logo 5",title: "Visit ABK Ceramiche", href: " https://www.abk.it/en" },
          { id: "usa-p3", src: usalogo3, alt: "Logo 4",title: "Visit Versace Ceramics", href: "https://www.versace-ceramics.com/en" },
          { id: "usa-p4", src: veneta_cucine, alt: "veneta_cucine",title: "Visit Veneta Cucine", href: "https://www.venetacucine.com/en" },
          {
            id: "usa-p5",
            src: newicon,
            alt: "Neolith",
            title: "Open Neolith dealers",
            brand: "Neolith",
            details: {
              heading: "Authorized Fabricator in Texas",
              website: "https://www.neolith.com",
              rows: [
                {
                  name: "Hartstone Studio",
                  address: "1834 Ferguson Ln Ste 1501, Austin, TX 78754",
                  phone: "+1-512-298-7765",
                  maps: "https://www.google.com/maps/search/?api=1&query=1834+Ferguson+Ln+Ste+1501,+Austin,+TX+78754",
                  tel: "tel:+15122987765",
                },
                {
                  name: "Alpha Granite",
                  address: "915 W Howard Ln, Austin, TX 78753, United States",
                  phone: "+1 512-834-8746",
                  maps: "https://www.google.com/maps/search/?api=1&query=915+W+Howard+Ln,+Austin,+TX+78753,+United+States",
                  tel: "tel:+15128348746",
                },
                {
                  name: "Travertine Artisans",
                  address: "10208 N FM 620 #3A, Austin, TX 78726, United States",
                  phone: "+1 512-249-2222",
                  maps: "https://www.google.com/maps/search/?api=1&query=10208+N+FM+620+%233A,+Austin,+TX+78726,+United+States",
                  tel: "tel:+15122492222",
                },
                {
                  name: "Pietra Granite",
                  address: "203 W Nakoma Dr, San Antonio, TX 78216, United States",
                  phone: "+1 210-782-2723",
                  maps: "https://www.google.com/maps/search/?api=1&query=203+W+Nakoma+Dr,+San+Antonio,+TX+78216,+United+States",
                  tel: "tel:+12107822723",
                },
                {
                  name: "Alamo Tile & Stone",
                  address: "1171 Empire Central Dr. Dallas, TX 75247",
                  phone: "(214) 638-8350",
                  maps: "https://www.google.com/maps/search/?api=1&query=1171+Empire+Central+Dr.,+Dallas,+TX+75247",
                  tel: "tel:+12146388350",
                },
              ],
            },
          }
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
  const selectedDetails = selectedBrand?.details;

  return (
    <section className="w-full py-8 md:py-12 ">
      <div className="mx-auto w-full" style={{ maxWidth: "1400px" }}>
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
                className="relative overflow-hidden"
                style={{ height: "50px", background: STRIP }}
              >
                {/* ✅ Inner flex MUST be overflow-visible so the “S” cutouts can show */}
                <div className="absolute inset-0 flex overflow-visible">
                  <InvertedSTab
                    label="USA"
                    side="left"
                    active={tab === "USA"}
                    onClick={() => {
                      setTab("USA");
                      setSelectedBrand(null);
                    }}
                    cardColor={CARD}
                    stripColor={STRIP}
                  />
                  <InvertedSTab
                    label="India"
                    side="right"
                    active={tab === "India"}
                    onClick={() => {
                      setTab("India");
                      setSelectedBrand(null);
                    }}
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

            {tab === "USA" && (
              <>
                <div className="h-4 md:h-12" />
                <SectionHeader title="Our Partnered Brands" />
                <LogoGrid items={active.partnered} onNeolithClick={setSelectedBrand} />
              </>
            )}
          </div>
        </div>
      </div>

      {selectedDetails && (
        <NeolithDealerModal
          brand={selectedBrand}
          details={selectedDetails}
          onClose={() => setSelectedBrand(null)}
        />
      )}
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
function InvertedSTab({ label, active, onClick, cardColor, stripColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex-1 overflow-hidden",
        "flex items-center justify-center transition-all duration-700 text-[22px] md:text-[28px]",
        active
          ? "text-white font-bold"
          : "text-[#DA9C39] font-medium"
      ].join(" ")}
      style={{
        height: "50px",
        background: active ? stripColor : cardColor,
      }}
      aria-pressed={active}
    >
      <span className="relative flex flex-col items-center">
        {label}
        <span
          className={[
            "mt-1 w-12 bg-white rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(255,255,255,0.7)]",
            active ? "translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-0"
          ].join(" ")}
          style={{ height: "3px" }}
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

function LogoGrid({ items, onNeolithClick }) {
  return (
    <div className="mt-3 md:mt-12 flex flex-wrap justify-center items-center gap-x-12 md:gap-x-24 gap-y-10 md:gap-y-16">
      {items.map((it) => {
        const logo = (
          <div
            className="relative"
            style={{ width: "140px", height: "55px" }}
          >
            <Image src={it.src} alt={it.alt} fill className="object-contain" />
          </div>
        );

        return (
          <div key={it.id} className="flex items-center justify-center">
            {it.brand === "Neolith" ? (
              <button
                type="button"
                onClick={() => onNeolithClick?.(it)}
                className="group inline-flex cursor-pointer items-center justify-center rounded-md transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA9C39]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={`${it.title}. Opens the Neolith dealer panel.`}
              >
                <span className="flex flex-col items-center">
                  {logo}
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1f1f1f]/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DA9C39]" />
                    View Fabricators
                  </span>
                </span>
              </button>
            ) : it.href ? (
              <a
                href={it.href.trim()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${it.title}. Opens in a new tab.`}
                title={`${it.title}. Opens in a new tab.`}
                className="group inline-flex cursor-pointer items-center justify-center rounded-md transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA9C39]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {logo}
              </a>
            ) : (
              <div className="inline-flex items-center justify-center rounded-md">
                {logo}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NeolithDealerModal({ brand, details, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close Neolith dealer panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
      />

      <div className="relative z-10 w-full overflow-hidden rounded-[22px] bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] border border-[#DA9C39]/20" style={{ maxWidth: "560px" }}>
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div>
            <h3 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-white">
              {brand?.brand || "Neolith"}
            </h3>
            <p className="mt-1 text-[15px] md:text-[16px] text-white/70">
              {details.heading}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 pb-5">
          <div className="h-px bg-white/10" />
        </div>

        <div className="max-h-[65vh] overflow-auto px-4 pb-2 sm:px-6">
          <div className="space-y-5">
            {details.rows.map((row) => (
              <div key={row.name} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/10 pb-5 last:border-b-0">
                <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-md bg-[#DA9C39] text-white shadow-sm">
                  <MapPin size={20} fill="currentColor" />
                </div>

                <div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="pr-2">
                      <h4 className="text-[18px] font-semibold text-white">{row.name}</h4>
                      <p className="mt-1 text-[15px] leading-relaxed text-white/75 opacity-100">
                        {row.address}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[15px] text-white">
                        <Phone size={16} />
                        <a href={row.tel} className="hover:underline">
                          {row.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-row gap-3 md:flex-col md:items-stretch" style={{ minWidth: "140px" }}>
                      <a
                        href={row.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-black px-4 py-3 text-[14px] font-medium text-white transition hover:bg-white/10"
                      >
                        <MapPin size={16} />
                        Directions
                      </a>
                      <a
                        href={row.tel}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DA9C39] px-4 py-3 text-[14px] font-medium text-white transition hover:bg-black"
                      >
                        <Phone size={16} />
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-black px-6 py-4">
          <a
            href={details.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] text-white transition hover:text-[#DA9C39]"
          >
            <Globe size={18} />
            Learn more about Neolith
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
