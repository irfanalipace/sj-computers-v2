import React from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import img1 from "@images/category1.png";
import img2 from "@images/category2.png";
import img3 from "@images/category3.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination]);
import './MobileHomeCategory.css'
import { Card } from 'react-bootstrap';
const MobileHomeCategory = () => {
   
  
     
      
  return (
    <div>
      <Swiper
      className='my-swiper-mobile-category'
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        // For mobile screens
        640: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        // For tablets
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        // For larger screens
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
    >
      <SwiperSlide className='swiper-slider-mobile-category'>
      <div>
        <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img1} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
           
     
    
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img2} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Desktops</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img3} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide className='swiper-slider-mobile-category'>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img1} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img2} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Desktops</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img3} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide className='swiper-slider-mobile-category'>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img1} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Laptop</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img2} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      <div>
      <div className='category-dev-img-section-mobile'>
        <Link className='text-decoration-none link-text-category-mobile'>Desktops</Link>
        </div>
        <div style={{width:'328%'}}>
           
        <img src={img3} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
      </div>
      </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default MobileHomeCategory