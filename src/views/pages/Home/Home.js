import React from 'react'
import Header from '@components/header/Header';
import Footer from '@components/footer/footer';
import Slider from '@components/slider/Slider';
import { Product } from '@components/homeproduct/Product';

 const Home = () => {
  return (

   
       
    <div>
      
        <div className="col-md-12 mb-md-0 mb-3 ">
        <Header />
      <Slider />
      
      <Footer />
        </div>
    
 
    </div>
   
   
  )
}
export default Home;
