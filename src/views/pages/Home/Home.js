import React from 'react'
import Header from '@components/header/Header';
import Footer from '@components/footer/footer';
import BannerSlider from '@components/slider/BannerSlider';
import { ProductType } from '@components/homeproduct/ProductType';
// import ProductItem4 from '@components/homeproduct/productcategory/ProductItem4';
import CarouselSlider from '@components/slider/CarouselSlider'
 const Home = () => {
  return (
    
    <div>
      
        <div>
        <Header />
      <BannerSlider />
      <ProductType />
      <CarouselSlider />
      <Footer />
    
        </div>
    
 
    </div>
   
   
  )
}
export default Home;
