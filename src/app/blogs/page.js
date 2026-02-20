import BlogBanner from '@/components/BlogComponents/Banner'
import BlogThumbnails from '@/components/BlogComponents/BlogThumbnails'
import FAQSection from '@/components/BlogComponents/FAQSection'
import React from 'react'

function page() {
  return (
    <div>
        <BlogBanner />
        <BlogThumbnails />
        <FAQSection />
    </div>
  )
}

export default page