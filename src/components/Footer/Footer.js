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

            <div className="mt-7">
              <FooterBlock title="INDIA">
                <FooterLink href="/india/head-quarters">Head Quarters</FooterLink>
                <FooterLink href="/india/factory">Factory</FooterLink>
                <FooterLink href="/india/showroom">Experience Centre</FooterLink>
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

            <h4 className="text-white/90 text-[18px] font-semibold mb-6">Quick Links</h4>

            <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[#d7a447]">
              <FooterLink href="/about">
                About us
              </FooterLink>
              <FooterLink href="/blog">
                Blog
              </FooterLink>
              <FooterLink href="">
                Products
              </FooterLink>
              <FooterLink href="/career">
                Career
              </FooterLink>
              <FooterLink href="/locate#usa">
                US line
              </FooterLink>
              <FooterLink href="/faq">
                FAQ
              </FooterLink>
            </div>
          </div>

          {/* Right: Social */}
          <div className="relative pl-10 h-full">
            {/* divider should match middle column height */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/25" />

            <h4 className="text-white/90 text-[18px] font-semibold mb-6">Follow us</h4>

            <div className="space-y-4">
              <SocialRow href="https://www.instagram.com/hilltopgraniteofficial/" label="Instagram" icon={<InstagramIcon />} />
              <SocialRow href="https://www.facebook.com/HilltopGraniteBangalore/" label="Facebook" icon={<FacebookIcon />} />
              <SocialRow href="https://www.youtube.com/@hilltopgraniteofficial7267" label="YouTube" icon={<YoutubeIcon />} />
              <SocialRow href="https://www.linkedin.com/company/hilltopstones?originalSubdomain=in" label="LinkedIn" icon={<LinkedinIcon />} />
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
              <FooterLinkMobile href="/india/showroom">Experience Centre</FooterLinkMobile>
            </FooterBlockMobile>

            <FooterBlockMobile title="USA">
              <FooterLinkMobile href="/usa/distribution-center">
                Distribution Center
              </FooterLinkMobile>
            </FooterBlockMobile>
          </div>

          <Divider />

          {/* Quick links */}
          <h4 className="text-center text-white/90 text-[22px] font-medium tracking-wide">
            Quick Links
          </h4>

          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6">
            <FooterLinkMobile href="/about">About us</FooterLinkMobile>
            <FooterLinkMobile href="/blog">Blog</FooterLinkMobile>
            <FooterLinkMobile href="/products">Products</FooterLinkMobile>
            <FooterLinkMobile href="/career">Career</FooterLinkMobile>
            <FooterLinkMobile href="/locate#usa">Locate Us</FooterLinkMobile>
            <FooterLinkMobile href="/faq">FAQ</FooterLinkMobile>
          </div>

          <Divider />

          {/* Social */}
          <div className="flex items-center justify-center gap-6">
            <span className="text-white/90 text-[18px] font-medium">Follow us</span>

            <a
              className="text-white/90 hover:text-white transition"
              href="https://www.instagram.com/hilltopgraniteofficial/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon size={26} />
            </a>
            <a
              className="text-white/90 hover:text-white transition"
              href="https://www.facebook.com/HilltopGraniteBangalore/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon size={26} />
            </a>
            <a
              className="text-white/90 hover:text-white transition"
              href="https://www.youtube.com/@hilltopgraniteofficial7267"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <YoutubeIcon size={26} />
            </a>
            <a
              className="text-white/90 hover:text-white transition"
              href="https://www.linkedin.com/company/hilltopstones?originalSubdomain=in"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={26} />
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
      <p className="text-white/95 text-[14px] font-bold tracking-[0.18em]">{title}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, muted }) {
  return (
    <Link
      href={href}
      className={[
        muted ? "text-white/75" : "text-[#d7a447]",
        "text-[14px] tracking-wide hover:opacity-100 hover:text-white pr-[12px] transition",
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
      <p className="text-white text-[18px] font-bold tracking-wide">{title}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function FooterLinkMobile({ href, children }) {
  return (
    <Link
      href={href}
      className="block text-[#d7a447] text-[16px] font-medium tracking-wide hover:text-white transition"
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

function YoutubeIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m9.75 15.02 5.75-3.02-5.75-3.02v6.04z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedinIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}
