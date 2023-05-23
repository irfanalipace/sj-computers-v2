import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { productDetailsApi } from "@api/products";
import { ProductImage } from "@components/Product/ProductImage/ProductImage";
import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import { CheckOutCard } from "@components/Product/CheckOutCard/CheckOutCard";

import "./Product.css";

export default function Product() {
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const products = useSelector((state) => state.products.products);
    const { productId } = useParams();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        setIsLoading(true);

        const filteredProduct = products.filter(
            (product) => product.id == productId
        )[0];
        if (filteredProduct) {
            setProduct(filteredProduct);
        } else {
            try {
                const response = await productDetailsApi(productId);
                setProduct(response.data);
            } catch (error) {}
        }
        setIsLoading(false);
    };

    const ProductComponent = () => {
        return (
            <>
                {product ? (
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <ProductImage ProductImages={product?.image} />
                        </div>
                        <div className="col-12 col-md-5">
                            <ProductDetails product={product} />
                        </div>
                        <div className="col-12 col-md-3">
                            <CheckOutCard product={product} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>Product Data Not Found</h4>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="product-page">
            <div className="product-container">
                {isLoading ? <LoaderComponent /> : <ProductComponent />}
            </div>
        </div>
    );
}
