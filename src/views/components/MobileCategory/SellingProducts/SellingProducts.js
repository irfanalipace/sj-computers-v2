import React from "react";
import img1 from "@images/MobileImage/HomeCategory/item1.png";
import img2 from "@images/MobileImage/HomeCategory/item2.png";
import img3 from "@images/MobileImage/HomeCategory/item3.png";
import img4 from "@images/MobileImage/HomeCategory/item4.png";
import img5 from "@images/MobileImage/HomeCategory/item5.png";
import img6 from "@images/MobileImage/HomeCategory/item6.png";
import "./SellingProducts.css";
const SellingProducts = () => {
    return (
        <div>
            <div className="seeling-product-p">
                {" "}
                <span >Best Selling Products</span>
            </div>

            <div className="image-container">
                <img src={img1} alt="" className="img-dev-selling-products" />
                
                <img src={img2} alt="" className="img-dev-selling-products" />
              
            </div>
           <div className="dev-image-name">
           <div>  <span>Gamming PC</span></div>
            <div>  <span>Modmes</span></div>
           </div>
            <div className="image-container">
                <img src={img3} alt="" className="img-dev-selling-products" />
                <img src={img4} alt="" className="img-dev-selling-products" />
            </div>
            <div className="dev-image-name">
           <div>  <span>Hard Drives</span></div>
            <div>  <span>Components</span></div>
           </div>
            <div className="image-container">
                <img src={img5} alt="" className="img-dev-selling-products" />
                <img src={img6} alt="" className="img-dev-selling-products" />
            </div>
            <div className="dev-image-name">
           <div>  <span>Keyboard</span></div>
            <div>  <span>Monters</span></div>
           </div>
        </div>
    );
};

export default SellingProducts;
