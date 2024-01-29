import React, { useEffect, useRef, useState } from "react";
import RatingDetails from "@components/Product/ProductReviews/RatingDetails";
import "./ProductReviews.css";
import { Link } from "react-router-dom";
import ReviewImages from "./ReviewImagesSlider";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import { productReviewsApi } from "../../../../core/api/product-review";
import {
    Box,
    CircularProgress,
    LinearProgress,
    Pagination,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ADD_REVIEW } from "../../../../core/store/review/reviewSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
const PRODUCT_FILTER_KEY_ENUM = {
    TOP: "top-reviews",
    RECENT: "recent-reviews",
};

const PRODUCT_FILTER_LABEL_ENUM = {
    "top-reviews": "Top reviews",
    "recent-reviews": "Recent reviews",
};

const reviewPerPage = 5;

function ProductReviews({ productId, productAsin, onFilterChange }) {
    const dispatch = useDispatch();
    const reviewState = useSelector((slice) => slice.review);

    const [filterBy, setFilterBy] = useState(PRODUCT_FILTER_KEY_ENUM.TOP);
    const [reviews, setReviews] = useState(reviewState.reviews);
    const [reviewLoading, setReviewLoading] = useState(false);
    const reviewRef = useRef(null);
    const isMounted = useRef(false);

    const handlePageChange = (event, value) => {
        reviewRef.current.focus();
        getProductReviews(productId, value, reviewPerPage);
    };

    const getProductReviews = async (id, page = 1, reviewPerPage) => {
        try {
            setReviewLoading(true);
            const res = await productReviewsApi(id, page, reviewPerPage);
            setReviews(res.data);
            dispatch(ADD_REVIEW(res.data));
        } catch (error) {
            console.error(error);
        } finally {
            setReviewLoading(false);
        }
    };
    useEffect(() => {
        if (isMounted.current) {
            onFilterChange(filterBy);
        }
        isMounted.current = true;
    }, [filterBy]);

    useEffect(() => {
        if (!reviewState.reviews?.product_detail) {
            getProductReviews(productId, 1, reviewPerPage);
        }
    }, []);

    return (
        <div className="product-reviews-section product-section">
            <div className="product-reviews-container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div style={{ maxWidth: "350px" }}>
                            <RatingDetails
                                productDetails={
                                    reviews?.product_stats
                                        ? JSON.parse(
                                              reviews?.product_stats?.statistics
                                          )
                                        : []
                                }
                            />
                            <div className="py-4 my-4 border-top border-bottom">
                                <p className="fs-6 fw-semibold mb-3">
                                    Review this product
                                </p>
                                <p className="fs-6 mb-3">
                                    Share your thoughts with other customers
                                </p>
                                <Link to={`/add-review/${productAsin}`}>
                                    <button
                                        className="bg-white border my-1 w-100 rounded-3 shadow"
                                        style={{
                                            fontSize: "14px",
                                            padding: "12px 0",
                                        }}
                                    >
                                        Write a customer review
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-8">
                        {/* <div className="d-flex justify-content-between mb-3">
                            <h3 className="product-section-heading">
                                Reviews with images
                            </h3>
                            <button className="view-all-images-btn">
                                View all images
                            </button>
                        </div> */}

                        <ReviewImages reviews={reviews} productId={productId} />
                        {reviews?.product_detail?.data.length === 0 &&
                            !reviewLoading && (
                                <Typography fontWeight={600}>
                                    No customer reviews
                                </Typography>
                            )}

                        {!!reviews?.product_detail?.data.length && (
                            <>
                                <div
                                    id="reviewSection"
                                    tabIndex="0"
                                    ref={reviewRef}
                                    className="filter-wrapper mt-3 mb-0 "
                                >
                                    {/* <select
                                        className="form-select"
                                        onChange={(e) =>
                                            setFilterBy(e.target.value)
                                        }
                                    >
                                        <option
                                            value={PRODUCT_FILTER_KEY_ENUM.TOP}
                                        >
                                            Top Reviews
                                        </option>
                                        <option
                                            value={
                                                PRODUCT_FILTER_KEY_ENUM.RECENT
                                            }
                                        >
                                            Recent Reviews
                                        </option>
                                    </select> */}
                                </div>

                                <h3 className="product-section-heading my-4 py-1">
                                    {PRODUCT_FILTER_LABEL_ENUM[filterBy]}
                                </h3>
                            </>
                        )}

                        {reviewLoading ? (
                            <Box sx={{ height: "100px" }}>
                                <CircularProgress
                                    sx={{ ml: 5 }}
                                    disableShrink
                                />
                            </Box>
                        ) : (
                            reviews.product_detail?.data?.map(
                                (review, index) => (
                                    <div className="my-4">
                                        <ReviewCard
                                            reviewData={review}
                                            index={index}
                                            productId={productId}
                                        />
                                    </div>
                                )
                            )
                        )}

                        {!!reviews?.product_detail?.data?.length && (
                            <Pagination
                                onChange={handlePageChange}
                                count={Math.ceil(
                                    reviews.product_detail.total / reviewPerPage
                                )}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;
