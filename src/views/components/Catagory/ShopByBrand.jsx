import React from 'react'
import { brandCategory } from './DummyApi'
import { Typography } from '@mui/material'

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ShopByBrand = () => {
  return (
    <div style={{marginTop: "10px"}} className='shop-by-Brand'>
        <Typography variant='h4' py={2} fontWeight={"bolder"}>Shop by Brand</Typography>
        <Swiper
                style={{margin: "0px"}}
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
                    nextEl: '.shop-by-brand .swiper-button-next',
                    prevEl: '.shop-by-brand .swiper-button-prev',
                }}
            >
                {brandCategory.map((category, index) => (
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

export default ShopByBrand