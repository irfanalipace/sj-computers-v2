import {
    Box,
    Button,
    Divider,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import StarRatings from "react-star-ratings";
import RatingWithLabel from "./RatingWithLabel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function RatingDetails({ product }) {
    return (
        <Box py={2} px={2}>
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
                >{`${product?.rating} out of 5`}</Typography>
            </Stack>
            <Typography
                mt={1}
                mb={2}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"20px"}
            >{`${366} globall rating`}</Typography>

            <Stack spacing={2}>
                <RatingWithLabel label="5 Star" value={79} />
                <RatingWithLabel label="4 Star" value={14} />
                <RatingWithLabel label="3 Star" value={3} />
                <RatingWithLabel label="2 Star" value={1} />
                <RatingWithLabel label="1 Star" value={3} />
            </Stack>
            <Stack mt={2} spacing={2}>
                <Divider sx={{ background: "#DDD", borderBottomWidth: 3 }} />
                <Button endIcon={<ChevronRightIcon />}>
                    See customer review
                </Button>
            </Stack>
        </Box>
    );
}
