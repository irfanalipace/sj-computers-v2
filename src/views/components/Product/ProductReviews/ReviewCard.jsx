import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";

function ReviewCard({ reviewData }) {
    return (
        <div className="review-card mb-2">
            <div className="d-flex align-items-center">
                <div>
                    {reviewData?.image[0] ? (
                        <div className="rounded">
                            <img
                                className="rounded review-author-image"
                                src={reviewData?.image[0]}
                            />
                        </div>
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="fs-2" />
                    )}
                </div>
                <p className="mb-0 ms-2 review-author ps-1">Alan</p>
            </div>
            <div className="d-md-flex align-items-center my-2">
                <StarRatings
                    rating={reviewData?.rating}
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
                Reviewed in United States on January 27, 2021
            </p>
            <p className="verified-review">Verified Purchase</p>
            <p className="review-comment my-0">{reviewData?.name}</p>
            <p className="my-2 text-muted py-1 helpful-count">
                2 People find this helpul
            </p>
            <div className="d-flex">
                <button className="review-helpful-btn">Helpful</button>
                <button className="review-report-btn">Report</button>
            </div>
        </div>
    );
}

export default ReviewCard;
