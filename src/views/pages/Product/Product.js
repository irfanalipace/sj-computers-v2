import React from "react"
import { ProductImage } from "@components/Product/ProductImage/ProductImage";
import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import { CheckOutCard } from "@components/Product/CheckOutCard/CheckOutCard";

import './Product.css'
export default function Product() {
   
    return (
        <>
    <div className="container-dev">
        <div className="row">
            <div className="col-md-4">
               <ProductImage />
            </div>
            <div className="col-md-4">
            <ProductDetails />
            </div>
            <div className="col-md-4">
               <CheckOutCard />
            </div>
        </div>
    </div>
    </>
    )
}
