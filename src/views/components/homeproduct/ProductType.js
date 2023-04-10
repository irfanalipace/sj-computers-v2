import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './ProductType.css'
import img21 from '@images/product/image21.png';
import img22 from '@images/product/image22.png';
import img23 from '@images/product/image23.png';
import img20 from '@images/product/image20.png';
import ProductItem1 from '@components/homeproduct/productcategory/ProductItem1';
import ProductItem4 from '@components/homeproduct/productcategory/ProductItem4';

import SingleLaptopComp from '@components/homeproduct/productcategory/SingleLaptopComp';
export const ProductType = () => {
    // const data = [
    //     { id: 1, name: 'Item 1' },
    //     { id: 2, name: 'Item 2' },
    //     { id: 3, name: 'Item 3' },
    //     { id: 4, name: 'Item 4' },
   
    //   ];
    
      // Create an array of rows containing columns with your data
    //   const rows = [];
    //   let cols = [];
    //   data.forEach((item, index) => {
    //     cols.push(
    //       <Col key={item.id}>
    //         <div>{item.name}</div>
    //       </Col>
    //     );
    //     if (cols.length === 4 || index === data.length - 1) {
    //       rows.push(<Row key={index}>{cols}</Row>);
    //       cols = [];
    //     }
    //   });
  return (
    <div >
    {/* <div className="row">
    <div className="col-md-3 col-xs-2 div-section div-img-4" >
    
    <img  src={img20} />
        <img  src={img21} />
        <br></br>
        <img  src={img22} />
        <img  src={img23} />
        
    </div>
    <div className="col-md-3 col-xs-2 div-section" >
      fjsdfjsf
     </div>
     <div className="col-md-3 col-xs-2 div-section" >
        cdddqw
     </div>
        <div className="col-md-3 col-xs-2 div-section" >
dkada

        </div>
     </div> 
  */}
  <div className="row">
    <div className="col-md-3">
      <div className="product-section">
      
         <ProductItem4 />
      </div>
    </div>
   
    <div className="col-md-3">
      <div className="product-section">
     <ProductItem1 />
      </div>
    </div>
    <div className="col-md-3">
      <div className="product-section">
      <ProductItem1 />
      </div>
    </div>
    <div className="col-md-3">
        <div>
        <div className="product-section-text">
       dhhsfh
      </div>
      <div className="product-section-text1 ">
          {/* <SingleLaptopComp /> */}
      </div>
        </div>
     
    </div>
   
  </div>
 
</div>



  )
}
