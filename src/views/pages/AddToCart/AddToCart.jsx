import React, { useEffect, useState } from "react";
import AddToCartCard from "../../components/AddToCartCard/AddToCartCard";
import { useParams } from "react-router-dom";
import { productDetailsbyAsinApi } from "@api/products";

const AddToCart = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();

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
        </div>
    );
};

export default AddToCart;
