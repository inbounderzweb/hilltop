import React from 'react'
import ProductDetailComponent from '@/components/productdetailComponents/Banner'
import ProductDetails from '@/components/productdetailComponents/ProductDetails'

export default async function Page({ params }) {
    const { id } = await params;

    return (
        <div>
            <ProductDetailComponent />
            <ProductDetails productId={id} />
        </div>
    )
}
