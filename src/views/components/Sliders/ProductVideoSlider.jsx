import React from 'react'
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from '@mui/material';

import VideoCard from '../VideoCard/VideoCard'
import { IconButton } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

// Install Swiper navigation plugin
// import { Pagination } from 'swiper/modules';

function ProductVideoSlider({Tumbnails}) {
    return (
        <Grid item xs={12} md={12} lg={12} px={4} >
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          borderRadius: "10px"
        }}
        // lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        spaceBetween={15}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={3.65}
            breakpoints={{
                // when window width is >= 200px
                200: {
                    slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 2.65,
                },

                768: {
                    slidesPerView: 3,
                },

                1200: {
                    slidesPerView: 3.65,
                },
            }}
            // navigation
            // className="recommendation-slider"
        >
            {Tumbnails?.map((tumbnail, index) => (
              <SwiperSlide key={index} >    
                    <VideoCard tumbnail={tumbnail} Tumbnails={Tumbnails}  />
             </SwiperSlide>
             ))}
            {/* <div className="slider-controler" style={{position: "relative"}}> */}
             {/* </div> */}
        </Swiper>
             {/* <div className='swiper-button-prev swiper-button-prev-video' style={{color : "black", border: "1px solid black", borderRadius: "5px", padding: "25px", fontSize: "10px"}}  ><ion-icon name="arrow-back-outline"></ion-icon></div> */}
             {/* <div className='swiper-button-next swiper-button-prev-video' style={{color : "black", border: "1px solid black", borderRadius: "5px", padding: "25px"}}  ></div> */}
             <ArrowBackIosNewOutlinedIcon sx={{ml: 2 ,border: "1px solid black", borderRadius: "5px" , height: "35px", width: "35px", color: "black", p: 1}} className='swiper-button-prev swiper-video-button'  />
             <ArrowForwardIosOutlinedIcon sx={{mr: 2 ,border: "1px solid black", borderRadius: "5px" , height: "35px", width: "35px", color: "black", p: 1}} className='swiper-button-next swiper-video-button'  />
        </Grid>
  )
}

export default ProductVideoSlider