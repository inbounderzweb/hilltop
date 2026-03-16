"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/logos/logo.svg";
import { Quicksand } from "next/font/google";

// ✅ Create the font instance ONCE (outside component)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`w-full bg-[#2a2a2a] text-white ${quicksand.className}`}>
      {/* Top content */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-12">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-[1.1fr_1fr_0.9fr] gap-10 items-start">
          {/* Left: Logo + Locations */}
          <div>
            <div className="w-[220px]">
              <Image src={logo} alt="HILLTOP" className="h-auto w-full -ml-3" priority />
            </div>

            <div className="mt-7 space-y-3">
              <FooterBlock title="INDIA">
                <FooterLink href="/india/head-quarters">Head Quarters</FooterLink>
                {/* <div className="text-white/60 text-[12px] mt-1">+91 99000 63557</div> */}
                <FooterLink href="/india/factory">Factory</FooterLink>
                {/* <div className="text-white/60 text-[12px] mt-1">+91 89519 43587</div> */}
                <FooterLink href="/india/showroom">Showroom</FooterLink>
              </FooterBlock>

              <FooterBlock title="USA">
                <FooterLink href="/usa/distribution-center">Distribution Center</FooterLink>
              </FooterBlock>
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="relative pl-10 h-full">
            {/* divider should match right column height */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/25" />

            <h4 className="text-white/90 text-[18px] font-[600] mb-6">Quick Links</h4>

            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              <FooterLink muted href="/about">
                About us
              </FooterLink>
              <FooterLink muted href="/blog">
                Blog
              </FooterLink>
              <FooterLink muted href="/products">
                Products
              </FooterLink>
              <FooterLink muted href="/career">
                Career
              </FooterLink>
              <FooterLink muted href="/us-line">
                US Line
              </FooterLink>
              <FooterLink muted href="/faq">
                FAQ
              </FooterLink>
            </div>
          </div>

          {/* Right: Social */}
          <div className="relative pl-10 h-full">
            {/* divider should match middle column height */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/25" />

            <h4 className="text-white/90 text-[18px] font-[600] mb-6">Follow us</h4>

            <div className="space-y-4">
              <SocialRow href="https://instagram.com" label="Instagram" icon={<InstagramIcon />} />
              <SocialRow href="https://facebook.com" label="Facebook" icon={<FacebookIcon />} />
              <SocialRow href="https://x.com" label="X.com" icon={<XIcon />} />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {/* Center logo */}
          <div className="flex justify-center">
            <div className="w-[210px]">
              <Image src={logo} alt="HILLTOP" className="h-auto w-full" priority />
            </div>
          </div>

          {/* India / USA */}
          <div className="mt-10 grid grid-cols-2 gap-8">
            <FooterBlockMobile title="INDIA">
              <FooterLinkMobile href="/india/head-quarters">Head Quarters</FooterLinkMobile>
              <FooterLinkMobile href="/india/factory">Factory</FooterLinkMobile>
              <FooterLinkMobile href="/india/showroom">Showroom</FooterLinkMobile>
            </FooterBlockMobile>

            <FooterBlockMobile title="USA">
              <FooterLinkMobile href="/usa/distribution-center">
                Distribution Center
              </FooterLinkMobile>
            </FooterBlockMobile>
          </div>

          <Divider />

          {/* Quick links */}
          <h4 className="text-center text-white/90 text-[22px] font-[500] tracking-wide">
            Quick Links
          </h4>

          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 text-[16px] leading-snug">
            <Link className="text-white/80 hover:text-white transition" href="/about">
              About us
            </Link>
            <Link className="text-white/80 hover:text-white transition" href="/blog">
              Blog
            </Link>
            <Link className="text-white/80 hover:text-white transition" href="/products">
              Products
            </Link>
            <Link className="text-white/80 hover:text-white transition" href="/career">
              Career
            </Link>
            <Link className="text-white/80 hover:text-white transition" href="/us-line">
              US Line
            </Link>
            <Link className="text-white/80 hover:text-white transition" href="/faq">
              FAQ
            </Link>
          </div>

          <Divider />

          {/* Social */}
          <div className="flex items-center justify-center gap-6">
            <span className="text-white/90 text-[18px] font-[500]">Follow us</span>

            <a
              className="text-white/90 hover:text-white transition"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon size={26} />
            </a>
            <a
              className="text-white/90 hover:text-white transition"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon size={26} />
            </a>
            <a
              className="text-white/90 hover:text-white transition"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <XIcon size={26} />
            </a>
          </div>

          <Divider />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/25">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-6">
          <p className="hidden md:block text-white/70 text-[14px]">
            Copyright © 2026 - <a href="https://inbounderz.com" target="_blank" rel="noreferrer">Inbounderz</a> All Rights Reserved
          </p>

          {/* Mobile centered line */}
          <p className="md:hidden text-center text-white/70 text-[12px]">
            Copyright © 2026 - <a href="https://inbounderz.com" target="_blank" rel="noreferrer">Inbounderz</a> All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- bits -------------------- */

function FooterBlock({ title, children }) {
  return (
    <div>
      <p className="text-white/95 text-[14px] font-[700] tracking-[0.18em]">{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, muted }) {
  return (
    <Link
      href={href}
      className={[
        muted ? "text-white/75" : "text-[#d7a447]",
        "text-[14px] tracking-wide hover:opacity-100 hover:text-white pr-[6px] transition",
        "inline-block",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function SocialRow({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 text-[#d7a447] hover:text-white transition"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center text-white/90">
        {icon}
      </span>
      <span className="text-[14px] tracking-wide">{label}</span>
    </a>
  );
}

function Divider() {
  return <div className="my-8 h-px w-full bg-white/25" />;
}

/* -------------------- mobile helpers -------------------- */

function FooterBlockMobile({ title, children }) {
  return (
    <div>
      <p className="text-white text-[18px] font-[700] tracking-wide">{title}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function FooterLinkMobile({ href, children }) {
  return (
    <Link
      href={href}
      className="block text-[#d7a447] text-[16px] font-[500] tracking-wide hover:text-white transition"
    >
      {children}
    </Link>
  );
}

/* -------------------- icons -------------------- */

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M17.5 6.5h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.55.45-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4h4.2l3.2 4.6L17.7 4H21l-6 7.1L21.4 20h-4.2l-3.6-5.1L9 20H5.6l6.4-7.6L6 4Z"
        fill="currentColor"
      />
    </svg>
  );
}
