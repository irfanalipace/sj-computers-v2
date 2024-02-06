import React from "react";
import Carousel from "react-bootstrap/Carousel";


import "./SellingProducts.css";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);
const SellingProducts = ({images}) => {
  //  console.log(images,'cdsdf')
  //   const settings = {
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 8, // Change this value according to your requirement
  //     slidesToScroll: 1,
  //     responsive: [
  //       {
  //         breakpoint: 1200,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //           infinite: true,
  //         },
  //       },
  //       {
  //         breakpoint: 992,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   };
    

  return (
    <>
    <Swiper
            slidesPerView={8}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 3,
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
            className="recommendation-slider recommund-dev-slider-sections-opps"
        >
             {images.map((image, index) => (
                <SwiperSlide >
                    <div className="px-1">
                    <img src={image} alt={`Image ${index + 1}`} />
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
