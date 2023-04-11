import React from "react";
import Header from "@components/header/Header";
import Footer from "@components/footer/footer";
import BannerSlider from "@components/slider/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";
import CarouselSlider from "@components/slider/CarouselSlider";
import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
const Home = () => {
    return (
        <div>
            <Header />
            <BannerSlider />
            <ProductType />
            <CarouselSlider />
            <ProductThreeItem />
            <Footer />
        </div>
    );
};
export default Home;
