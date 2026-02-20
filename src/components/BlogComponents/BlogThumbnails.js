"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import thumb1 from "../../assets/blogs/thumb1.jpg";
import thumb2 from "../../assets/blogs/thumb2.jpg";
import thumb3 from "../../assets/blogs/thumb3.jpg";
import thumb4 from "../../assets/blogs/thumb4.jpg";
import thumb5 from "../../assets/blogs/thumb5.jpg";
import thumb6 from "../../assets/blogs/thumb6.jpg";
import thumb7 from "../../assets/blogs/thumb7.jpg";

const DEFAULT_POSTS = [
  {
    title: "Everything You Need to Know About Quartz",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb1,
    href: "/blogs/quartz",
  },
  {
    title: "Choosing Between Granite & EQS?",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb2,
    href: "/blogs/granite-vs-eqs",
  },
  {
    title: "Everything You Need to Know About Porcelain",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb3,
    href: "/blogs/porcelain",
  },
  {
    title: "Everything You Need to Know About Semi-Precious Stones",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb4,
    href: "/blogs/semi-precious",
  },
  {
    title: "Granite Slabs: Where do they come from?",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb5,
    href: "/blogs/granite-slabs-origin",
  },
  {
    title: "The Colors, Colors and Patterns of Granite",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb6,
    href: "/blogs/granite-colors",
  },
  {
    title: "What is Granite?",
    excerpt: "Quartz is one of the most abundant minerals on Earth. It is composed of...",
    image: thumb7,
    href: "/blogs/what-is-granite",
  },
];

function clampText(text = "", max = 110) {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "...";
}

function BlogCard({ post }) {
  return (
    <article className="group h-full flex flex-col">
      {/* Image */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden bg-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.45)]"
        style={{ borderRadius: "14px" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 25vw"
        />
      </div>

      {/* Text container */}
      <div className="mt-6 flex flex-col flex-1">
        <h3 className="text-white text-[22px] md:text-[24px] leading-snug tracking-wide font-[500] [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
          {post.title}
        </h3>

        <p className="mt-3 text-white/65 text-[14px] md:text-[15px] leading-relaxed">
          {clampText(post.excerpt, 110)}
        </p>

        {/* Button aligned at bottom */}
        <div className="mt-auto pt-6">
          <Link
            href={post.href || "#"}
            className="inline-flex items-center justify-center rounded-[14px] border border-[#DA9C39]/70 px-6 py-2.5 text-white/80 text-[14px] tracking-wide transition-all duration-200 hover:border-[#DA9C39] hover:text-white hover:bg-[#DA9C39]/10"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}


export default function BlogThumbnails({
  title,
  posts = DEFAULT_POSTS,
}) {
  return (
    <section className="relative w-full overflow-hidden py-14 md:py-20">
      {/* Background (same dark + soft radial glow) */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {title ? (
          <h2 className="mb-10 text-center text-white text-[40px] md:text-[52px] tracking-wide font-[500] [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
            {title}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {posts.map((post, idx) => (
            <BlogCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
