import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import { formatDateByMonthName } from "../../../../core/utils/helpers";
import { Box, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ReviewCard({ reviewData }) {
    return (
        <div className="review-card mb-2">
            <div className="d-flex align-items-center">
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
                    {reviewData.user.name}
                </p>
            </div>
            <div className="d-md-flex align-items-center my-2">
                <StarRatings
                    rating={parseFloat(reviewData?.rating)}
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
            <p className="review-comment my-0">{reviewData?.body}</p>

            <Stack
                direction={"row"}
                width={"100%"}
                my={2}
                spacing={1}
                overflowX={"auto"}
                // height={"90px"}
            >
                {reviewData?.product_media?.map((item, index) => {
                    return (
                        <Box
                            width={"100px"}
                            height={"100px"}
                            p={1}
                            sx={{ border: "1px solid lightgray" }}
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
                2 People find this helpul
            </p>
            <div className="d-flex ">
                <button className="review-helpful-btn">Helpful</button>
                {/* <Stack mt={0.7} direction={"row"} spacing={1}>
                    <CheckCircleIcon sx={{ color: "#318243" }} />
                    <Typography color={"#318243"}>
                        Thanks for honest feedback
                    </Typography>
                </Stack> */}
                <button className="review-report-btn">Report</button>
            </div>
        </div>
    );
}

export default ReviewCard;
