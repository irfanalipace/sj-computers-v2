import React from "react";
import Header from "@components/header/Header";
import TopBar from "@components/TopBar/TopBar";
import Footer from "@components/footer/Footer";
import BannerSlider from "@components/Sliders/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";
import CarouselSlider from "@components/Sliders/CarouselSlider";
import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
import Recommendation from "@components/Recommendation/Recommendation";
const Home = () => {
    return (
        <div>
            <Header />
            <TopBar />
            <BannerSlider />
            <ProductType />
            <CarouselSlider />
            <ProductThreeItem />
            <Recommendation />
            <Footer />
        </div>
    );
};

export default Home;
