import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '@store/products/productsThunks';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CategorySliderCard from './CategorySliderCard';
import './CategorySlider.css';

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

const CategorySlider = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.products.isLoading);
  const products = useSelector(state => state?.products.products);
  // useEffect(() => {
  //   getProduct();
  // }, []);

  // const getProduct = async () => {
  //   if (!products?.length) {
  //     try {
  //       await dispatch(fetchProducts());
  //     } catch (error) {}
  //   }
  // };

  if (products?.length == 0) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress sx={{ color: 'black' }} />
      </Box>
    );
  }

  return (
    <div style={{ position: 'relative' }} className='category-slider'>
      <Swiper
        style={{ marginTop: '20px', padding: '0px 30px' }}
        slidesPerView={7}
        spaceBetween={20}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          // when window width is >= 320px
          220: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 5,
          },
        }}
        navigation={{
          nextEl: '.category-slider .swiper-button-next',
          prevEl: '.category-slider .swiper-button-prev',
        }}>
        {products?.map((product, index) => (
          <SwiperSlide key={'ps-' + index}>
            <CategorySliderCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* the css of these are defined in Slider.css */}
      <div
        className='swiper-button-next slider-button'
        style={{ position: 'absolute', right: 0 }}></div>
      <div
        className='swiper-button-prev slider-button'
        style={{ position: 'absolute', left: 0 }}></div>
    </div>
  );
};

export default CategorySlider;
