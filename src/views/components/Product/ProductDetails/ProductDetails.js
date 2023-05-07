import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { DilveryBox } from "./DilveryBox/DilveryBox";

import "./ProductDetail.css";

const ProductDetails = ({ product }) => {
    const brands = useSelector((state) => state.brands.brands);
    const [productBrand, setProductBrand] = useState(null);
    useEffect(() => {
        let brand = brands.filter((brand) => brand?.id == product?.id);
        setProductBrand(brand[0]);
    }, [brands]);
    return (
        <div>
            <div className="">
                <p className="item-title">{product?.name}</p>
            </div>
            <div className="instock-detail">
                {product?.quantity > 0 && (
                    <p className="most-demandind">In Stock</p>
                )}
            </div>
            <div className="row px-0 res">
                <div className="col-lg-4 col-md-6 col-sm-12 revie">
                    <div className="star">
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
                <div className="col-lg-8 col-md-6 col-sm-12">
                    <div>
                        <Link className="links-rting">66 ratings</Link>
                        <Link className="moniter-links">
                            11 answered questions
                        </Link>
                    </div>
                    <span className="size-text">
                      <span className="size-text-details">Size</span>  
                        <Link className="moniter-links border-0">
                            “lg 24 inch monitor”
                        </Link>
                    </span>
                </div>
            </div>

            <hr></hr>
          <div className="cart-details-text">
          <div className="row">
                <div className="col-md-12 color-text">
                    <span className="$-color">$</span>
                    {product?.price?.toString().split(".")[0]}
                    <sup>{product?.price?.toString().split(".")[1]}</sup>
                </div>
            </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12 shipping-button">
                        <p className="shipping-text">
                            Shipping fee to Los Angeles $10 only
                            {/* <DilveryBox /> */}
                        </p>
                    </div>
                </div>
            </div>
         
            <hr></hr>

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
           </div>

            <hr></hr>
            <div className="col-md-12 list-style-margin">
                <ul className="product-details">
                    <li>
                        <span className="item1">Brand</span>
                        <span className="items capitalize">
                            {productBrand?.name}
                        </span>
                    </li>
                    <span className="item11">Resolution</span>
                    <span className="items">FHD 1080p</span>
                    <li>
                        <span className="item12">Technologies</span>
                        <span className="items">Led</span>
                    </li>
                    <li>
                        <span className="item1">Model</span>
                        <span className="items">Smart</span>
                    </li>
                    <li>
                        <span className="item1">Series</span>
                        <span className="items">LG24ML600MBOB</span>
                    </li>
                </ul>
            </div>
            <hr></hr>
            <div className="col-md-12 items-details-description">
                <span className="items-text-style">Items Description</span>
                <ul className="ui-list-items">{product?.description}</ul>
            </div>
        </div>
    );
};

export default ProductDetails;
