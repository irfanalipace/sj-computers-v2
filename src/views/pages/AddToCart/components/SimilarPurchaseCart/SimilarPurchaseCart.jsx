import { Typography } from "@mui/material";
import "./SimilarPurchaseCart.css";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../../../../components/Sliders/Slider.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SwiperCore, { Navigation } from "swiper";

import { Link } from "react-router-dom";
import AddCartComponents from "../../../../components/Product/CheckOutCard/AddCartComponents";

import StarRatings from "react-star-ratings";
import useAddToCart from "../../../../components/Product/CheckOutCard/useAddToCart";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { useParams } from "react-router-dom";

SwiperCore.use([Navigation]);

const SimilarPurchaseCart = ({ products }) => {
    const [addingStates, setAddingStates] = useState({});

    const ProductDetails = ({ product }) => {
        const cartClickHandler = useAddToCart(product, 1);
        const params = useParams();
        const isAdding = addingStates[product.id];
        const cart = useSelector((state) => state.cart.cart);
        const cartItem = cart.find((ci) => ci.id === product.id);

        return (
            <div className="pb-3 slider-details">
                <div className="product-details">
                    <div className="dev-section-button-dev-card">
                        <Link to={`${new URL(product?.url)?.pathname}`}>
                            <div className="product-naame product-cart-name-mobile-screen">
                                {product.name}
                            </div>

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
                                        {
                                            product?.price
                                                ?.toString()
                                                .split(".")[1]
                                        }
                                    </sup>
                                </div>
                            </div>

                            <div className="d-sm-none ">
                                <span className="dilvery-system-mobile-card-product">
                                    Get it by{" "}
                                    {/* {
                                    orderEstimatedDelivery?.free_shipment_amount
                                        ?.estimate_day
                                } */}
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
                            <div className="d-flex align-items-center">
                                <StarRatings
                                    rating={product?.rating}
                                    starRatedColor="rgb(232, 126, 36)"
                                    numberOfStars={5}
                                    name="rating"
                                    isSelectable={false}
                                    starDimension={"20px"}
                                    starSpacing={"0"}
                                />
                                <span
                                    className="ms-2"
                                    style={{
                                        color: "#1270c4",
                                        fontSize: "12px",
                                    }}
                                >
                                    ({product?.total_review})
                                </span>
                            </div>
                        </div>
                    </Link>

                    <div className="d-none d-sm-block product-prices mb-2">
                        {product.originalPrice && (
                            <div className="product-original-price">
                                ${product.originalPrice}
                            </div>
                        )}
                        <span>$</span>
                        {product?.price?.toString().split(".")[0]}.
                        {product?.price?.toString().split(".")[1]}
                    </div>
                    <div style={{ fontSize: "12px" }} className="mt-0 mb-2">
                        List Price:&ensp;
                        <span style={{ textDecoration: "line-through" }}>
                            ${product?.price}
                        </span>
                        <span
                            style={{ fontWeight: "bold", lineHeight: "16px" }}
                        >
                            {/* {
                            orderEstimatedDelivery?.free_shipment_amount
                                ?.estimate_day
                        } */}
                        </span>
                    </div>
                    {product.deliveryCharges && (
                        <div className="product-delivery-charges">
                            <FontAwesomeIcon icon={faTruck} />{" "}
                            {product.deliveryCharges}
                        </div>
                    )}
                    {/* {type === "recommended" && (
                    <div style={{ fontSize: "12px", marginTop: "5px" }}>
                        Free shipping by SJ
                    </div>
                )} */}
                </div>

                <>
                    {isAdding ? (
                        <p
                            style={{
                                fontSize: "12px",
                                marginLeft: "23px",
                                marginTop: "2.0rem",
                            }}
                        >
                            {" "}
                            <DoneRoundedIcon
                                sx={{ color: "green", fontSize: "20px" }}
                            />{" "}
                            Item Added Successfully
                        </p>
                    ) : !cartItem?.id ? (
                        <button
                            style={{ marginLeft: "23px" }}
                            className="cart-btn"
                            onClick={(e) => {
                                setAddingStates((prevState) => ({
                                    ...prevState,
                                    [product.id]: true,
                                }));
                                cartClickHandler(
                                    null,
                                    `/cart/${params?.title}/dp/${
                                        params?.productId
                                    }/${1}`
                                );
                            }}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <p
                            style={{
                                fontSize: "12px",
                                marginTop: "2.05rem",
                                marginLeft: "25px",
                            }}
                        >
                            Item already in cart
                        </p>
                    )}
                </>
            </div>
        );
    };
    return (
        <>
            <div
                // className="recommendation-container"
                style={{
                    background: "#fff",
                    marginLeft: "10px",
                }}
            >
                <div className="product-image-class">
                    <Typography
                        variant="h5"
                        fontSize={16}
                        fontFamily={"Inter"}
                        fontWeight={600}
                        pt={4}
                        mt={1}
                        ml={2}
                        mb={5}
                    >
                        Customers who bought this item also bought
                    </Typography>

                    <div
                        className="slider-wrapper"
                        style={{ margin: "10px 20px" }}
                    >
                        {!products ? (
                            <LoaderComponent />
                        ) : (
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={20}
                                className="my-unique-swiper"
                                style={{ padding: "0 40px" }}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    // when window width is >= 480px
                                    480: {
                                        slidesPerView: 3,
                                    },
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 4,
                                    },

                                    768: {
                                        slidesPerView: 4,
                                    },

                                    1200: {
                                        // slidesPerView: 6,
                                        slidesPerView: 5,
                                    },

                                    1400: {
                                        // slidesPerView: 6,
                                        slidesPerView: 6,
                                    },
                                }}
                                navigation
                            >
                                {products?.length > 0 ? (
                                    products?.map((product) => (
                                        <SwiperSlide key={"psr-" + product?.id}>
                                            <div
                                            // className="px-1"
                                            >
                                                <div className={` product`}>
                                                    <Link
                                                        to={`${
                                                            new URL(
                                                                product?.url
                                                            ).pathname
                                                        }`}
                                                    >
                                                        <div
                                                            className={`product-image`}
                                                        >
                                                            <div className="image-wrapper">
                                                                <LazyLoadImage
                                                                    width={
                                                                        "100%"
                                                                    }
                                                                    height={
                                                                        "100%"
                                                                    }
                                                                    src={
                                                                        product.image
                                                                    }
                                                                    alt={product?.name
                                                                        ?.trim()
                                                                        ?.split(
                                                                            " "
                                                                        )
                                                                        ?.slice(
                                                                            0,
                                                                            9
                                                                        )
                                                                        ?.join(
                                                                            " "
                                                                        )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <ProductDetails
                                                        product={product}
                                                    />
                                                </div>
                                            </div>{" "}
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <>
                                        <LoaderComponent />
                                    </>
                                )}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarPurchaseCart;
