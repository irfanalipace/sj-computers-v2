import React, { useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import 'swiper/css/navigation';
// import moment from 'moment';
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination]);
import './MobileHomeCategory.css';
import btoimg from '@images/categories/btoweb.webp';
import laptopimg from '@images/categories/laptopweb.webp';
import monitorimg from '@images/categories/monitorweb.webp';
import categoryImg1 from '@images/categories/desktopweb.webp';
import categorybusinussweb from '@images/categories/businussweb.webp';
import desktopimgweb from '@images/categories/desktopweb-page.webp';
import { useSelector } from 'react-redux';
import TouchScreenLaptop from '../../../assets/images/categories/TouchScreenLaptop.png';
import sellingimg1 from '../../../assets/images/homepageImage/sellingproducts/image1.png';
import sellingimg2 from '../../../assets/images/homepageImage/sellingproducts/image2.png';
import sellingimg3 from '../../../assets/images/homepageImage/sellingproducts/image3.png';
import sellingimg4 from '../../../assets/images/homepageImage/sellingproducts/image4.png';
import sellingimg5 from '../../../assets/images/homepageImage/sellingproducts/image5.png';
import sellingimg6 from '../../../assets/images/homepageImage/sellingproducts/image6.png';
import sellingimg7 from '../../../assets/images/homepageImage/sellingproducts/image7.png';
import sellingimg8 from '../../../assets/images/homepageImage/sellingproducts/image8.png';
import rectangle1 from '../../../assets/images/flashsaleimaes/rectangle1.png';
import rectangle2 from '../../../assets/images/flashsaleimaes/rectangle2.png';
import rectangle3 from '../../../assets/images/flashsaleimaes/rectangle3.png';
import rectangle4 from '../../../assets/images/flashsaleimaes/rectangle4.png';
import rectangle5 from '../../../assets/images/flashsaleimaes/rectangle5.png';
import Recommendation from '../Recommendation/Recommendation';
import MobileRecommand from './MobileRecommand/MobileRecommand';
import LoginAndTimeProduct from '../homeproduct/LoginAndTimeProduct';
import SellingPro from '../homeproduct/productcategory/ProductsItemsList/SellingPro';
import FlashProducts from '../homeproduct/productcategory/ProductsItemsList/FlashProducts';
import AccessoriesImgUpdate from '@images/categories/AccessoriesUpdate.png';
import LaptopImgUpdate from '@images/categories/LaptopUpdate.png';
import DesktopImgUpdate from '@images/categories/desktopUpdate.png';
import twoInOneImgUpdate from '@images/categories/2in1LaptopUpdate.png';
import GamingDesktopImg from '@images/categories/gamingDesktops.png';
// import categorybusinussweb from '@images/categories/businussweb.webp';

const ProductType = React.lazy(
  () => import('@components/homeproduct/ProductType'),
);
import {
  featured,
  shopByBrandHomePage,
  ShopByFormFactorHomePage,
  BudgetFriendlyDesktopsHomepage,
} from '../../pages/Home/HomePageMaterial';
import FeaturedProducts from '../homeproduct/productcategory/ProductsItemsList/FeaturedProducts';

const MobileHomeCategoryLayout2 = () => {
  const images = [
    btoimg,
    laptopimg,
    desktopimgweb,
    monitorimg,
    categoryImg1,
    categorybusinussweb,
  ];
  const products = useSelector(state => state?.products.products);
  // const currentDate = moment();
  // const oneDayAgo = moment().subtract(1, "days");
  // const duration = moment.duration(currentDate.diff(oneDayAgo));
  // const hours = duration.hours();
  // const minutes = duration.minutes();
  const dbDate = new Date().getTime();

  const parsedDate = new Date(dbDate);

  // console.log(
  //   parsedDate.getDate(),
  //   parsedDate.getHours(),
  //   parsedDate.getMinutes(),
  // );

  //Once you get the dates, you can do the date calculate, like:

  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  const date1 = new Date('9/9/2020').getTime(); //JUST AN EXAMPLE
  const date2 = new Date('10/9/2020').getTime(); //JUST AN EXAMPLE

  const diffTime = Math.abs(date2 - date1);

  const diffDays = Math.ceil(diffTime / one_day);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (!products?.length) {
      try {
        console.log('4444444444');
        await dispatch(fetchProducts());
      } catch (error) {}
    }
  };

  const Sellingimages = [
    sellingimg1,
    sellingimg2,
    sellingimg8,
    sellingimg4,
    sellingimg5,
    sellingimg6,
    sellingimg7,
    sellingimg8,
    sellingimg1,
    sellingimg2,
    sellingimg8,
    sellingimg4,
    sellingimg5,
    sellingimg6,
    sellingimg7,
    sellingimg8,
  ];
  const fleshimages = [
    rectangle1,
    rectangle2,
    rectangle3,
    rectangle4,
    rectangle5,
    rectangle1,
    rectangle2,
    rectangle3,
    rectangle4,
    rectangle5,
  ];

  const mobileCategoriesSlider = [
    {
      name: 'Laptops',
      link: 'laptops',
      img_url: LaptopImgUpdate,
    },
    {
      name: 'Desktops',
      link: 'desktop',
      img_url: DesktopImgUpdate,
    },
    {
      name: '2 in 1 Laptops',
      link: '2_in_1_laptops',
      img_url: twoInOneImgUpdate,
    },
    {
      name: 'Accessories',
      link: 'accessories',
      img_url: AccessoriesImgUpdate,
    },
    {
      name: 'Business Computers',
      link: 'business_computers',
      img_url: categorybusinussweb,
    },
  ];

  return (
    <div>
      {/* Home page Mobile Slider */}
      <Swiper
        className='my-swiper-mobile-category'
        style={{ padding: '5px' }}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}>
        {mobileCategoriesSlider?.map((category, index) => (
          <SwiperSlide className='' style={{ marginRight: '0px' }} key={index}>
            <div
              className='image-container-category'
              style={{ padding: '0px' }}>
              <Link
                to={`category/${category.link}`}
                className='text-decoration-none link-text-category-mobile'>
                <div className='category-dev-img-section-mobile'>
                  {category.name}
                </div>
                <div
                  style={{ height: '70%', width: '100%' }}
                  className='d-flex justify-content-center align-items-center'>
                  <img
                    src={category.img_url}
                    width={'100%'}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                    alt='Image 1'
                    className='image-category-mobile-silder'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Login and Time Product */}
      <div className='mobile-dev-sections-login-drop'>
        <div className='product-type-section-mobile-images-dev'>
          <LoginAndTimeProduct />
        </div>
      </div>

      {/* <div>
        <FeaturedProducts
          featured={featured}
          featuredItems={shopByBrandHomePage}
          networkItems={ShopByFormFactorHomePage}
          upgradecomputers={BudgetFriendlyDesktopsHomepage}
          TouchScreenLaptop={TouchScreenLaptop}
        />
      </div>

      <SellingPro images={Sellingimages} />
      <FlashProducts images={fleshimages} />
      <div style={{ marginTop: '4px' }}>
        <MobileRecommand />
      </div> */}
    </div>
  );
};

export default MobileHomeCategoryLayout2;
