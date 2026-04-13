"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/logos/logo.svg";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`w-full bg-[#1E1E1E] text-white border-t border-[#2e2e2e] ${montserrat.className}`}>
      <div className="mx-auto max-w-[1400px] px-8 md:px-12 py-14">
        {/* Main Grid */}
        <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_1.1fr] gap-16 items-start">

          {/* Column 1: Brand & Contact */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-[180px]">
                <Image src={logo} alt="HILLTOP" className="h-auto w-full -ml-3" priority />
              </div>
            </div>

            <div className="space-y-7">
              <div>
                <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3 text-white">India</h5>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                  <Link href="/locate#hq" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Head Office</Link>
                  <span className="text-[#C9A84C] opacity-30 text-[10px]">|</span>
                  <Link href="/locate#factory" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Factory</Link>
                  <span className="text-[#C9A84C] opacity-30 text-[10px]">|</span>
                  <Link href="/locate#experience" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Experience Centre</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:sales@hilltopgranite.com" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                    <EmailIcon size={14} />
                    <span>sales@hilltopgranite.com</span>
                  </a>
                  <a href="tel:+919900064364" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                    <PhoneIcon size={14} />
                    <span>+91 99000 64364</span>
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3 text-white">USA</h5>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                  <Link href="/locate#usa" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Experience Centre</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:info@hilltopgranite.com" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                    <EmailIcon size={14} />
                    <span>info@hilltopgranite.com</span>
                  </a>
                  <a href="tel:+17137308818" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                    <PhoneIcon size={14} />
                    <span>+1713-730-8818</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6 font-mono text-white">Quick Links</h4>
            <div className="flex flex-col gap-3.5">
              <FooterLinkGold href="/about">Our Story</FooterLinkGold>
              {/* <FooterLinkGold href="/products">Products</FooterLinkGold> */}
              <FooterLinkGold href="/career">Career</FooterLinkGold>
              <FooterLinkGold href="/blogs">Blog & FAQ</FooterLinkGold>
              <FooterLinkGold href="https://hilltopstones.stoneprofitsweb.com/">Live Inventory</FooterLinkGold>
              <FooterLinkGold href="/privacy-policy">Privacy Policy</FooterLinkGold>
              <FooterLinkGold href="/disclaimer">Disclaimer</FooterLinkGold>
              <FooterLinkGold href="/terms-and-conditions">Terms & Conditions</FooterLinkGold>
            </div>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6 font-mono text-white">Product Categories</h4>
            <div className="flex flex-col gap-3.5">
              <FooterLinkGold href="/products?category=Granite">Granite</FooterLinkGold>
              <FooterLinkGold href="/products?category=Marble">Marble</FooterLinkGold>
              {/* <FooterLinkGold href="/products?category=Onyx">Onyx</FooterLinkGold> */}
              <FooterLinkGold href="/products?category=Porcelain">Porcelain</FooterLinkGold>
              <FooterLinkGold href="/products?category=Quartz">Quartz</FooterLinkGold>
              <FooterLinkGold href="/products?category=Quartzite">Quartzite</FooterLinkGold>
              <FooterLinkGold href="/products?category=Spc">Spc</FooterLinkGold>
            </div>
          </div>

          {/* Column 4: Follow Us & Subscribe */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6 font-mono text-white">Follow Us</h4>
            <div className="flex flex-col gap-4 mb-9">
              <SocialLinkGold href="https://instagram.com/hilltopgraniteofficial" label="Instagram" icon={<InstagramIcon size={18} />} />
              <SocialLinkGold href="https://facebook.com/HilltopGraniteBangalore" label="Facebook" icon={<FacebookIcon size={18} />} />
              <SocialLinkGold href="https://youtube.com/@hilltopgraniteofficial7267" label="YouTube" icon={<YoutubeIcon size={18} />} />
              <SocialLinkGold href="https://linkedin.com/company/hilltopstones" label="LinkedIn" icon={<LinkedinIcon size={18} />} />
            </div>

            <div className="pt-7 border-t border-[#333]">
              <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1.5 font-mono text-white">Subscribe</h4>
              {/* <p className="text-[11px] text-[#888] tracking-[0.04em] mb-4 font-mono">Stay updated with our latest collections</p> */}
              <div className="flex h-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border border-[#555] px-3.5 text-[12px] text-[#d4d4d4] tracking-[0.08em] outline-none focus:border-[#C9A84C] transition font-mono"
                />
                <button className="bg-[#C9A84C] text-[#1E1E1E] px-4 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-[#E2C175] transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-12">
          {/* Branding */}
          <div className="text-center">
            <div className="w-[140px] mx-auto">
              <Image src={logo} alt="HILLTOP" className="h-auto w-full" />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 gap-10">
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3 text-white">India</h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                <Link href="/locate#hq" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Head Office</Link>
                <span className="text-[#C9A84C] opacity-30 text-[10px]">|</span>
                <Link href="/locate#factory" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Factory</Link>
                <span className="text-[#C9A84C] opacity-30 text-[10px]">|</span>
                <Link href="/locate#experience" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Experience Centre</Link>
              </div>
              <div className="flex flex-col gap-2">
                <a href="mailto:sales@hilltopgranite.com" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                  <EmailIcon size={14} />
                  <span>sales@hilltopgranite.com</span>
                </a>
                <a href="tel:+919900064364" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                  <PhoneIcon size={14} />
                  <span>+91 99000 64364</span>
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3 text-white">USA</h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                <Link href="/locate#usa" className="text-[12px] text-[#C9A84C] hover:opacity-100 transition font-mono whitespace-nowrap">Experience Centre</Link>
              </div>
              <div className="flex flex-col gap-2">
                <a href="mailto:info@hilltopgranite.com" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                  <EmailIcon size={14} />
                  <span>info@hilltopgranite.com</span>
                </a>
                <a href="tel:+17137308818" className="flex items-center gap-2 text-[12px] text-[#C9A84C] opacity-90 hover:opacity-100 transition font-mono leading-relaxed">
                  <PhoneIcon size={14} />
                  <span>+1713-730-8818</span>
                </a>
              </div>
            </div>
          </div>

          {/* Links & Categories */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-5 text-white">Quick Links</h5>
              <div className="flex flex-col gap-3.5">
                <FooterLinkGold href="/about">Our Story</FooterLinkGold>
                <FooterLinkGold href="/products">Products</FooterLinkGold>
                <FooterLinkGold href="/career">Career</FooterLinkGold>
                <FooterLinkGold href="/blogs">Blog & FAQ</FooterLinkGold>
                <FooterLinkGold href="https://hilltopstones.stoneprofitsweb.com/">Live Inventory</FooterLinkGold>
                <FooterLinkGold href="/privacy-policy">Privacy Policy</FooterLinkGold>
                <FooterLinkGold href="/disclaimer">Disclaimer</FooterLinkGold>
                <FooterLinkGold href="/terms-and-conditions">Terms & Conditions</FooterLinkGold>
              </div>
            </div>
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase mb-5 text-white">Product Categories</h5>
              <div className="flex flex-col gap-3.5">
                <FooterLinkGold href="/products?category=Granite">Granite</FooterLinkGold>
                <FooterLinkGold href="/products?category=Marble">Marble</FooterLinkGold>
                {/* <FooterLinkGold href="/products?category=Onyx">Onyx</FooterLinkGold> */}
                <FooterLinkGold href="/products?category=Porcelain">Porcelain</FooterLinkGold>
                <FooterLinkGold href="/products?category=Quartz">Quartz</FooterLinkGold>
                <FooterLinkGold href="/products?category=Quartzite">Quartzite</FooterLinkGold>
                <FooterLinkGold href="/products?category=Spc">Spc</FooterLinkGold>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="pt-8 border-t border-[#333]">
            <div className="flex justify-center gap-8">
              <SocialLinkGold href="https://instagram.com/hilltopgraniteofficial" label="" icon={<InstagramIcon size={24} />} />
              <SocialLinkGold href="https://facebook.com/HilltopGraniteBangalore" label="" icon={<FacebookIcon size={24} />} />
              <SocialLinkGold href="https://youtube.com/@hilltopgraniteofficial7267" label="" icon={<YoutubeIcon size={24} />} />
              <SocialLinkGold href="https://linkedin.com/company/hilltopstones" label="" icon={<LinkedinIcon size={24} />} />
            </div>
          </div>

          {/* Subscribe */}
          <div className="pt-8 border-t border-[#333]">
            <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2 font-mono text-white text-center">Subscribe</h4>
            {/* <p className="text-[11px] text-[#888] tracking-[0.04em] mb-6 font-mono text-center">Stay updated with our latest collections</p> */}
            <div className="flex h-11 max-w-sm mx-auto w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-[#555] px-4 text-[12px] text-[#d4d4d4] tracking-[0.08em] outline-none focus:border-[#C9A84C] transition font-mono min-w-0"
              />
              <button className="bg-[#C9A84C] text-[#1E1E1E] px-5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-[#E2C175] transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-[#2e2e2e] flex justify-start items-center text-[12px] text-white/50 tracking-[0.02em] font-mono">
          <span>
            © 2026 Hilltop Stones Pvt Ltd - All Rights Reserved. Crafted by{" "}
            <a href="https://inbounderz.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Inbounderz</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGold({ href, children }) {
  return (
    <Link
      href={href}
      className={`text-[13px] text-[#C9A84C] hover:text-[#E2C175] transition ${montserrat.className} tracking-wide`}
    >
      {children}
    </Link>
  );
}

function SocialLinkGold({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 text-[#d4d4d4] hover:text-[#C9A84C] transition group"
    >
      <span className="opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
      {label && <span className={`text-[13px] ${montserrat.className} tracking-wide`}>{label}</span>}
    </a>
  );
}

/* -------------------- icons -------------------- */

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.55.45-1 1-1Z" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9.75 15.02 5.75-3.02-5.75-3.02v6.04z" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

function EmailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
