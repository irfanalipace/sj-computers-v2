import { useState } from "react";
import TopBar from "@components/TopBar/TopBar";
import BannerCategory from "./BannerCategory";
// import CarouselSlider from "@components/Sliders/CarouselSlider";
// import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
// import Recommendation from "@components/Recommendation/Recommendation";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";
import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";
import SellingProducts from "@components/MobileCategory/SellingProducts/SellingProducts";
import "./Home.css";

const Home = () => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    return (
        <div className="homePage">
            {screenWidth <= 570 ? (
              <div style={{background:'white'}}>
                  <div>
                  <BannerCategory />
                    <MobileHomeCategory />
                </div>
                <div>
                    <SellingProducts/>
                </div>
              </div>
            ) : (
                <div>
                    <TopBar />
                    <BannerCategory />
                    <div className="products-grid-container">
                        <ProductsGrid />
                    </div>
                </div>
            )}
            {/* <CarouselSlider /> */}
            {/* <ProductThreeItem /> */}
            {/* <Recommendation /> */}
        </div>
    );
};

export default Home;
