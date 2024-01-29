import React, { useEffect, useState } from "react";
import AddToCartCard from "../../components/AddToCartCard/AddToCartCard";
import { useParams } from "react-router-dom";
import { productDetailsbyAsinApi } from "@api/products";
import SimilarItems from "../../components/SimilarItems/SimilarItems";
import useSimilarData from "../Product/useSimilarProduct";
import SimilarItemsSlider from "../../components/Sliders/SimilarItems";

const AddToCart = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const { similarProducts } = useSimilarData();

    const getProductbyId = async () => {
        try {
            const response = await productDetailsbyAsinApi(productId);
            setProduct(response?.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getProductbyId();
    }, []);

    return (
        <div style={{ backgroundColor: "#EAEDED" }}>
            <AddToCartCard product={product} />
            <SimilarItemsSlider products={similarProducts} />
        </div>
    );
};

export default AddToCart;
