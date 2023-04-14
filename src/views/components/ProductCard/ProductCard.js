import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const Product = ({ product, inGrid }) => {
    const ProductDetails = () => (
        <div className="product-details">
            <Link to={`/product/${product.id}`}>
                <div className="product-name">{product.name}</div>
            </Link>
            <div className="product-rating">
                <StarRatings
                    rating={product.rating}
                    starRatedColor="rgb(232, 126, 36)"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension={"20px"}
                    starSpacing={"0"}
                />
                <span className="product-num-reviews">
                    {product.numReviews}
                </span>
            </div>

            {!inGrid && (
                <>
                    <div className="product-badge">
                        <div className="badge-text">Best Seller</div>
                    </div>
                    <div className="product-deal my-1">
                        <div className="product-off-percentage">
                            {product.offPercentage}% off
                        </div>
                        <span>Deals</span>
                    </div>
                </>
            )}
            <div className="product-prices">
                <div className="product-original-price">
                    {product.originalPrice}
                </div>
                <div className="product-new-price">{product.newPrice}</div>
            </div>
            <div className="product-delivery-charges">
                <i className="fa fa-truck"></i> {product.deliveryCharges}
            </div>
        </div>
    );

    return (
        <div className={`product ${inGrid && "product-grid"}`}>
            <div className={`${inGrid && "product-image-grid"} product-image`}>
                {inGrid && (
                    <div className="product-badge">
                        <div className="badge-text">Best Seller</div>
                    </div>
                )}
                <img src={product.imageSrc} alt={product.name} />
            </div>
            <ProductDetails />
        </div>
    );
};

export default Product;
