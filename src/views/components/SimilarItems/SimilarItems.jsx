import React from "react";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";

import "./SimilarItems.css";
import SimilarItemsSlider from "../Sliders/SimilarItems";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSimilarProducts } from "@store/products/productsThunks";
import SingleSimilarItem from "../SimilarItemsSingle/SingleSimilarItem";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const SimilarItems = ({ products }) => {
    const isLoading = useSelector((state) => state?.products.isLoading);
    const { title } = useParams();
    const modifyTitle = title.replace(/-/g, " ");
    const dispatch = useDispatch();

    const getSimilarProduct = async () => {
        if (!products?.length) {
            try {
                await dispatch(fetchSimilarProducts({ name: modifyTitle }));
            } catch (error) {}
        }
    };

    useEffect(() => {
        getSimilarProduct();
    }, [products]);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid lg={3}>
                    {products[0] ? (
                        <SingleSimilarItem product={products[0]} />
                    ) : (
                        <></>
                    )}
                </Grid>{" "}
                <Grid lg={1}></Grid>
                <Grid lg={3}>
                    {products[1] ? (
                        <SingleSimilarItem product={products[1]} />
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
            <div
                className="recommendation-container"
                style={{ borderTop: "1px solid lightgray" }}
            >
                <div className="recommendation-inner">
                    <Typography
                        variant="h5"
                        fontSize={21}
                        fontFamily={"Inter"}
                        fontWeight={700}
                        mt={2}
                        ml={2}
                        mb={5}
                    >
                        Get Similar items fast.
                    </Typography>

                    <div className="slider-wrapper">
                        {isLoading || !products ? (
                            <LoaderComponent />
                        ) : (
                            <SimilarItemsSlider
                                type="recommended"
                                products={products}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarItems;
