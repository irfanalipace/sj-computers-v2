import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import StarRatings from "react-star-ratings";
import RatingWithLabel from "../ProductDetails/RatingWithLabel";
import { getProductReviewDetails } from "../../../../core/api/product-review";

export default function RatingDetails({ id, open }) {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const getReview = async () => {
        setLoading(true);
        try {
            const res = await getProductReviewDetails(1);
            console.log(res);
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
                            rating={product?.rating}
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
                        >{`${product?.rating || 0} out of 5`}</Typography>
                    </Stack>
                    <Typography
                        mt={1}
                        mb={2}
                        fontWeight={400}
                        fontSize={"14px"}
                        lineHeight={"20px"}
                    >{`${366} globall rating`}</Typography>

                    <Stack spacing={2}>
                        <RatingWithLabel label="5 Star" value={79 || 0} />
                        <RatingWithLabel label="4 Star" value={14 || 0} />
                        <RatingWithLabel label="3 Star" value={3 || 0} />
                        <RatingWithLabel label="2 Star" value={1 || 0} />
                        <RatingWithLabel label="1 Star" value={3 || 0} />
                    </Stack>
                </>
            )}
        </Box>
    );
}
