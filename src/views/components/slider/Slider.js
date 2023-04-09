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
import { Product } from "../homeproduct/Product";
const Slider = () => {
  return (
    <>
    
    <div className="slider-section" >

    
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
        <SwiperSlide><img src={sliderimg} /></SwiperSlide>
            <Product />
        
      </Swiper>
      </div>
    </>
  );
}
export default Slider
