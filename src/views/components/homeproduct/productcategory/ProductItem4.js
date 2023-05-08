import { Container, Row, Col } from "react-bootstrap";
import img21 from "@images/product/image21.png";
import img22 from "@images/product/image22.png";
import img23 from "@images/product/image23.png";
import img20 from "@images/product/image20.png";
import { Link } from "react-router-dom";
import "./ProductItem4.css";
const ProductItem4 = () => {
    const images = [img21, img20, img22, img23];

    return (
        <Container>
            
            <Row>
            {/* <h4>Shop by Category</h4> */}
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Link to='/category'>
                <img
                        src={images[0]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    </Link>
                  
                    <Link className='text-decoration-none items-name-text' to='/category'>Laptop</Link>
                    <Link to='/category'>
                    <img
                        src={images[1]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                    </Link>
                     <Link className='text-decoration-none items-name-text' to='/category'>Graphic Card</Link>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
             
                    <Link to='/category'>
                   
                    <img
                        src={images[2]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                   
                     </Link>
                     <Link className='text-decoration-none items-name-text' to='/category'>Moniter</Link>
                 <Link to='/category'>
                    <img
                        src={images[3]}
                        alt="Image 2"
                        className="dynamic-image"
                    />
                   </Link>
              <Link className='text-decoration-none items-name-text' to='/category'>Moniter</Link>
                 
                </Col>
            </Row>
            {/* <Link to="/" className="text-decoration-none">
                            <span>Start here</span>
                        </Link> */}
        </Container>
    );
};

export default ProductItem4;
