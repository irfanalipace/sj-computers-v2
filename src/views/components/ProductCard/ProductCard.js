import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const Product = ({
    id,
    imageSrc,
    name,
    rating,
    numReviews,
    offPercentage,
    originalPrice,
    newPrice,
    deliveryCharges,
}) => {
    console.log("id:", id);
    return (
        <div className="product">
            <div className="product-image">
                <img src={imageSrc} alt={name} />
            </div>
            <div className="product-details">
                <Link to={`/product/${id}`}>
                    <div className="product-name">{name}</div>
                </Link>
                <div className="product-rating">
                    <StarRatings
                        rating={rating}
                        starRatedColor="rgb(232, 126, 36)"
                        numberOfStars={5}
                        name="rating"
                        isSelectable={false}
                        starDimension={"20px"}
                        starSpacing={"0"}
                    />
                    <span className="product-num-reviews">{numReviews}</span>
                </div>
                <div className="product-badge">
                    <div className="badge-text">Best Seller</div>
                </div>
                <div className="product-deal my-1">
                    <div className="product-off-percentage">
                        {offPercentage}% off
                    </div>
                    <span>Deals</span>
                </div>
                <div className="product-prices">
                    <div className="product-original-price">
                        {originalPrice}
                    </div>
                    <div className="product-new-price">{newPrice}</div>
                </div>
                <div className="product-delivery-charges">
                    <i className="fa fa-truck"></i> {deliveryCharges}
                </div>
            </div>
        </div>
    );
};

export default Product;

export const ProductBadge = ({ dealType }) => {};
