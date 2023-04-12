import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductType.css";
import img21 from "@images/product/image21.png";
import img22 from "@images/product/image22.png";
import img23 from "@images/product/image23.png";
import img20 from "@images/product/image20.png";
// import ProductItem1 from './productcategory1/ProductItem1';
import ProductItem1 from "@components/homeproduct/productcategory/ProductItem1";
import ProductItem4 from "@components/homeproduct/productcategory/ProductItem4";

import imgcard from "@images/product/side-img.png";
export const ProductType = () => {
    return (
        <div>
            <div className="row first-section">
                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem4 />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem1 />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem1 />
                    </div>
                </div>
                <div className="col-md-3">
                    <div>
                        <div className="product-section-text">
                            <h2 className="h2-cart">
                                Sign up to get latest <br></br>update on sale
                            </h2>
                            <button type="button" className="button-save">
                                Login Safely
                            </button>
                        </div>

                        <div className="product-section-text1">
                            <img src={imgcard} className="img-copy" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row first-section">
                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem4 />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem4 />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem4 />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="product-section">
                        <ProductItem1 />
                    </div>
                </div>
            </div>
        </div>

        // Rows 2 items code here
    );
};
