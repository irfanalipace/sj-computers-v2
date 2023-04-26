import React from "react";
import rect1 from "@images/product/CarsulSlider/rectangle1.png";
import rect2 from "@images/product/CarsulSlider/rectangle2.png";
import rect3 from "@images/product/CarsulSlider/rectangle3.png";
import rect4 from "@images/product/CarsulSlider/rectangle4.png";
import rect5 from "@images/product/CarsulSlider/rectangle5.png";
import rect6 from "@images/product/CarsulSlider/rectangle6.png";
import rect7 from "@images/product/CarsulSlider/rectangle7.png";
import rect8 from "@images/product/CarsulSlider/rectangle8.png";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselSlider.css";
import { Link } from "react-router-dom";
const CarouselSlider = () => {
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

                            <img src={rect1} className="img-slider-cursule" />
                            <img src={rect2} className="img-slider-cursule" />
                            <img src={rect3} className="img-slider-cursule" />
                            <img src={rect4} className="img-slider-cursule" />
                            <img src={rect5} className="img-slider-cursule" />
                            <img src={rect6} className="img-slider-cursule" />
                            <img src={rect7} className="img-slider-cursule" />
                            <img src={rect8} className="img-slider-cursule" />
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

                        <img src={rect1} className="img-slider-cursule" />
                        <img src={rect2} className="img-slider-cursule" />
                        <img src={rect3} className="img-slider-cursule" />
                        <img src={rect4} className="img-slider-cursule" />
                        <img src={rect5} className="img-slider-cursule" />
                        <img src={rect6} className="img-slider-cursule" />
                        <img src={rect7} className="img-slider-cursule" />
                        <img src={rect8} className="img-slider-cursule" />
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

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
