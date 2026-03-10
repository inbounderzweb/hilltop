import CareerBanner from '@/components/listing/Banner'
import ProductListingPage from '@/components/listing/ProductListingPage'
import React from 'react'

export default async function Page({ params }) {
    const resolvedParams = await params;
    // [[...category]] returns an array or undefined
    const categoryArray = resolvedParams.category;
    const initialCategory = categoryArray ? categoryArray[0] : null;

    return (
        <div>
            <CareerBanner />
            <ProductListingPage initialCategory={initialCategory} />
        </div>
    )
}
