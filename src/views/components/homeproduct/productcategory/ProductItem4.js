import { Row, Col } from "react-bootstrap";
import img21 from "@images/product/image21.png";
import img22 from "@images/product/image22.png";
import img23 from "@images/product/image23.png";
import img20 from "@images/product/image20.png";
import { Link } from "react-router-dom";
import "./ProductItem4.css";
const ProductItem4 = () => {
    const images = [img21, img20, img22, img23];

    return (
        <Row className="mx-0">
            {/* <h4>Shop by Category</h4> */}
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/1" className="category-item">
                    <img
                        src={images[0]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Category 1</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/1" className="category-item">
                    <img
                        src={images[1]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Category 2</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/1" className="category-item">
                    <img
                        src={images[2]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Category 3</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/1" className="category-item">
                    <img
                        src={images[3]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Category 4</div>
                </Link>
            </Col>
        </Row>
    );
};

export default ProductItem4;
