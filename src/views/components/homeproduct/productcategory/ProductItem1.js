import { Container } from "react-bootstrap";
import img1 from "@images/product/item1/laptop.png";
import "./ProductItem4.css";
const ProductItem1 = () => {
    const images = [img1];

    return (
        <Container>
            <div>
                <img src={images[0]} alt="Image 2" className="laptop" />
            </div>
        </Container>
    );
};

export default ProductItem1;
