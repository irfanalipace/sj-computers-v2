import { useState } from "react";
import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";
import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";

const BannerCategory = () => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    return (
        <div className="banner-category-section">
            <div className="banner-wrapper">
                <div className="banner-inner">
                    <BannerSlider />
                </div>
            </div>
            
            {screenWidth <= 570 ?  <div className="catergory-grid-wrapper">
                <MobileHomeCategory />
                </div>
                 : 
                 <div className="catergory-grid-wrapper">
                 <div>
                     <ProductType />
                 </div>
             </div>
                    }
        </div>
    );
};

export default BannerCategory;
