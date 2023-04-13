import { Container } from "react-bootstrap";
import img1 from "@images/product/item1/laptop.png";
import { Link } from "react-router-dom";
import "./ProductItem1.css";
const ProductItem1 = () => {
    const images = [img1];

    return (
        <Container>
            {/* <h4 className="laptop-product">Laptops</h4> */}
            <div>
                <img src={images[0]} alt="Image 2" className="laptop-img" />
            </div>
            {/* <Link to="/" className="text-decoration-none">
                            <p>Start here</p>
                        </Link> */}
        </Container>
    );
};

export default ProductItem1;
