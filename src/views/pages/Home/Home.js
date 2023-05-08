import TopBar from "@components/TopBar/TopBar";
import BannerSlider from "@components/Sliders/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";
// import CarouselSlider from "@components/Sliders/CarouselSlider";
// import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
// import Recommendation from "@components/Recommendation/Recommendation";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

import "./Home.css";

const Home = () => {
    return (
        <div className="homePage">
            <TopBar />
            <div className="banner-category-section">
                <div className="banner-wrapper">
                    <BannerSlider />
                </div>
                <div className="catergory-grid-wrapper">
                    <ProductType />
                </div>
            </div>
            <div className="products-grid-container">
                <ProductsGrid />
            </div>
            {/* <CarouselSlider /> */}
            {/* <ProductThreeItem /> */}
            {/* <Recommendation /> */}
        </div>
    );
};

export default Home;
