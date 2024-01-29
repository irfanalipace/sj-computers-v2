import React from "react";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useSelector } from "react-redux";

import "./SimilarItems.css";
import SimilarItemsSlider from "../Sliders/SimilarItems";
import SingleSimilarItem from "../SimilarItemsSingle/SingleSimilarItem";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const SimilarItems = ({ products, featuredProducts }) => {
    const isLoading = useSelector((state) => state?.products?.isLoading);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid lg={4} mr={5}>
                    {featuredProducts[0] ? (
                        <SingleSimilarItem
                            product={featuredProducts[0]}
                            heading={"Featured items you may like"}
                        />
                    ) : (
                        <></>
                    )}
                </Grid>{" "}
                <Grid lg={4}>
                    {featuredProducts[1] ? (
                        <SingleSimilarItem product={featuredProducts[1]} />
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
            <div
                className="recommendation-container"
                style={{
                    borderTop: "1px solid lightgray",
                }}
            >
                <div className="recommendation-inner">
                    <Typography
                        variant="h5"
                        fontSize={21}
                        fontFamily={"Inter"}
                        fontWeight={700}
                        mt={1}
                        ml={2}
                        mb={5}
                    >
                        Get Similar items fast.
                    </Typography>

                    <div
                        className="slider-wrapper"
                        style={{ margin: "20px 80px" }}
                    >
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
