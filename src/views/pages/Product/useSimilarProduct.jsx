import { useEffect, useState } from "react";
import { similarProductsApi, featureProductsApi } from "@api/products";

function useSimilarData(productId) {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSimilarProduct = async () => {
        try {
            const resp = await similarProductsApi(productId);
            setFeaturedProducts(resp);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const getFeaturedProduct = async () => {
        try {
            const resp = await featureProductsApi(productId);
            setSimilarProducts(resp?.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (productId) {
            setIsLoading(true);
            getSimilarProduct();
            getFeaturedProduct();
        }
    }, [productId]);
    return {
        similarProducts,
        featuredProducts,
        isLoading,
    };
}

export default useSimilarData;
