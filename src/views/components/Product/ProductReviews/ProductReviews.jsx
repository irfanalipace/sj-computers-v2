import React, { useState } from "react";
import RatingDetails from "@components/Product/ProductReviews/RatingDetails";
import "./ProductReviews.css";
import { Link } from "react-router-dom";
import ReviewImages from "./ReviewImagesSlider";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router";
const PRODUCT_FILTER_KEY_ENUM = {
    TOP: "top-reviews",
    RECENT: "recent-reviews",
};

const PRODUCT_FILTER_LABEL_ENUM = {
    "top-reviews": "Top reviews",
    "recent-reviews": "Recent reviews",
};

function ProductReviews({ reviews, productId }) {
    const [filterBy, setFilterBy] = useState(PRODUCT_FILTER_KEY_ENUM.TOP);
 
    return (
        <div className="product-reviews-section product-section" id="reviews">
            <div className="product-reviews-container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div style={{ maxWidth: "350px" }}>
                            <RatingDetails />
                            <div className="py-4 my-4 border-top border-bottom">
                                <p className="fs-6 fw-semibold mb-3">
                                    Review this product
                                </p>
                                <p className="fs-6 mb-3">
                                    Share your thoughts with other customers
                                </p>
                                <Link to={`/add-review/${productId}`}>
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
                        <div className="d-flex justify-content-between mb-3">
                            <h3 className="product-section-heading">
                                Reviews with images
                            </h3>
                            <button className="view-all-images-btn">
                                View all images
                            </button>
                        </div>

                        <ReviewImages reviews={reviews} />
                        <div className="filter-wrapper mt-3 mb-0 ">
                            <select
                                className="form-select"
                                onChange={(e) => setFilterBy(e.target.value)}
                            >
                                <option value={PRODUCT_FILTER_KEY_ENUM.TOP}>
                                    Top Reviews
                                </option>
                                <option value={PRODUCT_FILTER_KEY_ENUM.RECENT}>
                                    Recent Reviews
                                </option>
                            </select>
                        </div>

                        <h3 className="product-section-heading my-4 py-1">
                            {PRODUCT_FILTER_LABEL_ENUM[filterBy]}
                        </h3>
                        {reviews.map((review) => (
                            <div className="my-4">
                                <ReviewCard reviewData={review} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;
