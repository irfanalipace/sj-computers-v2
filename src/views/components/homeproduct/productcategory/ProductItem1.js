import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '@images/product/item1/laptop.png';
import { Link} from "react-router-dom";
import './ProductItem4.css'
const ProductItem1 = () => {
    const images = [
        img1,
       
      ];
      
  return (
    <Container>
    {/* <Row>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <img src={images[0]} alt="Image 1" className="dynamic-image" />
      </Col>
    </Row> */}
    <Row>
    <h4 style={{textAlign:'left'}}>Laptops</h4>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <img src={images[0]} alt="Image 2" className="laptop" />
      </Col>
      <p className="forgot-password text-left">
                        
                            <Link to="/" className="text-decoration-none">
                           <h4 style={{textAlign:'left',  fontSize: '16px', marginTop: '60px'}}>Start here</h4> 
                            </Link>
                        </p>
    </Row>
    {/* <Row>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <img src={images[2]} alt="Image 1" className="dynamic-image" />
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <img src={images[3]} alt="Image 2" className="dynamic-image" />
      </Col>
    </Row> */}
  </Container>
  

  )
}

export default ProductItem1