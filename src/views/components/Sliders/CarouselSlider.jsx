import React from "react";

import imgss1 from "@images/category1.png";
import imgss2 from "@images/category2.png";
import imgss3 from "@images/category3.png";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselSlider.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const CarouselSlider = () => {
    const productss = useSelector((state) => state.products.products) || [];
    console.print("product@@@", productss);

    return (
        <Carousel>
            <Carousel.Item>
                <div className="row">
                    <div className="col-md-12">
                        <div className="product-section-add">
                            <div style={{ textAlign: "left" }}>
                                Best Selling Products
                                <Link className="text-decoration-none">
                                    see more
                                </Link>
                            </div>

                            <img src={imgss1} className="img-slider-cursule" />
                            <img src={imgss2} className="img-slider-cursule" />
                            <img src={imgss3} className="img-slider-cursule" />
                        </div>
                    </div>
                </div>
                <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="col-md-12">
                    <div className="product-section-add">
                        <div style={{ textAlign: "left" }}>
                            Best Selling Products
                            <Link className="text-decoration-none">
                                see more
                            </Link>
                        </div>

                        <img src={imgss1} className="img-slider-cursule" />
                        <img src={imgss2} className="img-slider-cursule" />
                        <img src={imgss3} className="img-slider-cursule" />
                    </div>
                </div>

                <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
export default CarouselSlider;
