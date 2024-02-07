import React, { useEffect, useState } from "react";
import { featureProductsApi } from "@api/products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import "./Sugesteditems.css";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import StarRatings from "react-star-ratings";
import useAddToCart from "../../Product/CheckOutCard/useAddToCart";

const SeggestedItems = ({ num }) => {
    const [products, setProducts] = useState([]);
    const [addingStates, setAddingStates] = useState({});
    const getFeaturedProduct = async () => {
        try {
            const resp = await featureProductsApi(12);
            const selectedProducts = resp?.data.slice(0, num);
            setProducts(selectedProducts);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getFeaturedProduct();
    }, []);
    const ProductDetails = ({ product }) => {
        const cartClickHandler = useAddToCart(product, 1);
        const isAdding = addingStates[product.id];
        return (
            <div>
                <div className="product-details">
                    <div className="dev-section-button-dev-card">
                        <Link
                            style={{ color: "#007185", textDecoration: "none" }}
                        >
                            <div
                                className="suggested-items product-name product-cart-name-mobile-screen"
                                style={{ fontSize: "12px" }}
                            >
                                {product.name}
                            </div>
                            <div className=" d-sm-none product-prices">
                                {product.originalPrice && (
                                    <div className="product-original-price">
                                        ${product.originalPrice}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>

                    <Link style={{ textDecoration: "none" }}>
                        {/* <div className="d-none d-sm-block product-rating"> */}
                        <StarRatings
                            rating={product?.rating}
                            starRatedColor="rgb(232, 126, 36)"
                            numberOfStars={5}
                            name="rating"
                            isSelectable={false}
                            starDimension={"15px"}
                            starSpacing={"0"}
                        />
                        <span className="ms-2" style={{ color: "#1270c4" }}>
                            ({product?.total_review})
                        </span>
                        {/* </div> */}
                    </Link>
                    <div className="item-price mb-2">
                        {product.originalPrice && (
                            <div className="product-original-price">
                                ${product.originalPrice}
                            </div>
                        )}
                        ${product?.price?.toString().split(".")[0]}.
                        {product?.price?.toString().split(".")[1]}
                    </div>
                    {isAdding ? (
                        <p style={{ fontSize: "12px" }}>
                            {" "}
                            <DoneRoundedIcon
                                sx={{ color: "green", fontSize: "20px" }}
                            />{" "}
                            <span style={{ fontSize: "11px" }}>
                                Item Added Successfully
                            </span>
                        </p>
                    ) : (
                        <button
                            className="suggested-item-btn"
                            onClick={(e) => {
                                setAddingStates((prevState) => ({
                                    ...prevState,
                                    [product.id]: true,
                                }));

                                cartClickHandler(e, null, 2).then(() => {
                                    setAddingStates((prevState) => ({
                                        ...prevState,
                                        [product.id]: false,
                                    }));
                                });
                            }}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div>
            {products?.map((item) => (
                <div className="suggested-item-container">
                    <div className="suggested-item-image">
                        <div>
                            <LazyLoadImage
                                width={"100%"}
                                height={"100%"}
                                src={item?.image}
                                alt={item?.name
                                    ?.trim()
                                    ?.split(" ")
                                    ?.slice(0, 9)
                                    ?.join(" ")}
                            />
                        </div>
                    </div>
                    {/* <div className="suggested-items-content">
                       
                    </div> */}
                    <span className="suggested-items-content">
                        <ProductDetails product={item} />
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SeggestedItems;
