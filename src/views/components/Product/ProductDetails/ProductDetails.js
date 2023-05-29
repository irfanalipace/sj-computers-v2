import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { snakeCaseToPrettyText } from "@utils/helpers";

import { DilveryBox } from "./DilveryBox/DilveryBox";

import "./ProductDetail.css";

const ProductDetails = ({ product }) => {
    const brands = useSelector((state) => state.brands.brands);
    const [productBrand, setProductBrand] = useState(null);
    const [description, setDescription] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    let acceptedKeys = [
        "brand",
        "cpu_model",
        "hard_disk",
        "operating_system",
        "ram_memory",
    ];
    useEffect(() => {
        let brand = brands.filter((brand) => brand?.id == product?.id);
        setProductBrand(brand[0]);
    }, [brands]);

    useEffect(() => {
        productDetailsArray();
    }, [product?.description]);

    const productDetailsArray = () => {
        Object.entries(product?.description).forEach(([key, value]) => {
            let _value = "";
            if (key === "bullet_point") {
                setDescription(value);
                return;
            }
            if (Array.isArray(value)) {
                if (value[0]?.value) {
                    let unit = value[0]?.unit ? value[0]?.unit : "";
                    _value = value[0]?.value + " " + unit;
                } else if (
                    value[0]?.installed_size &&
                    Array.isArray(value[0]?.installed_size)
                ) {
                    let unit = value[0]?.installed_size[0]?.unit
                        ? value[0]?.installed_size[0]?.unit
                        : "";
                    _value = value[0]?.installed_size[0]?.value + " " + unit;
                } else if (
                    value[0]?.family &&
                    Array.isArray(value[0]?.family)
                ) {
                    _value = value[0]?.family[0]?.value;
                } else if (value[0]?.size && Array.isArray(value[0]?.size)) {
                    let unit = value[0]?.size[0]?.unit
                        ? value[0]?.size[0]?.unit
                        : "";
                    _value = value[0]?.size[0]?.value + " " + unit;
                }
            }

            if (acceptedKeys.includes(key)) {
                let item = {
                    key: snakeCaseToPrettyText(key),
                    value: _value,
                };
                setProductDetails((prev) => [...prev, item]);
            }
        });
    };

    return (
        <div className="container">
            <div className="">
                <p className="item-title">{product?.name}</p>
            </div>
            <div className="instock-detail">
                <p className="most-demandind">
                    {product?.in_stock > 0 ? (
                        <span className="text-green">In Stock</span>
                    ) : (
                        <span className="text-danger">Out of stock</span>
                    )}
                </p>
            </div>
            <div className="row px-0  res row-cols-sm-2">
                <div className="col-6 col-sm-6 col-lg-4 col-md-6  product-review">
                    <div className="star my-2">
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
                    <button className="selling-button">
                        Top <span className="selling-color">Selling</span>
                    </button>
                </div>
                <div className="col-6 col-sm-6 col-lg-4 col-md-6">
                    <div className="mt-3">
                        <button className="product-rating">
                            {product?.numReviews ? product.numReviews : "0"}{" "}
                            ratings
                        </button>
                        {/* <Link className="product-info">
                            11 answered questions
                        </Link> */}
                    </div>
                    <span className="size-text">
                        <span className="size-text-details">
                            Items Available
                        </span>
                        {/* <Link className="product-info border-0">
                            “lg 24 inch monitor”
                        </Link> */}
                        <button className="product-info border-0" style={{backgroundColor:'white'}}>
                            {product?.quantity}
                            {" items"}
                        </button>
                    </span>
                </div>
            </div>

            <div className="divsection">
                <hr className="hr-card-details"></hr>
                <div className="cart-details-text">
                    <div className="row">
                        <div className="col-md-12 color-text">
                            <span className="$-color">$</span>
                            {product?.price?.toString().split(".")[0]}
                            <sup>
                                {product?.price?.toString().split(".")[1]}
                            </sup>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12 shipping-button">
                        {/* <p className="shipping-text">
                            Shipping fee to Los Angeles $10 only
                         
                        </p> */}
                    </div>
                </div>
            </div>
            {/* 
            <hr className="hr-card-details"></hr>

            <p className="more-styles">More Styles:</p>

            <div className="text-box-details">
                <div className="row">
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">24” Full HD IPS</h6>
                            <p className="card-text1">US$ 159.97</p>
                        </Link>
                    </div>
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">27” Full HD IPS</h6>
                            <p className="card-text1">US$ 149.97</p>
                        </Link>
                    </div>
                </div>
            </div> */}

            <hr className="hr-card-details"></hr>
            <div className="col-md-12 list-style-margin">
                <ul className="product-details">
                    {productDetails.map((item, index) => (
                        <>
                            {item?.value && (
                                <li
                                    key={`${item.key}-${index}`}
                                    className="row mx-0"
                                >
                                    <div className="col-md-3 col-6">
                                        <span className="item12 text-capitalize">
                                            {item?.key}
                                        </span>
                                    </div>
                                    <div className="col-md-9 col-6">
                                        <span className="items text-capitalize">
                                            {item?.value}
                                        </span>
                                    </div>
                                </li>
                            )}
                        </>
                    ))}
                </ul>
            </div>
            <hr className="hr-card-details"></hr>

            <div className="col-md-12 items-details-description">
                <h3 className="items-text-style">Items Description</h3>

                <ol type="1">
                    {description?.map((item, index) => (
                        <li key={index}>{item.value}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default ProductDetails;
