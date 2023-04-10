import React from 'react'
import Header from '@components/header/Header';
import Footer from '@components/footer/footer';
import BannerSlider from '@components/slider/BannerSlider';
import { ProductType } from '@components/homeproduct/ProductType';

 const Home = () => {
  return (

   
       
    <div>
      
        <div className="col-md-12 mb-md-0 mb-3 ">
        <Header />
      <BannerSlider />
      <ProductType />
      <Footer />
        </div>
    
 
    </div>
   
   
  )
}
export default Home;
