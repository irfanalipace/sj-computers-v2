import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetailsbyAsinApi } from "@api/products";

function useProductData() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const products = useSelector((state) => state.products.products);
    const productLoading = useSelector((state) => state.products.isLoading);

    const { productId } = useParams();
    const getProductDetails = async (filter) => {
        if (!productLoading) {
            const filteredProduct = products.filter(
                (product) => product?.asin == productId
            )[0];

            if (filteredProduct) {
                setProduct(filteredProduct);
            } else {
                setIsLoading(true);
                try {
                    const response = await productDetailsbyAsinApi(productId, {
                        filter: filter,
                    });

                    setProduct(response.data);
                } catch (error) {}
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [productId, productLoading]);

    return {
        isLoading,
        product,
    };
}

export default useProductData;
