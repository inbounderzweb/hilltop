import ProductListingBanner from '@/components/listing/Banner'
import ProductListingPage from '@/components/listing/ProductListingPage'
import React from 'react'

export const metadata = {
    title: 'New Arrivals | Hilltop Surfaces - Luxury Stone Collection',
    description: 'Explore the latest stone surfaces and premium slabs newly added to the Hilltop Surfaces collection.',
}

export default function Page() {
    return (
        <div>
            <ProductListingBanner title="New Arrivals" />
            <ProductListingPage
                showFilters={false}
                sectionTitle="Explore Products"
                sortMode="newest"
                newArrivalsOnly
            />
        </div>
    )
}
