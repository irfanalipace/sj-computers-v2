import React from "react";
import "./ProductReviews.css";

function ProductReviews() {
    return (
        <div className="product-reviews-section product-section">
            <div className="product-reviews-container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <h3 className="product-section-heading">
                            Rating Component Here
                        </h3>
                    </div>
                    <div className="col-12 col-sm-6 col-md-8">
                        <h3 className="product-section-heading">
                            Review Information
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews;
