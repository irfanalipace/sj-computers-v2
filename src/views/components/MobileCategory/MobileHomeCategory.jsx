import React, { useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import 'swiper/css/navigation';
import moment from 'moment';
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
import { Stack, Typography } from '@mui/material';
import StarRatings from 'react-star-ratings';
import gamingimg1 from '../../../assets/images/MobileImage/HomeCategory/featured/gaming1.png';
import image1 from '../../../assets/images/homepageImage/featureImages/image1.png';
import image2 from '../../../assets/images/homepageImage/featureImages/image2.png';
import image3 from '../../../assets/images/homepageImage/featureImages/image3.png';
import image4 from '../../../assets/images/homepageImage/featureImages/image4.png';
import TouchScreenLaptop from '../../../assets/images/categories/TouchScreenLaptop.png';
import wellsjcomputer from '@images/categories/welcomesjcomputer.webp';
import ProductItem4 from '@components/homeproduct/productcategory/ProductItem4';
import MobileFeaturedProducts from './MobileFeaturedProducts/MobileFeaturedProducts';
import networkimg1 from '../../../assets/images/MobileImage/HomeCategory/network/routers.png';
import networkimg2 from '../../../assets/images/MobileImage/HomeCategory/network/monitors.png';
import networkimg3 from '../../../assets/images/MobileImage/HomeCategory/network/adui.png';
import networkimg4 from '../../../assets/images/MobileImage/HomeCategory/network/rem.png';
import ProductItem1 from '@components/homeproduct/productcategory/ProductItem1';
import MobileSingleItem from './MobileFeaturedProducts/MobileSingleItem/MobileSingleItem';
import rams from '../../../assets/images/MobileImage/HomeCategory/rams.png';
import SellingProducts from './SellingProducts/SellingProducts';
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
const MobileHomeCategory = () => {
  const images = [
    btoimg,
    laptopimg,
    desktopimgweb,
    monitorimg,
    categoryImg1,
    categorybusinussweb,
  ];
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state?.products.products);
  // const currentDate = moment();
  // const oneDayAgo = moment().subtract(1, "days");
  // const duration = moment.duration(currentDate.diff(oneDayAgo));
  // const hours = duration.hours();
  // const minutes = duration.minutes();
  const dbDate = new Date().getTime();

  const parsedDate = new Date(dbDate);

  console.log(
    parsedDate.getDate(),
    parsedDate.getHours(),
    parsedDate.getMinutes(),
  );

  //Once you get the dates, you can do the date calculate, like:

  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  const date1 = new Date('9/9/2020').getTime(); //JUST AN EXAMPLE
  const date2 = new Date('10/9/2020').getTime(); //JUST AN EXAMPLE

  const diffTime = Math.abs(date2 - date1);

  const diffDays = Math.ceil(diffTime / one_day);

  useEffect(() => {
    getProduct();
  }, [products]);

  const getProduct = async () => {
    if (!products?.length) {
      try {
        await dispatch(fetchProducts());
      } catch (error) {}
    }
  };

  const featuredItems = [
    {
      image: image1,
      categoryLink: '/category/bto',
      categoryName: 'Dell',
    },
    {
      image: image2,
      categoryLink: '/category/laptops',
      categoryName: 'HP',
    },
    {
      image: image4,
      categoryLink: '/category/desktop',
      categoryName: 'Lenovo',
    },
    {
      image: image3,
      categoryLink: '/category/gaming_desktops',
      categoryName: 'BTO',
    },
  ];

  const shopByFormFactorItems = [
    {
      categoryName: 'SFF',
    },
    {
      categoryName: 'Mini',
    },
    {
      categoryName: 'Tower',
    },
    {
      categoryName: 'USFF',
    },
  ];

  const BudgetFriendlyItems = [
    {
      categoryName: 'D-link-router',
    },
    {
      categoryName: 'Mini-Desktops',
    },
    {
      categoryName: 'D-link-router',
    },
    {
      categoryName: 'Mini-Desktops',
    },
  ];

  const featuredimages = [
    gamingimg1,
    gamingimg1,
    gamingimg1,
    gamingimg1,
    gamingimg1,
    gamingimg1,
    gamingimg1,
    gamingimg1,
  ];
  const networkimages = [
    networkimg2,
    networkimg1,
    networkimg1,
    networkimg2,
    networkimg2,
    networkimg1,
    networkimg1,
    networkimg2,
  ];
  const networkimages2 = [
    networkimg4,
    networkimg3,
    networkimg3,
    networkimg4,
    networkimg4,
    networkimg3,
    networkimg3,
    networkimg4,
  ];
  const ramsimages = [rams];
  const title = ['Shop by Brand'];
  const newtworktitle = ['Shop by Form Factor'];
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
        }}>
        <SwiperSlide className='swiper-slider-mobile-category'>
          <div className='image-container-category'>
            <Link
              to='./category/bto'
              className='text-decoration-none link-text-category-mobile'>
              <div className='category-dev-img-section-mobile'>BTO</div>
              <div>
                <img
                  src={images[0]}
                  alt='Image 1'
                  className='image-category-mobile-silder'
                />
              </div>
            </Link>
          </div>

          <div className='image-container-category'>
            <Link
              to='./category/laptops'
              className='text-decoration-none link-text-category-mobile'>
              <div className='category-dev-img-section-mobile'>Laptop</div>
              <div>
                <img
                  src={images[1]}
                  alt='Image 1'
                  className='image-category-mobile-silder'
                />
              </div>
            </Link>
          </div>
          <div className='image-container-category'>
            <Link
              to='/category/desktop'
              className='text-decoration-none link-text-category-mobile'>
              <div className='category-dev-img-section-mobile'>Desktops</div>
              <div>
                <img
                  src={images[2]}
                  alt='Image 1'
                  className='image-category-mobile-silder'
                />
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slider-mobile-category'>
          {/* <div className="image-container-category">
                        <Link
                            to="/category/monitor"
                            className="text-decoration-none link-text-category-mobile"
                        >
                            <div className="category-dev-img-section-mobile">
                                Monitor
                            </div>
                            <div>
                                <img
                                    src={images[3]}
                                    alt="Image 1"
                                    className="image-category-mobile-silder"
                                />
                            </div>
                        </Link>
                    </div> */}
          <div className='image-container-category'>
            <Link
              to='/category/gaming_desktops'
              className='text-decoration-none link-text-category-mobile'>
              <div className='category-dev-img-section-mobile'>
                Gaming Desktop
              </div>
              <div>
                <img
                  src={images[4]}
                  alt='Image 1'
                  className='image-category-mobile-silder'
                />
              </div>
            </Link>
          </div>
          <div className='image-container-category'>
            <Link
              to='/category/business_computers'
              className='text-decoration-none link-text-category-mobile'>
              <div className='category-dev-img-section-mobile'>
                Business Computer
              </div>
              <div>
                <img
                  src={images[5]}
                  alt='Image 1'
                  className='image-category-mobile-silder'
                />
              </div>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className='mobile-dev-sections-login-drop'>
        {isAuthenticated ? (
          <div className='advertisement-heading-mobilescetions'>
            <img
              className={`advertisment-img`}
              src={wellsjcomputer}
              alt={'wellsjcomputer'}
            />
          </div>
        ) : (
          <div className='advertisement-heading-mobile-sections-header-dev'>
            <h2 className='h2-cart'>Sign in for best experience</h2>
            <Link to='/login'>
              <button type='button' className='button-save-mobile-size'>
                Sign in Safely
              </button>
            </Link>
            <div className='create-account-mobile-home-page'>
              <Link to='/register'>
                <button type='button'>Create an account</button>
              </Link>
            </div>
          </div>
        )}
        <div className='product-type-section-mobile-images-dev'>
          {products && products?.length > 0 && (
            <>
              <img className={``} src={products[0].image} alt={'addDesktop'} />
              <h5 className='mt-1 mobile-versions-products-sections-images'>
                {products[0].name.length > 30
                  ? `${products[0].name}`
                  : products[0].name}
              </h5>
              <Stack
                mb={2}
                alignItems={'start'}
                spacing={1}
                className='star-rating-dev-moble-sections'>
                <Stack
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={1}
                  direction={'row'}>
                  <StarRatings
                    rating={products[0].rating}
                    starRatedColor='rgb(232, 126, 36)'
                    numberOfStars={5}
                    name='rating'
                    isSelectable={false}
                    starDimension={'20px'}
                    starSpacing={'0'}
                  />
                  <Typography
                    fontFamily={'Inter'}
                    sx={{ pt: 0.3, pb: 1 }}
                    fontWeight={500}
                    fontSize={'12px'}
                    lineHeight={'17px'}
                    color={'#007185'}>
                    ({products[0].total_review})
                  </Typography>
                </Stack>
                <div className='product-prices'>
                  {products.originalPrice && (
                    <div className='product-original-price'>
                      ${products.originalPrice}
                    </div>
                  )}
                  <div className='product-rating-sections-featured-images'>
                    <div className='product-new-price-sections-rating-mobile'>
                      <span>$</span>
                      {products[0]?.price.toString().split('.')[0]}
                      <sup>{products[0]?.price?.toString().split('.')[1]}</sup>
                    </div>
                    <div className='product-new-price-sections-rating-mobile-versions'>
                      <p>
                        Save{' '}
                        {products[0]?.price
                          ? parseFloat(products[0].price).toFixed(2)
                          : 0}
                      </p>
                    </div>
                    <p className='dev-sactions-price-old-new-time-mobile-versions'>
                      Ends in {parsedDate.getHours()}h:
                      {parsedDate.getMinutes()}m
                    </p>
                  </div>
                </div>
                {/* {type === "recommended" && getRandomComponent()} */}
              </Stack>
            </>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <MobileFeaturedProducts
          items={featuredimages}
          featuredItems={featuredItems}
          title={title}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <MobileFeaturedProducts
          items={networkimages}
          featuredItems={shopByFormFactorItems}
          title={newtworktitle}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <MobileFeaturedProducts
          items={networkimages2}
          featuredItems={BudgetFriendlyItems}
          title={'Budget Friendly Desktops'}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <MobileSingleItem
          items={[TouchScreenLaptop]}
          featuredItems={featuredItems}
          title={'Touch Screen Laptops'}
        />
      </div>

      <Link to={''} className='text-decoration-none' style={{ color: 'black' }}>
        <div className='product-type-section-selleing-products-mobile-versions'>
          <div className='dev-sections-heading-offer'>
            <div>
              <h4>Top Rating Products</h4>
            </div>
            <div>
              <p> See all offer</p>
            </div>
          </div>
          <SellingProducts images={Sellingimages} />
        </div>
      </Link>
      <Link to={''} className='text-decoration-none' style={{ color: 'black' }}>
        <div className='product-type-section-selleing-products-mobile-versions'>
          <div className='dev-sections-heading-offer'>
            <div>
              <h4>Best Selling Laptops</h4>
            </div>
            <div>
              <p> See all offer</p>
            </div>
          </div>
          <SellingProducts images={fleshimages} />
        </div>
      </Link>

      <MobileRecommand />
    </div>
  );
};

export default MobileHomeCategory;
