import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./ProductCard.css";
import AddCartComponents from "../Product/CheckOutCard/AddCartComponents";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack, Typography } from "@mui/material";

const Product = ({ type = "", product, inGrid, color = "" }) => {
    const [show, setShow] = useState(false);

    const randomLabel = () => {};

    const orderEstimatedDelivery = useSelector(
        (state) => state.orders.orderEstimatedDelivery
    );

    const Label = ({ bgcolor = "", text = "text", secondText = "" }) => {
        return (
            <Box
                bgcolor={bgcolor}
                px={2}
                py={0.5}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Stack direction={"row"} spacing={1}>
                    <Typography
                        color={"white"}
                        fontWeight={500}
                        fontSize={"12px"}
                        fontFamily={"Inter"}
                    >
                        {text}
                    </Typography>
                    {secondText && (
                        <Typography
                            fontWeight={500}
                            fontSize={"12px"}
                            fontFamily={"Inter"}
                            color={color}
                        >
                            {secondText}
                        </Typography>
                    )}
                </Stack>
            </Box>
        );
    };

    const Trending = () => <Label bgcolor="#B12704" text="Trending" />;
    const BestSeller = () => (
        <Label
            text="Best"
            bgcolor="#000000"
            secondText="seller"
            color="#E0BC00"
        />
    );
    const SjChoice = () => <Label bgcolor="#E87E24" text="SJ's Choice" />;
    const OFF = () => (
        <Label bgcolor="#00305E" text="30%" secondText="OFF" color="#E87E24" />
    );
    const Demanding = () => <Label bgcolor="#318243" text="Demanding" />;

    const componentsArray = [Trending, BestSeller, SjChoice, OFF, Demanding];

    const getRandomComponent = () => {
        const randomIndex = Math.floor(Math.random() * componentsArray.length);
        const RandomComponent = componentsArray[randomIndex];
        return <RandomComponent />;
    };

    const ProductDetails = () => (
        <div>
            <div className="product-details">
                {/* <div>
            <span className="span-the-product-color-product">
            crocs Contrary to popular
            (205100-410)
            </span>
        </div> */}

                <div className="dev-section-button-dev-card">
                    <Link to={`${new URL(product?.url).pathname}`}>
                        <div className="product-name product-cart-name-mobile-screen">
                            {product.name}
                        </div>

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
                                <sup>
                                    {product?.price?.toString().split(".")[1]}
                                </sup>
                            </div>
                            <div>
                                {/* <span className="old-price-product-card">$3,495</span> */}
                            </div>
                        </div>

                        <div className="d-sm-none ">
                            {/* <button className="off-sale-button-product-card">50% <span>{' '} off</span></button> */}

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
                        <Stack
                            alignItems={"center"}
                            spacing={1}
                            direction={"row"}
                        >
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="rgb(232, 126, 36)"
                                numberOfStars={5}
                                name="rating"
                                isSelectable={false}
                                starDimension={"20px"}
                                starSpacing={"0"}
                            />

                            <Typography
                                fontFamily={"Inter"}
                                sx={{ pt: 0.3 }}
                                fontWeight={500}
                                fontSize={"12px"}
                                lineHeight={"17px"}
                                color={"#007185"}
                            >
                                {product.total_review}
                            </Typography>
                        </Stack>
                        {getRandomComponent()}

                        {/* <span className="product-num-reviews ms-2 mt-1">
                            {product.numReviews ? product.numReviews : 0}
                        </span> */}
                    </div>
                </Link>
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
                        {/* <i className="fa fa-truck"></i>{" "} */}
                        <FontAwesomeIcon icon={faTruck} />{" "}
                        {product.deliveryCharges}
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
        <div className={` product   ${inGrid && "product-grid"}`}>
            <Link to={`${new URL(product?.url).pathname}`}>
                <div
                    className={` ${
                        inGrid ? "product-image-grid" : ""
                    } product-image`}
                >
                    {/* {inGrid && (
                    <div className="product-badge">
                        <div className="badge-text">Best Seller</div>
                    </div>
                )} */}

                    <div className="image-wrapper">
                        <LazyLoadImage
                            width={"100%"}
                            height={"100%"}
                            src={product.image}
                            alt={product?.name
                                ?.trim()
                                ?.split(" ")
                                ?.slice(0, 9)
                                ?.join(" ")}
                        />
                    </div>
                </div>
            </Link>
            <ProductDetails />
        </div>
    );
};

export default Product;
