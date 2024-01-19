import React from 'react'
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from '@mui/material';

import VideoCard from '../Product/ProductVideo/VideoCard/VideoCard'
import { IconButton } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";


function ProductVideoSlider({Tumbnails, newVideoData}) {

    const mobileMediaQuery = {
        '@media (max-width: 600px)':{
            display: "none"
        }
    }

    return (
        <Grid item xs={12} md={12} lg={12} px={4} sx={{"@media (max-width: 600px)": { padding: 0 }}} >
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
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
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
        >
            {newVideoData?.map((tumbnail, index) => (
              <SwiperSlide key={index} >    
                    <VideoCard tumbnail={tumbnail} Tumbnails={Tumbnails} index={index} newVideoData={newVideoData} />
             </SwiperSlide>
             ))}
        </Swiper>
             <ArrowBackIosNewOutlinedIcon sx={{...mobileMediaQuery ,position: "absolute", top: "50%",transform: "translate(-0%, -50%)", left: 0, ml: 2 ,border: "1px solid black", borderRadius: "5px" , height: "35px", width: "35px", color: "black", p: 1}} className='swiper-btn-prev swiper-video-button'  />
             <ArrowForwardIosOutlinedIcon sx={{...mobileMediaQuery ,position: "absolute", top: "50%",transform: "translate(-0%, -50%)", right: 0, mr: 2 ,border: "1px solid black", borderRadius: "5px" , height: "35px", width: "35px", color: "black", p: 1}} className='swiper-btn-next swiper-video-button'  />
        </Grid>
  )
}

export default ProductVideoSlider