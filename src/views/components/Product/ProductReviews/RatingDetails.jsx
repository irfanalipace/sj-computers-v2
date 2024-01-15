import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import StarRatings from "react-star-ratings";
import RatingWithLabel from "../ProductDetails/RatingWithLabel";

export default function RatingDetails({ product }) {
    return (
        <Box py={0} px={2} maxWidth={"350px"}>
            <Typography fontWeight={700} fontSize={"20px"} lineHeight={"32px"}>
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
        </Box>
    );
}
