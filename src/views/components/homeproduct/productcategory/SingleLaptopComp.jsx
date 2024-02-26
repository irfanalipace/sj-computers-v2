import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./SingleLaptopComp.css";
import img1 from "@images/product/side-img.png";
const SingleLaptopComp = () => {
    const images = [img1];

    return (
        <Container>
            <Row>
                <h4 style={{ textAlign: "left" }}>Laptops</h4>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <img src={images[0]} alt="Image 2" className="laptop" />
                </Col>
            </Row>
        </Container>
    );
};

export default SingleLaptopComp;
