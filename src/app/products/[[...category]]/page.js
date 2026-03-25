import CareerBanner from '@/components/listing/Banner'
import ProductListingPage from '@/components/listing/ProductListingPage'
import React from 'react'

export async function generateMetadata({ params }) {
    const { category } = await params;
    let catName = category ? category[0].charAt(0).toUpperCase() + category[0].slice(1) : "Premium Slabs";
    
    if (category?.[0] === "natural-stones") catName = "Natural Stones";
    if (category?.[0] === "engineered-surfaces") catName = "Engineered Surfaces";

    return {
        title: `${catName} | Hilltop Surfaces - Luxury Stone Collection`,
        description: `Browse our exquisite collection of ${catName.toLowerCase()} and natural stone surfaces at Hilltop Surfaces. Find the perfect slabs for your architectural needs.`,
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    // [[...category]] returns an array or undefined
    const categoryArray = resolvedParams.category;
    const initialCategory = categoryArray ? categoryArray[0] : null;

    let allowedCategories = null;
    let displayCategory = initialCategory;

    if (initialCategory === "natural-stones") {
        allowedCategories = ["Marble", "Granite", "Quartzite"];
        displayCategory = null; 
    } else if (initialCategory === "engineered-surfaces") {
        allowedCategories = ["Quartz", "SPC", "Porcelain"];
        displayCategory = null;
    }

    return (
        <div>
            <CareerBanner />
            <ProductListingPage initialCategory={displayCategory} allowedCategories={allowedCategories} />
        </div>
    )
}
