import React from "react"
import { ProductImage } from "@components/Product/ProductImage/ProductImage";
import ProductData from "@components/Product/ProductData/ProductData";
import { ProductCard } from "@components/Product/ProductCard/ProductCard";

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
            <ProductData />
            </div>
            <div className="col-md-4">
               <ProductCard />
            </div>
        </div>
    </div>
    </>
    )
}
