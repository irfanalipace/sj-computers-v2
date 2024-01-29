import React, { useEffect, useState } from "react";
import AddToCartCard from "../../components/AddToCartCard/AddToCartCard";
import { useParams } from "react-router-dom";
import { productDetailsbyAsinApi } from "@api/products";
import SimilarItems from "../../components/SimilarItems/SimilarItems";
import useSimilarData from "../Product/useSimilarProduct";
import SimilarItemsSlider from "../../components/Sliders/SimilarItems";
import SimilarPurchaseCart from "../../components/SimilarPurchaseCart/SimilarPurchaseCart";
import { Grid } from "@mui/material";

const AddToCart = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const { similarProducts, featuredProducts } = useSimilarData(product?.id);
    console.log("ssimi", similarProducts);

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
            <Grid container>
                <Grid item lg={10}>
                    <AddToCartCard product={product} />
                    {/* <SimilarItemsSlider products={similarProducts} /> */}
                    <SimilarPurchaseCart products={featuredProducts} />
                </Grid>
                <Grid item lg={2}>
                    sdasadasd
                </Grid>
            </Grid>
        </div>
    );
};

export default AddToCart;
