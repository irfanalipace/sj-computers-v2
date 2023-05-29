import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { productDetailsbyAsinApi } from "@api/products";
import { ProductImage } from "@components/Product/ProductImage/ProductImage";
import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import { CheckOutCard } from "@components/Product/CheckOutCard/CheckOutCard";
import Recommendation from "@components/Recommendation/Recommendation";

import "./Product.css";

export default function Product() {
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const products = useSelector((state) => state.products.products);
    const { productId } = useParams();

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    const getProductDetails = async () => {
        setIsLoading(true);

        const filteredProduct = products.filter(
            (product) => product?.asin == productId
        )[0];
        if (filteredProduct) {
            setProduct(filteredProduct);
        } else {
            try {
                const response = await productDetailsbyAsinApi(productId);
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
                        <div className="col-12 col-md-3 p-0 m-0">
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
<<<<<<< HEAD
        <div className="product-page">
            <div className="product-container">
=======
        <div className="product-page ">
            <div className="product-container container-fluid">
               
>>>>>>> mujtaba_dev
                {isLoading ? <LoaderComponent /> : <ProductComponent />}
                <Recommendation />
            </div>
        </div>
    );
}
