"use client";

import BlogBanner from '@/components/BlogComponents/Banner';
import BlogThumbnails from '@/components/BlogComponents/BlogThumbnails';
import FAQSection from '@/components/BlogComponents/FAQSection';
import React, { useEffect, useState } from 'react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) {
          // Map API data to BlogThumbnails format if needed
          const formattedBlogs = data.blogs.map(b => ({
            title: b.title,
            author: b.author_name,
            excerpt: b.excerpt,
            image: b.image_url,
            href: `/blogs/${b.slug}`,
            date: b.created_at
          }));
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div>
      <BlogBanner />
      {loading ? (
        <div className="bg-[#151515] py-20 text-center text-white/50">
          <div className="w-8 h-8 border-2 border-[#DA9C39] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading stories...
        </div>
      ) : (
        <BlogThumbnails posts={blogs} />
      )}
      <FAQSection />
    </div>
  );
}