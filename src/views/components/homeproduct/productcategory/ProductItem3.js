import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "@images/product/item3/image1.png";
import img2 from "@images/product/item3/image2.png";
import img3 from "@images/product/item3/image3.png";

import "./ProductItem3.css";

const ProductItem3 = () => {
    const images = [img1, img2, img3];

    return (
        <Container>
            <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <img
                        src={images[2]}
                        alt="Image 2"
                        className="dynamic-image"
                        style={{ height: "300px" }}
                    />
                    <p>Product Name</p>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <img
                        src={images[1]}
                        alt="Image 2"
                        className="dynamic-image"
                        style={{ height: "100px" }}
                    />
                    <p>Lorem Ipsum | up to 30% off</p>
                    <img
                        src={images[0]}
                        alt="Image 2"
                        className="dynamic-image"
                        style={{ height: "155px" }}
                    />
                    <p>Product Name</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductItem3;
