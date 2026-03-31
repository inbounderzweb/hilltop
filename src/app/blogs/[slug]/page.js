"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import BlogBanner from "@/components/BlogComponents/Banner";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setBlog(data.blog);
                    setRelated(data.related || []);
                } else {
                    setError(data.error || "Post not found");
                }
            } catch (err) {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        }
        if (slug) fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#151515] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#DA9C39] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#151515] flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <p className="text-white/60 mb-8">{error}</p>
                <Link href="/blogs" className="px-6 py-3 bg-[#DA9C39] text-black font-bold rounded-xl transition hover:bg-[#c48c38]">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#151515] text-white selection:bg-[#DA9C39]/30">
            {/* Common Banner */}
            <BlogBanner />

            {/* Main Layout Grid */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24">

                    {/* Main Content Area */}
                    <main>
                        {/* Blog Featured Image */}
                        <div className="relative aspect-video md:aspect-21/9 w-full rounded-2xl overflow-hidden mb-10 shadow-2xl">
                            <Image
                                src={blog.image_url?.startsWith('http') || blog.image_url?.startsWith('/') ? blog.image_url : `/${blog.image_url}`}
                                alt={blog.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 1000px"
                            />
                        </div>

                        {/* Breadcrumbs / Back Link */}
                        <div className="mb-6">
                            <Link href="/blogs" className="inline-flex items-center gap-2 text-[#DA9C39] hover:text-white transition-colors duration-300">
                                <ArrowLeft size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Back to Blogs</span>
                            </Link>
                        </div>

                        {/* Title Section */}
                        <span className={`text-3xl font-bold leading-[1.15] mb-8 ${quicksand.className}`}>
                            {blog.title}
                        </span>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-8 mb-12 my-2 text-white text-[13px] uppercase tracking-widest font-medium border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className={`text-white ${quicksand.className}`} />
                                {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={14} className={`text-white ${quicksand.className}`} />
                                {blog.author_name || "Hilltop Surfaces"}
                            </div>
                        </div>

                        {/* Detailed Content */}
                        <div className="prose prose-invert prose-gold max-w-none">
                            {/* Excerpt */}
                            <p className={`text-xl text-white font-light leading-relaxed mb-12 italic border-l-2 border-[#DA9C39]/40 pl-6 ${quicksand.className}`}>
                                {blog.excerpt}
                            </p>

                            {/* Full Content */}
                            <div
                                className={`text-white text-lg leading-[1.8] space-y-8 ${quicksand.className}`}
                                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
                            />
                        </div>

                        {/* Bottom navigation */}
                        <div className="mt-20 pt-8 border-t border-white/5">
                            <Link href="/blogs" className="text-white hover:text-[#DA9C39] transition-colors flex items-center gap-2 group w-fit">
                                <span className="text-sm font-bold uppercase tracking-widest">Discover more stories</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </main>

                    {/* Sidebar: Related Topics */}
                    <aside className="lg:border-l lg:border-white/5 lg:pl-12">
                        <h2 className={`text-[#DA9C39] text-xl font-medium tracking-wide mb-10 italic border-b border-[#DA9C39]/20 pb-4 ${quicksand.className}`}>
                            Related topics
                        </h2>

                        <div className="space-y-14">
                            {related.map((item) => (
                                <article key={item.id} className="group flex flex-col">
                                    <Link href={`/blogs/${item.slug}`}>
                                        <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-5 bg-white/5">
                                            <Image
                                                src={item.image_url?.startsWith('http') || item.image_url?.startsWith('/') ? item.image_url : `/${item.image_url}`}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="380px"
                                            />
                                        </div>
                                        <h3 className={`text-white text-lg font-medium leading-snug group-hover:text-[#DA9C39] transition-colors duration-300 ${quicksand.className}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`mt-3 text-white text-[14px] leading-relaxed line-clamp-2 ${quicksand.className}`}>
                                            {item.excerpt}
                                        </p>
                                        <div className="mt-5">
                                            <div className="inline-flex items-center justify-center rounded-lg border border-[#DA9C39]/40 px-6 py-2 text-[#DA9C39] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-[#DA9C39] group-hover:text-black">
                                                Read More
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}

                            {related.length === 0 && (
                                <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                                    <p className="text-white/20 italic text-sm">No related topics found.</p>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
