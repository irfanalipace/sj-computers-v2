import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import StarRatings from "react-star-ratings";
import RatingWithLabel from "../ProductDetails/RatingWithLabel";
import { productReviewsApi } from "../../../../core/api/product-review";

export default function RatingDetails({ id, open }) {
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const getReview = async () => {
        setLoading(true);
        try {
            const res = await productReviewsApi(id);
            const dd = JSON.parse(res.data.product_stats.statistics);
            const ddd = dd.rate["5"];
            debugger;
            setProductDetails(JSON.parse(res.data.product_stats.statistics));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (open) getReview(id);
    }, [open]);

    return (
        <Box py={2} pr={2} pl={1} maxWidth={"370px"}>
            {loading ? (
                <Box mt={2} display={"flex"} justifyContent={"center"}>
                    <CircularProgress sx={{ width: "auto" }} disableShrink />
                </Box>
            ) : (
                <>
                    <Typography
                        fontWeight={700}
                        fontSize={"20px"}
                        lineHeight={"32px"}
                    >
                        Customer reviews
                    </Typography>
                    <Stack direction="row" alignItems="flex-start">
                        <StarRatings
                            rating={productDetails?.rate?.overall_rate}
                            starRatedColor="rgb(232, 126, 36)"
                            numberOfStars={5}
                            name="rating"
                            isSelectable={false}
                            starDimension={"18px"}
                            starSpacing={"0"}
                        />

                        <Typography
                            fontWeight={700}
                            fontSize={"18px"}
                            lineHeight={"24px"}
                        >{`${
                            productDetails?.rating || 0
                        } out of 5`}</Typography>
                    </Stack>
                    <Typography
                        mt={1}
                        mb={2}
                        fontWeight={400}
                        fontSize={"14px"}
                        lineHeight={"20px"}
                    >{`${366} globall rating`}</Typography>

                    <Stack spacing={2}>
                        <RatingWithLabel
                            label="5 Star"
                            value={productDetails?.rate?.["5"]}
                        />
                        <RatingWithLabel
                            label="4 Star"
                            value={productDetails?.rate?.["4"]}
                        />
                        <RatingWithLabel
                            label="3 Star"
                            value={productDetails?.rate?.["3"]}
                        />
                        <RatingWithLabel
                            label="2 Star"
                            value={productDetails?.rate?.["2"]}
                        />
                        <RatingWithLabel
                            label="1 Star"
                            value={productDetails?.rate?.["1"]}
                        />
                    </Stack>
                </>
            )}
        </Box>
    );
}
