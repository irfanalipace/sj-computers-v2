import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./slider.css";

// import required modules
import { Navigation } from "swiper";
import sliderimg from '@images/slider-img/slider1.png';
// import { Product } from "../homeproduct/Product";

const BannerSlider = () => {
  return (
    <>
    
    <div className="slider-section" >

    
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
           
        
      </Swiper>
      </div>
    </>
  );
}
export default BannerSlider
