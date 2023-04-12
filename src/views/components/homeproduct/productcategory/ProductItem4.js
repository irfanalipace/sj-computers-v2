import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import img21 from '@images/product/image21.png';
import img22 from '@images/product/image22.png';
import img23 from '@images/product/image23.png';
import img20 from '@images/product/image20.png';
import './ProductItem4.css'
const ProductItem4 = () => {
    const images = [
        img21,
        img20,
        img22,
        img23,
      ];
      
  return (
    <Container>
    {/* <Row>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <img src={images[0]} alt="Image 1" className="dynamic-image" />
      </Col>
    </Row> */}
    <Row>
    <h4 style={{textAlign:'left', paddingLeft:'81px'}}>Shop by Category</h4>
      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
        <img src={images[0]} alt="Image 2" className="dynamic-image" />
      <p>Laptop</p>
        <img src={images[1]} alt="Image 2" className="dynamic-image" />
        <p>Graphic Card</p>
      </Col>
      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
        <img src={images[2]} alt="Image 2" className="dynamic-image" />
       <p> Cases</p>
        <img src={images[3]} alt="Image 2" className="dynamic-image" />
        <p>Monitor</p>
      </Col>
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

export default ProductItem4