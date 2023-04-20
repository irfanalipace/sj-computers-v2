import "./ProductDetail.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import imges from "@images/bottom-arrow.png";
import { DilveryBox } from "./DilveryBox/DilveryBox";

const ProductDetails = ({ product }) => {
    return (
        <div>
            <div className="">
                <p className="item-title">{product?.name}</p>
            </div>
            <div>
                <p className="most-demandind">Most demanding </p>
            </div>
            <div className="row mx-0 res">
                <div className="col-md-3 col-sm-6 col-sm-12 px-0">
                    <div className="star">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star chek"></span>
                    </div>
                    <button className="selling-button">
                        Top <span className="selling-color">Selling</span>
                    </button>
                </div>
                <div className="col-md-9 col-sm-6 col-sm-12 px-0">
                    <div className="d-flex mt-4">
                        <Link className="links-rting">66 ratings</Link>
                        <Link className="moniter-links">
                            11 answered questions
                        </Link>
                    </div>
                    <span className="size-text">
                        Size
                        <Link className="moniter-links">
                            “lg 24 inch monitor”
                        </Link>
                    </span>
                </div>
            </div>

            <hr></hr>
            <div className="row">
                <div className="col-md-12 color-text">
                    <sup className="$-color">$</sup>{" "}
                    {Math.floor(product?.price)}
                    <sup>{product?.price % 1}</sup>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12 shipping-button">
                        <p className="shipping-text">
                            Shipping fee to Los Angeles $10 only
                            <button className="img-text-color-details">
                                <DilveryBox />
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <hr></hr>

            <p className="more-styles">More Styles:</p>

            <div class="row">
                <div className="button-detail-item">
                    <Link
                        to="/Product"
                        className="text-decoration-none"
                        style={{ color: "#333333" }}
                    >
                        <h6 class="card-title1">24” Full HD IPS</h6>
                        <p class="card-text1">US$ 159.97</p>
                    </Link>
                </div>
                <div className="button-detail-item">
                    <Link
                        to="/Product"
                        className="text-decoration-none"
                        style={{ color: "#333333" }}
                    >
                        <h6 class="card-title1">27” Full HD IPS</h6>
                        <p class="card-text1">US$ 149.97</p>
                    </Link>
                </div>
            </div>

            <hr></hr>
            <div className="col-md-12 list-style-margin">
                <ul className="product-details">
                    <li>
                        <span className="item1">Brand</span>
                        <span className="items">LG </span>
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
            <div className="col-md-12">
                <span className="items-text-style">Items Description</span>
                <ul className="ui-list-items">
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum. has been the
                        industry's standard dummy text ever since the 1500s,
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;
