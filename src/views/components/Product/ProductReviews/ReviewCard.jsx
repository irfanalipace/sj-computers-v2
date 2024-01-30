import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import { formatDateByMonthName } from "../../../../core/utils/helpers";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportDialog from "./ReportReviewDialog";
import { reviewReportHelpfullApi } from "../../../../core/api/product-review";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";

function ReviewCard({ reviewData, index, isDialog, updateReveiw, data }) {
    const [expandedReviews, setExpandedReviews] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleToggleExpand = (index) => {
        const newExpandedReviews = [...expandedReviews];
        newExpandedReviews[index] = !newExpandedReviews[index];
        setExpandedReviews(newExpandedReviews);
    };

    // Dialog Setup
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reviewId, setReviewId] = useState({});
    const [imgId, setImgId] = useState("");
    const [imgIndex, setImgIndex] = useState(0);

    const handleOpenDialog = (reviewId, imgId, index) => {
        setDialogOpen(true);
        setReviewId(reviewId);
        setImgId(imgId);
        setImgIndex(index)
        // console.log(reviews, "reviews");
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    
    const handleHelpfull = async () => {
        const data = {
            product_review_id: reviewData?.id,
            button_type: "helpful",
            // reveiw_report: [],
        };

        try {
            // setLoading(true);
            // const res = await reviewReportHelpfullApi(data);
            // updateReveiw(reviewData.id);
        } catch (error) {
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div className="review-card mb-2">
            <div className="d-flex align-items-center">
            <ReviewsDialog
                        open={dialogOpen}
                        handleOpenDialog={handleOpenDialog}
                        handleClose={handleDialogClose}
                        reviewId={reviewId}
                        imgId={imgId}
                        imgIndex={imgIndex}
                        ReviewsData={data}
                        // reviews={reviews}
                    />
                <div>
                    {reviewData?.user?.profile_pic ? (
                        <img
                            className="review-author-image"
                            src={reviewData?.user?.profile_pic}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="fs-2" />
                    )}
                </div>
                <p className="mb-0 ms-2 review-author ps-1">
                    {reviewData.user?.name || reviewData?.author}
                </p>
            </div>
            <div className="d-md-flex align-items-center my-2">
                <StarRatings
                    rating={ reviewData?.rating ? parseFloat(reviewData?.rating) : 0 }
                    starRatedColor="rgb(232, 126, 36)"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension={"20px"}
                    starSpacing={"0"}
                />
                <p className="review-title mt-md-0 mt-2 mb-0 ms-md-2 ps-1">
                    {reviewData?.name?.split(" ").splice(0, 6).join(" ")}
                </p>
            </div>
            <p className="my-2 review-location-time">
                {formatDateByMonthName(reviewData?.created_at)}
            </p>
            <p className="verified-review">Verified Purchase</p>
            <Box>
                <Box
                    key={index}
                    className={`review ${
                        expandedReviews[index] ? "expanded" : ""
                    }`}
                >
                    <p className="review-comment my-0">{reviewData?.body}</p>
                </Box>
                {reviewData?.body?.length > 1306 && (
                    <Box>
                        {expandedReviews[index] ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                        <Button onClick={() => handleToggleExpand(index)}>
                            {expandedReviews[index] ? "Read Less" : "Read More"}
                        </Button>
                    </Box>
                )}
            </Box>

            {/* for hiding images in dialog  */}
            {isDialog === true ? (
                <div></div>
            ) : (
                <>
                    <Stack
                        direction={"row"}
                        width={"100%"}
                        my={2}
                        spacing={1}
                        overflow={"auto"}
                    >
                        {reviewData?.product_media?.map((item, index) => {
                            return (
                                <Box
                                    width={"100px"}
                                    height={"100px"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    p={1}
                                    sx={{ border: "1px solid lightgray" }}
                                    onClick={() => handleOpenDialog(item?.product_review_id, item?.id, index)}
                                >
                                    <LazyLoadImage
                                        width={"90px"}
                                        style={{ objectFit: "contain" }}
                                        height={"90px"}
                                        src={item?.file_path}
                                        alt={item?.product_review_id}
                                    />
                                </Box>
                            );
                        })}
                    </Stack>
                    <p className="my-2 text-muted py-1 helpful-count">
                        2 People find this helpful
                    </p>
                    <div className="d-flex ">
                        <button
                            onClick={handleHelpfull}
                            className="review-helpful-btn"
                        >
                            Helpful
                        </button>
                        {/* <Stack mt={0.7} direction={"row"} spacing={1}>
                    <CheckCircleIcon sx={{ color: "#318243" }} />
                    <Typography color={"#318243"}>
                        Thanks for honest feedback
                    </Typography>
                </Stack> */}
                        <button
                            onClick={() => setOpen(true)}
                            className="review-report-btn"
                        >
                            Report
                        </button>
                    </div>
                </>
            )}
            <ReportDialog
                open={open}
                onClose={handleClose}
                id={reviewData?.id}
            />
        </div>
    );
}

export default ReviewCard;
