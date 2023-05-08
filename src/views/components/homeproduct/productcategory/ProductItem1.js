import { Container } from "react-bootstrap";
import img1 from "@images/product/item1/laptop.png";
import { Link } from "react-router-dom";
import "./ProductItem1.css";
const ProductItem1 = () => {
    const images = [img1];

    return (
        <div className="image-style">
            <img src={images[0]} alt="Image 2" className="laptop-img" />
        </div>
    );
};

export default ProductItem1;
