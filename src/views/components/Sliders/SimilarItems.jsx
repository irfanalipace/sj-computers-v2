import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCardSimilarItems from '@components/ProductCard/ProductCardSimilarItems';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const SimilarItemsSlider = ({ type = '', similarProducts }) => {
  return (
    <div style={{ position: 'relative' }} className='similer-slider'>
      <Swiper
        slidesPerView={4.8}
        navigation={{
          nextEl: '.similer-slider .swiper-button-next',
          prevEl: '.similer-slider .swiper-button-prev',
        }}
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
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },

          1200: {
            slidesPerView: 4.8,
          },
        }}
        // navigation
        className='similer-item-container'>
        {similarProducts?.length > 0 ? (
          similarProducts?.map(product => (
            <SwiperSlide key={'ps-' + product?.id}>
              <div
              // className="px-1"
              >
                <ProductCardSimilarItems type={type} product={product} />
              </div>{' '}
            </SwiperSlide>
          ))
        ) : (
          <>There are no similar items to this product.</>
        )}
      </Swiper>
      <div
        className='swiper-button-next'
        style={{ position: 'absolute', right: -40 }}></div>
      <div
        className='swiper-button-prev'
        style={{ position: 'absolute', left: -40 }}></div>
    </div>
  );
};

export default SimilarItemsSlider;
