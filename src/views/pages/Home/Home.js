<<<<<<< HEAD
import React from 'react'
import Header from '@components/header/Header';
import Footer from '@components/footer/footer';
import BannerSlider from '@components/slider/BannerSlider';
import { ProductType } from '@components/homeproduct/ProductType';
// import ProductItem4 from '@components/homeproduct/productcategory/ProductItem4';
import CarouselSlider from '@components/slider/CarouselSlider'
import ProductThreeItem from '@components/homeproduct/product3category/ProductThreeItem';
import Header2 from '@components/header/Header2';
const Home = () => {
  return (

    <div>

      <div>
        <Header />
        <BannerSlider />
        <ProductType />
        <CarouselSlider />
        <ProductThreeItem />
        {/* <Header /> */}
        {/* <div style={{position:'relative', background:'blue'}}>
    <div style={{position:'absolute', top:'0', left:'0', background:'green'}}>
        This div will be positioned in the top left corner of its nearest positioned ancestor.
    </div>
    <div style={{position:'absolute', bottom:'0', reigh:'0', background:'red'}}>
        This div will be positioned in the bottom right corner of its nearest positioned ancestor.
    </div>
</div> */}

        <Footer />

      </div>


    </div>


  )
}
=======
import React from "react";
import Header from "@components/Header/Header";
import TopBar from "@components/TopBar/TopBar";
import Footer from "@components/Footer/Footer";
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

>>>>>>> haroon-dev
export default Home;
