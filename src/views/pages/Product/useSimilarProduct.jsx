import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { similarProductsApi, featureProductsApi } from "@api/products";

function useSimilarData(product_id) {
    const { title } = useParams();
    const modifyTitle = title.replace(/-/g, " ");
    const productLoading = useSelector((state) => state?.products?.isLoading);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const getSimilarProduct = async () => {
        // if (!products?.length) {
        try {
            const resp = await similarProductsApi(product_id);
            setSimilarProducts(resp);
        } catch (error) {
            console.log(error);
        }
        // }
    };

    const getFeaturedProduct = async () => {
        // if (!products?.length) {
        try {
            const resp = await featureProductsApi(product_id);
            setFeaturedProducts(resp?.data);
            console.log("repsoooo", resp?.data);
        } catch (error) {
            console.log(error);
        }
        // }
    };
    useEffect(() => {
        if (product_id) {
            getSimilarProduct();
            getFeaturedProduct();
        }
    }, [product_id]);

    return {
        similarProducts,
        featuredProducts,
    };
}

export default useSimilarData;
