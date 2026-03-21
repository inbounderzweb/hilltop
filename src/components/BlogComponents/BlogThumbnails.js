"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function BlogCard({ post }) {
  return (
    <article className="group h-full flex flex-col">
      {/* Image */}
      <div
        className="relative w-full aspect-4/3 overflow-hidden bg-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.45)]"
        style={{ borderRadius: "14px" }}
      >
        <Link
          href={post.href || "#"}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 25vw"
          />
        </Link>

      </div>

      {/* Text container */}
      <div className="mt-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-[#DA9C39] text-[12px] font-medium tracking-wider uppercase">
          <span>{post.author || "Hilltop"}</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="text-white">{post.date ? new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ""}</span>
        </div>

        <h3 className={`text-white text-[22px] md:text-[24px] leading-snug tracking-wide font-medium ${quicksand.className}`}>
          {post.title}
        </h3>

        <p className={`mt-3 text-white text-[14px] md:text-[15px] leading-relaxed line-clamp-2 ${quicksand.className}`}>
          {post.excerpt}
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
  posts = [],
}) {
  return (
    <section className="relative w-full overflow-hidden py-14 md:py-20 min-h-[400px] flex items-center">
      {/* Background (same dark + soft radial glow) */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {title ? (
          <h2 className={`mb-10 text-center text-white text-[40px] md:text-[52px] tracking-wide font-medium ${quicksand.className}`}>
            {title}
          </h2>
        ) : null}

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl md:text-2xl font-medium tracking-wide">
              No blogs were published yet. Stay tuned for our latest insights!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {posts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
