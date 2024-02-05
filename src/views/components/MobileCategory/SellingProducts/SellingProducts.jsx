import React from "react";
import Carousel from "react-bootstrap/Carousel";

import img1 from "../../../../assets/images/homepageImage/sellingproducts/image1.png"
import img2 from "../../../../assets/images/homepageImage/sellingproducts/image2.png"
import img3 from "../../../../assets/images/homepageImage/sellingproducts/image3.png"
import img4 from "../../../../assets/images/homepageImage/sellingproducts/image4.png"
import img5 from "../../../../assets/images/homepageImage/sellingproducts/image5.png"
import img6 from "../../../../assets/images/homepageImage/sellingproducts/image6.png"
import img7 from "../../../../assets/images/homepageImage/sellingproducts/image7.png"
import img8 from "../../../../assets/images/homepageImage/sellingproducts/image8.png"
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

const SellingProducts = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 8, // Change this value according to your requirement
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    

  return (
    <>
  
    <Slider {...settings}>
     
      {images.map((image, index) => (
        <div key={index} className="imagesSlider-images-dev">
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
    </>
  );
};

export default SellingProducts;
