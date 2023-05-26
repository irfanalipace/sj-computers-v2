import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const Product = ({ product, inGrid }) => {
    const ProductDetails = () => (
        <div className="product-details">
             {/* <div>
                <span className="span-the-product-color-product">
                crocs Contrary to popular
                (205100-410)
                </span>
            </div> */}
            <Link to={`/product/${product.id}`}>
                <div className="product-name product-cart-name-mobile-screen">{product.name}</div>
            </Link>
            

            {/* Mobile code here */}
        
        <div className=" d-sm-none product-prices">
                {product.originalPrice && (
                    <div className="product-original-price">
                        ${product.originalPrice}
                    </div>
                )}
                <div className="product-new-price">
                    <span>$</span>
                    {product?.price?.toString().split(".")[0]}
                    <sup>{product?.price?.toString().split(".")[1]}</sup>
                   
                </div>
                    <div>
                    <span className="old-price-product-card">$3,495</span>
                        </div>
                 
               
            </div>
        
     
            <div className="d-sm-none " style={{marginTop:'-14px'}}>
                    <button className="off-sale-button-product-card">50% <span>{' '} off</span></button>
                    <span className="span-get-data-pagragraph-card">Get it by Tomorrow, May 26 </span>

                    <span className="span-get-data-pagragraph-card">Free Delivery Available</span>
                      <button className="add-to-card-button-mobile-product">Add To Cart</button>
                  </div>

            <div className="d-none d-sm-block product-rating">
                <StarRatings
                    rating={product.rating}
                    starRatedColor="rgb(232, 126, 36)"
                    numberOfStars={5}
                    name="rating"
                    isSelectable={false}
                    starDimension={"20px"}
                    starSpacing={"0"}
                />
                <span className="product-num-reviews ms-2 mt-1">
                    {product.numReviews ? product.numReviews : 0}
                </span>

              
            </div>

            {/* {!inGrid && (
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
            )} */}
            <div className="d-none d-sm-block product-prices">
                {product.originalPrice && (
                    <div className="product-original-price">
                        ${product.originalPrice}
                    </div>
                )}
                <div className="product-new-price">
                    <span>$</span>
                    {product?.price?.toString().split(".")[0]}
                    <sup>{product?.price?.toString().split(".")[1]}</sup>
                </div>
            </div>
            {product.deliveryCharges && (
                <div className="product-delivery-charges">
                    <i className="fa fa-truck"></i> {product.deliveryCharges}
                </div>
            )}
        </div>
    );

    return (
        <div className={`product ${inGrid && "product-grid"}`}>
            <div className={`${inGrid && "product-image-grid"} product-image`}>
                {/* {inGrid && (
                    <div className="product-badge">
                        <div className="badge-text">Best Seller</div>
                    </div>
                )} */}
                <div className="image-wrapper">
                    <img src={product.image} alt={product.brand} />
                </div>
            </div>
            <ProductDetails />
        </div>
    );
};

export default Product;
