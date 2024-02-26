import {
    Box,
    Divider,
    Stack,
    Typography,
    Button,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import Tooltip from "../../Tooltip";
import HoverColorChange from "../../HoverColorChange";
import StarRatings from "react-star-ratings";
import RatingDetails from "../ProductReviews/RatingDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    productRatingApi,
    productReviewsApi,
} from "../../../../core/api/product-review";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_REVIEW } from "../../../../core/store/review/reviewSlice";

export default function ProductRating({
    productID,
    rating,
    totalReview,
    isUpSmall,
}) {
    const dispatch = useDispatch();
    const reviewState = useSelector((slice) => slice.review);

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = async () => {
        setOpen(true);
    };

    const getReview = async (id) => {
        setLoading(true);
        try {
            const res = await productReviewsApi(id);
            const parsedData = JSON.parse(res.data.product_stats.statistics);
            dispatch(ADD_REVIEW(res.data));
            setProductDetails(parsedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (open) {
            const statisticsFromStore = reviewState.reviews?.product_stats
                ?.statistics
                ? JSON.parse(reviewState.reviews?.product_stats?.statistics)
                : [];

            if (statisticsFromStore || statisticsFromStore?.length !== 0) {
                setProductDetails(statisticsFromStore);
            }
        }

        if (
            open &&
            !productDetails?.rate &&
            !reviewState.reviews?.product_stats?.statistics
        ) {
            getReview(productID);
        }
    }, [open]);

    return (
        <Stack
            direction={{
                xs: "row",
            }}
            my={[0, 1, 0.5]}
            alignItems={"start"}
            gap={2}
            width={"100%"}
            sx={{ justifyContent: ["end", "start"] }}
        >
            <Tooltip
                arrow
                // disableTouchListener
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                title={
                    <>
                        <RatingDetails
                            loading={loading}
                            productDetails={productDetails}
                        />
                        <Stack mt={2} spacing={2}>
                            <Divider
                                sx={{
                                    background: "#DDD",
                                    borderBottomWidth: 3,
                                }}
                            />
                            <Button
                                href="#reviews"
                                endIcon={<ChevronRightIcon />}
                            >
                                See customer reviews
                            </Button>
                        </Stack>
                    </>
                }
            >
                <Stack direction={"row"}>
                    <Typography
                        fontSize={"14px"}
                        fontWeight={400}
                        fontFamily={"Inter"}
                        sx={{ mr: 1, mt: 0.2 }}
                    >
                        {rating}
                    </Typography>
                    <Box>
                        <StarRatings
                            style={{ PointerEvent: null }}
                            rating={rating}
                            starRatedColor="rgb(232, 126, 36)"
                            numberOfStars={5}
                            name="rating"
                            isSelectable={false}
                            starDimension={"20px"}
                            starSpacing={"0"}
                        />
                        {isUpSmall && (
                            <ExpandMoreIcon
                                sx={{
                                    width: "15px",
                                    height: "15px",
                                }}
                            />
                        )}
                    </Box>
                    <Stack ml={[0.5, 1]} direction={"row"} spacing={1} mt={0.3}>
                        <HoverColorChange
                            hoverColor="#FFA41C"
                            defaultColor="#007185"
                        >
                            <a
                                href="#reviews"
                                className="review-text"
                                style={{ color: "#007185" }}
                            >{`(${totalReview}) ${
                                isUpSmall ? "Ratings" : ""
                            }`}</a>
                        </HoverColorChange>
                        {/* <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{
                        borderLeftWidth: "1px",
                        background: "#0F1111",
                    }}
                    flexItem
                />
                <HoverColorChange hoverColor="#FFA41C" defaultColor="#007185">
                    <a className="review-text">11 answered questions</a>
                </HoverColorChange> */}
                    </Stack>
                </Stack>
            </Tooltip>
        </Stack>
    );
}
