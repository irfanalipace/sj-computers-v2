import React from "react";
import RatingDetails from "@components/Product/ProductReviews/RatingDetails";
import "./ProductReviews.css";
import { Link } from "react-router-dom";
import ReviewImages from "./ReviewImagesSlider";
import ReviewCard from "./ReviewCard";

function ProductReviews({ reviews }) {
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
                                <Link to={"/add-review"}>
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
                        <h3 className="product-section-heading mb-4 mt-5">
                            Top reviews
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
