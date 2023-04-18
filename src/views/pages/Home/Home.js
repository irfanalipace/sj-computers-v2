import Header from "@components/Header/Header";
import TopBar from "@components/TopBar/TopBar";
import Footer from "@components/Footer/Footer";
import BannerSlider from "@components/Sliders/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";
import CarouselSlider from "@components/Sliders/CarouselSlider";
import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
import Recommendation from "@components/Recommendation/Recommendation";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

import "./Home.css";

const Home = () => {
    return (
        <div>
            <TopBar />
            <div className="banner-wrapper">
                <BannerSlider />
            </div>
            <div className="catergory-grid-wrapper">
                <ProductType />
            </div>
            <ProductsGrid />
            {/* <CarouselSlider /> */}
            {/* <ProductThreeItem /> */}
            {/* <Recommendation /> */}
        </div>
    );
};

export default Home;
