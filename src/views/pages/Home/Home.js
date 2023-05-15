import TopBar from "@components/TopBar/TopBar";
import BannerCategory from "./BannerCategory";
// import CarouselSlider from "@components/Sliders/CarouselSlider";
// import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
// import Recommendation from "@components/Recommendation/Recommendation";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

import "./Home.css";

const Home = () => {
    return (
        <div className="homePage">
            <TopBar />
            <BannerCategory />
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
