import React from 'react'
import { Typography } from '@mui/material'
import {computerCategories} from './DummyApi';

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ShopByCategory = () => {

  return (
    <div style={{marginTop: "10px"}} className='shop-by-category'>
        <Typography variant='h4' py={2} fontWeight={"bolder"}>Shop by Category</Typography>
        <Swiper
                style={{margin: "20px"}}
                slidesPerView={7.6}
                // spaceBetween={0}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3.5,
                    },
                    640: {
                        slidesPerView: 4.5,
                    },

                    768: {
                        slidesPerView: 4.5,
                    },

                    1200: {
                        slidesPerView: 7.5,
                    },
                }}
                navigation={{
                    nextEl: '.shop-by-category .swiper-button-next',
                    prevEl: '.shop-by-category .swiper-button-prev',
                }}
            >
                {computerCategories.map((category, index) => (
                    <SwiperSlide key={index} style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <div style={{backgroundColor: "#F1F2F2", borderRadius: "100%", height:"135px", width: "135px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img width={"100px"} src={category.image_url} alt={category.name} />
                        </div>
                        <Typography varient="body2" fontWeight={"bolder"} p={1}>{category.category}</Typography>
                    </SwiperSlide>
                    ))}
            </Swiper>

            {/* SECOND SLIDER */}
            <Swiper
                style={{margin: "20px"}}
                slidesPerView={7.6}
                // spaceBetween={0}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3.5,
                    },
                    640: {
                        slidesPerView: 4.5,
                    },

                    768: {
                        slidesPerView: 4.5,
                    },

                    1200: {
                        slidesPerView: 7.5,
                    },
                }}
                navigation={{
                    nextEl: '.shop-by-category .swiper-button-next',
                    prevEl: '.shop-by-category .swiper-button-prev',
                }}
            >
                {computerCategories.map((category, index) => (
                    <SwiperSlide key={index} style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <div style={{backgroundColor: "#F1F2F2", borderRadius: "100%", height:"135px", width: "135px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img width={"100px"} src={category.image_url} alt={category.name} />
                    </div>
                    <Typography varient="body2" fontWeight={"bolder"} p={1}>{category.category}</Typography>
                </SwiperSlide>
                    ))}
            </Swiper>
    </div>
  )
}

export default ShopByCategory