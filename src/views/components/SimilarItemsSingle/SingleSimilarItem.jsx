import React from "react";
import "./SingleSimilaritem.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import AddCartComponents from "../ProductCard/AddCartComponents";
import { fetchSimilarProducts } from "@store/products/productsThunks";

const SingleSimilarItem = ({ type = "", product }) => {
    const orderEstimatedDelivery = useSelector(
        (state) => state.orders.orderEstimatedDelivery
    );
    const dispatch = useDispatch();
    const handleClick = async () => {
        const productName = product.name;
        try {
            const splitName = productName.split(",", 1);
            const nameBeforeComma = splitName[0];
            await dispatch(
                fetchSimilarProducts({
                    name: nameBeforeComma,
                })
            );
        } catch (error) {
            console.log(error);
        }
    };
    const ProductDetails = () => (
        <div>
            <div className="product-details">
                <div className="dev-section-button-dev-card">
                    <Link to={`${new URL(product?.url).pathname}`}>
                        <div className="product-name product-cart-name-mobile-screen">
                            {product?.name}
                        </div>
                        <div className=" d-sm-none product-prices">
                            {product?.originalPrice && (
                                <div className="product-original-price">
                                    ${product?.originalPrice}
                                </div>
                            )}
                            <div className="product-new-price">
                                <span>$</span>
                                {product?.price?.toString().split(".")[0]}
                                <sup>
                                    {product?.price?.toString().split(".")[1]}
                                </sup>
                            </div>
                        </div>

                        <div className="d-sm-none ">
                            <span className="dilvery-system-mobile-card-product">
                                Get it by{" "}
                                {
                                    orderEstimatedDelivery?.free_shipment_amount
                                        ?.estimate_day
                                }
                            </span>
                            <span className="span-get-data-pagragraph-card">
                                Free Delivery Available{" "}
                            </span>
                            <div></div>
                        </div>
                    </Link>

                    <div className="d-sm-none div-button-card-product">
                        <AddCartComponents
                            product={product}
                            className="d-sm-none add-to-card-button-mobile-product"
                        />
                    </div>
                </div>

                <Link
                    to={`${new URL(product?.url).pathname}`}
                    style={{ textDecoration: "none" }}
                >
                    <div className="d-none d-sm-block product-rating">
                        <StarRatings
                            rating={product?.rating}
                            starRatedColor="rgb(232, 126, 36)"
                            numberOfStars={5}
                            name="rating"
                            isSelectable={false}
                            starDimension={"20px"}
                            starSpacing={"0"}
                        />
                    </div>
                </Link>
                <div className="d-none d-sm-block product-prices">
                    {product?.originalPrice && (
                        <div className="product-original-price">
                            ${product?.originalPrice}
                        </div>
                    )}
                    <div className="product-new-price-similar-item">
                        <span>$</span>
                        {product?.price?.toString().split(".")[0]}.
                        {product?.price?.toString().split(".")[1]}
                        <span style={{ color: "#000", fontWeight: 700 }}>
                            &nbsp;& FREE shipping
                        </span>
                    </div>
                </div>
                {product?.deliveryCharges && (
                    <div className="product-delivery-charges">
                        <FontAwesomeIcon icon={faTruck} />{" "}
                        {product?.deliveryCharges}
                    </div>
                )}
                {type === "recommended" && (
                    <div className="product-delivery-charges mt-2 ms-2">
                        <FontAwesomeIcon className="me-1" icon={faTruck} /> Free
                        Shipping
                    </div>
                )}
            </div>
        </div>
    );
    return (
        <div
            className="similar-item-one mt-5"
            // className={` product   ${inGrid && "product-grid"}`}
            onClick={() => {
                handleClick();
            }}
        >
            <h3>Similar items with fast delivery</h3>
            <div className="similar-item-one-inner">
                <div className="image-wrapper-similar-items">
                    <LazyLoadImage
                        width={"100%"}
                        height={"100%"}
                        src={product?.image}
                        alt={product?.name
                            ?.trim()
                            ?.split(" ")
                            ?.slice(0, 9)
                            ?.join(" ")}
                    />
                </div>
                <div className="details">
                    <ProductDetails />
                </div>
            </div>
        </div>
    );
};

export default SingleSimilarItem;
