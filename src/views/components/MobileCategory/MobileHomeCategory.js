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
import btoimg from "@images/categories/btoweb.webp";
import laptopimg from "@images/categories/laptopweb.webp";
import monitorimg from "@images/categories/monitorweb.webp";
import desktopimg from "@images/categories/desktopweb.webp";
import categoryImg1 from "@images/categories/desktopweb.webp";
import categorybusinussweb from "@images/categories/businussweb.webp";
import desktopimgweb from "@images/categories/desktopweb-page.webp";
const MobileHomeCategory = () => {
    
    const images = [btoimg, laptopimg, desktopimgweb, monitorimg,categoryImg1,categorybusinussweb];
  
      
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
    
      <div className="image-container-category">
     
      <Link to='./category/bto' className='text-decoration-none link-text-category-mobile'>
        <div className='category-dev-img-section-mobile'>
        BTO
        </div>
        <div >
        <img
                        src={images[0]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
        
         
        </div>
        </Link>
      </div>
    
      <div className="image-container-category">
      <Link to='./category/laptops' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
        Laptop
        </div>
        <div>
           
        <img
                        src={images[1]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
        
         
        </div>
        </Link>
      </div>
      <div className="image-container-category">
      <Link to='/category/desktop' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
      Desktops
        </div>
        <div >
           
        <img
                        src={images[2]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
        
         
        </div>
        </Link>
      </div>
      </SwiperSlide>
      <SwiperSlide className='swiper-slider-mobile-category'>
      <div className="image-container-category">
      <Link to='/category/monitor' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
    Monitor
        </div >
        <div>
           
        <img
                        src={images[3]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
        
         
        </div>
       </Link>
      </div>
      <div className="image-container-category">
      <Link to='/category/gaming_desktops' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
    
       Gaming Desktop
        </div>
        <div>
           
        <img
                        src={images[4]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
         
        </div>
        </Link>
      </div>
      <div className="image-container-category">
      <Link to='/category/business_computers' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
      Business Computer
        </div>
        <div >
           
        <img
                        src={images[5]}
                        alt="Image 1"
                        className="image-category-mobile-silder"
                    />
         
        </div>
        </Link>
      </div>
      </SwiperSlide>
      {/* <SwiperSlide className='swiper-slider-mobile-category'>
      <div className="image-container-category">
      <Link to='./category/laptops' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
        Laptop
        </div>
        <div>
           
        <img src={img1} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
        </Link>
      </div>
      <div>
      <Link to='./category/laptops' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
      Laptop
        </div>
        <div>
           
        <img src={img2} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
        </Link>
      </div>
      <div className="image-container-category">
      <Link to='./category/laptops' className='text-decoration-none link-text-category-mobile'>
      <div className='category-dev-img-section-mobile'>
             Desktops
        </div>
        <div>
           
        <img src={img3} alt="Image 1" className='image-category-mobile-silder'/>
         
        </div>
        </Link>
      </div>
      </SwiperSlide> */}
    </Swiper>
    </div>
  )
}

export default MobileHomeCategory