import React from 'react';

import './SellingProducts.css';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation]);
const SellingProducts = ({ topRatedProduct }) => {
  return (
    <>
      <Swiper
        slidesPerView={8}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
          },

          768: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 6,
          },
        }}
        navigation
        className='hp-slider-1 px-5 recommendation-slider recommund-dev-slider-sections-opps'>
        {topRatedProduct?.map(({ name, image, asin }, index) => (
          <SwiperSlide>
            <div className='px-1'>
              <Link to={`/${name}/dp/${asin}`}>
                <img src={image[0]} alt={`Image ${index + 1}`} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Slider {...settings}>
     
      {images.map((image, index) => (
        <div key={index} className="imagesSlider-images-dev">
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider> */}
    </>
  );
};

export default SellingProducts;
