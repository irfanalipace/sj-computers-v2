import React, { useEffect, useState } from "react";
import AddToCartCard from "./components/AddToCartCard/AddToCartCard";
import { useParams } from "react-router-dom";
import { productDetailsbyAsinApi } from "@api/products";
import useSimilarData from "../Product/useSimilarProduct";
import SimilarPurchaseCart from "./components/SimilarPurchaseCart/SimilarPurchaseCart";
import { Grid } from "@mui/material";
import SimilarInterestSlider from "./components/SimilarPurchaseCart/SimilarInterestSlider";
import CartSideBar from "./components/CartSidebar/CartSideBar";
import { useSelector } from "react-redux";
import "./AddToCart.css";

const AddToCart = () => {
    const { productId, itemAdded } = useParams();
    const cart = useSelector((state) => state?.cart?.cart);
    const product = cart?.find((item) => item?.product?.asin == productId);
    const { featuredProducts } = useSimilarData(product?.id);

    return product ? (
        <div style={{ backgroundColor: "#EAEDED" }}>
            <Grid container direction="row-reverse">
                <Grid item lg={2}>
                    <CartSideBar />
                </Grid>
                <Grid
                    item
                    lg={10}
                    className="hidden-on-mobile hidden-on-tab cart-with-protection"
                >
                    {product && !itemAdded ? (
                        <AddToCartCard product={product} />
                    ) : (
                        <></>
                    )}
                    {/* <SimilarItemsSlider products={similarProducts} /> */}
                    <SimilarPurchaseCart products={featuredProducts} />
                    <SimilarInterestSlider products={featuredProducts} />
                </Grid>
            </Grid>
            <div className="hidden-on-desktop">
                <SimilarInterestSlider products={featuredProducts} />
            </div>
        </div>
    ) : (
        <div style={{ padding: "140px", textAlign: "center" }}>
            There are no items in the cart!!!
        </div>
    );
};

export default AddToCart;
