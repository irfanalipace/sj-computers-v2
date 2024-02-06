import React from "react";
import Carousel from "react-bootstrap/Carousel";


import "./SellingProducts.css";

// const SellingProducts = () => {
//   const images = [img1, img2, img3, img4, img5, img6, img7, img8];

//   const groupedImages = [];
//   for (let i = 0; i < images.length; i += 8) {
//     groupedImages.push(images.slice(i, i + 8));
//   }

//   return (
//     <Carousel data-bs-theme="dark">
//       {groupedImages.map((group, index) => (
//         <Carousel.Item key={index}>
//           <div className="d-flex justify-content-around">
//             {group.map((image, subIndex) => (
//               <img
//                 key={subIndex}
//                 className="d-block w-100"
//                 src={image}
//                 alt={`Slide ${index * 8 + subIndex + 1}`}
//               />
//             ))}
//           </div>
//           <Carousel.Caption></Carousel.Caption>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// };

// export default SellingProducts;



import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
