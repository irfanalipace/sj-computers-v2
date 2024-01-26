import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { similarProductsApi } from "@api/products";

function useSimilarData() {
    const { title } = useParams();
    const modifyTitle = title.replace(/-/g, " ");
    const productLoading = useSelector((state) => state?.products?.isLoading);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([])

    const { productId } = useParams();

    const getSimilarProduct = async () => {
        // if (!products?.length) {
        try {
            const resp = await similarProductsApi({ name: modifyTitle });
            setSimilarProducts(resp?.data?.data);
            console.log("repsoooo", resp?.data?.data);
        } catch (error) {
            console.log(error);
        }
        // }
    };
    useEffect(() => {
        getSimilarProduct();
    }, [productId, productLoading]);

    return {
        similarProducts,
        featuredProducts,
    };
}

export default useSimilarData;
