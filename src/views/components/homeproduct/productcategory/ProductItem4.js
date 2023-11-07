import { Row, Col } from "react-bootstrap";
import img21 from "@images/product/image21.png";
import img22 from "@images/product/image22.png";
import img23 from "@images/product/image23.png";
import img20 from "@images/product/image20.png";
import btoimg from "@images/categories/btoweb.webp";
import laptopimg from "@images/categories/laptopweb.webp";
// import monitorimg from "@images/categories/monitorweb.webp";
import monitorimg from "@images/categories/desktopweb.webp";
import desktopimgweb from "@images/categories/desktopweb-page.webp";
import { Link } from "react-router-dom";
import "./ProductItem4.css";
const ProductItem4 = () => {
    const images = [btoimg, laptopimg, desktopimgweb, monitorimg];

    return (
        <Row className="mx-0 product-item-4">
            {/* <h4>Shop by Category</h4> */}
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/bto" className="category-item">
                    <img
                        src={images[0]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">BTO</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/laptops" className="category-item">
                    <img
                        src={images[1]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Laptop</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/desktop" className="category-item">
                    <img
                        src={images[2]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Desktop</div>
                </Link>
            </Col>
            <Col xs={12} sm={6} className="px-0">
                <Link to="/category/gaming_desktops" className="category-item">
                    <img
                        src={images[3]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    <div className="category-name">Gaming Desktops</div>
                </Link>
            </Col>
        </Row>
    );
};

export default ProductItem4;
