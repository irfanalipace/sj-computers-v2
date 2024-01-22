import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function useProductData() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const products = useSelector((state) => state.products.products);
    const similarProducts = useSelector(
        (state) => state.products.similarProducts
    );

    const { productId } = useParams();

    const getProductDetails = async (filter) => {
        const filteredProduct = products.filter(
            (product) => product?.asin == productId
        )[0];
        if (filteredProduct) {
            setProduct(filteredProduct);
            setProductImages(filteredProduct?.image);
        } else {
            setIsLoading(true);
            try {
                const response = await productDetailsbyAsinApi(productId, {
                    filter: filter,
                });
                setProduct(response.data);
                setProductImages(response?.data?.image);
                setIsLoading(false);
            } catch (error) {}
        }
        setIsLoading(false);
    };

    const onFilterChange = (filter) => {
        getProductDetails(filter);
    };

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    return {
        isLoading,
        product,
        productImages,
        products,
        similarProducts,
        onFilterChange,
    };
}

export default useProductData;
