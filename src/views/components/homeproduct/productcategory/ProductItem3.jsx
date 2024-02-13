import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "@images/product/item3/image1.png";
import img2 from "@images/product/item3/image2.png";
import img3 from "@images/product/item3/image3.png";
import './ProductItem3.css'
const ProductItem3 = ({items}) => {

    return (
      <div className="categories-container">
 
               
                  <div className="devsection-three-images">
                  <img
                        src={items[0].image}
                        alt="Image 2"
                        className="dynamic-image"
                       
                    />
                    <p>{items[0].categoryName}</p>
                  </div>
              
                   <div>
                 <div className="dev-images-dynmaic-images-lable">
                 <img
                       src={items[1].image}
                        alt="Image 2"
                        className="dynamic-image"
                       
                    />
                     <p className="productName-data-sections">{items[1].categoryName}</p>
                 </div>
                 <div className="dev-images-dynmaic-dev-data">
                 <img
                       src={items[2].image}
                        alt="Image 2"
                        className="dynamic-image"
                       
                    />
                      <p>{items[2].categoryName}</p>
                 </div>
                  
                   </div>
              
      </div>
           
     
    );
};

export default ProductItem3;
