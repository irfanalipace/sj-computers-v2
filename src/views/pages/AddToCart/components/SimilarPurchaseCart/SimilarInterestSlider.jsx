import { Typography } from '@mui/material';
import './SimilarPurchaseCart.css';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../../components/Sliders/Slider.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCartComponents from '../../../../components/Product/CheckOutCard/AddCartComponents';

import StarRatings from 'react-star-ratings';
import { featureProductsApi } from '@api/products';

SwiperCore.use([Navigation]);

const SimilarInterestSlider = ({ products }) => {
  const orderEstimatedDelivery = useSelector(
    state => state.orders.orderEstimatedDelivery,
  );

  const ProductDetails = ({ product }) => (
    <div className='pb-3 slider-details'>
      <div className='product-details'>
        <div className='dev-section-button-dev-card'>
          <Link to={`${new URL(product?.url).pathname}`}>
            <div
              className='product-naame product-cart-name-mobile-screen'
              // style={{ width: "70%", margin: "0px auto" }}
            >
              {product.name}
            </div>

            <div className=' d-sm-none product-pricess'>
              {product.originalPrice && (
                <div className='product-original-price'>
                  ${product.originalPrice}
                </div>
              )}
              <div className='product-new-price'>
                <span>$</span>
                {product?.price?.toString().split('.')[0]}
                <sup>{product?.price?.toString().split('.')[1]}</sup>
              </div>
            </div>

            <div className='d-sm-none '>
              <span className='span-get-data-pagragraph-card'>
                Free Delivery Available{' '}
              </span>
              <div></div>
            </div>
          </Link>

          <div className='d-sm-none div-button-card-product'>
            <AddCartComponents
              product={product}
              className='d-sm-none add-to-card-button-mobile-product'
            />
          </div>
        </div>

        <Link
          to={`${new URL(product?.url).pathname}`}
          style={{ textDecoration: 'none' }}>
          <div className='d-none d-sm-block product-rating'>
            <div className='d-flex align-items-center'>
              <StarRatings
                rating={product?.rating}
                starRatedColor='rgb(232, 126, 36)'
                numberOfStars={5}
                name='rating'
                isSelectable={false}
                starDimension={'20px'}
                starSpacing={'0'}
              />
              <span
                className='ms-2'
                style={{ color: '#1270c4', fontSize: '12px' }}>
                ({product?.total_review})
              </span>
            </div>
          </div>
        </Link>
        <div className='sj-banner-similar-item'>
          <p>
            &ensp;SJ's <span style={{ color: '#E0BC00' }}>choice</span>
          </p>
          <div className='for-styling'></div>
          <div className='mt-1' style={{ fontSize: '14px' }}>
            in
          </div>
        </div>
        <div style={{ fontSize: '12px', marginTop: '-12px' }} className='mb-2 '>
          Computer Monitors
        </div>

        <div className='d-none d-sm-block product-pricess mb-2'>
          {product.originalPrice && (
            <div className='product-original-price'>
              ${product.originalPrice}
            </div>
          )}
          <span>$</span>
          {product?.price?.toString().split('.')[0]}.
          {product?.price?.toString().split('.')[1]}
        </div>
        <div style={{ fontSize: '12px' }} className='mt-2 mb-2'>
          Get it as soon as <br className='br-line-mobile-screen' />
          <span style={{ fontWeight: 'bold', lineHeight: '16px' }}>
            {orderEstimatedDelivery?.free_shipment_amount?.estimate_day}
          </span>
        </div>
        {product.deliveryCharges && (
          <div className='product-delivery-charges'>
            <FontAwesomeIcon icon={faTruck} /> {product.deliveryCharges}
          </div>
        )}
        {/* {type === "recommended" && (
                    <div style={{ fontSize: "12px", marginTop: "5px" }}>
                        Free shipping by SJ
                    </div>
                )} */}
      </div>
    </div>
  );

  return (
    <>
      {products?.length > 0 && (
        <div
          // className="recommendation-container"
          style={{
            background: '#fff',
            marginLeft: '10px',
            marginTop: '20px',
            marginBottom: '20px',
          }}>
          <div className='product-image-class'>
            <Typography
              variant='h5'
              fontSize={16}
              fontFamily={'Inter'}
              fontWeight={600}
              pt={4}
              mt={1}
              ml={2}
              mb={5}>
              People who browsed similar items also showed interest in these
            </Typography>

            <div
              className='slider-wrapper my-swiper-slider-mobile-changes'
              style={{ margin: '10px 20px' }}>
              {!products ? (
                <LoaderComponent />
              ) : (
                <Swiper
                  slidesPerView={5}
                  className='my-unique-swiper'
                  style={{ padding: '0 30px' }}
                  navigation
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                    },
                    480: {
                      slidesPerView: 2,
                    },
                    640: {
                      slidesPerView: 4,
                    },

                    768: {
                      slidesPerView: 5,
                    },

                    1200: {
                      slidesPerView: 5,
                    },
                  }}>
                  {products?.map(product => (
                    <SwiperSlide key={'ps-' + product?.id}>
                      <div>
                        <div className={`prodduct`}>
                          <Link to={`${new URL(product?.url).pathname}`}>
                            <div className={`product-image`}>
                              <div className='image-wrapper'>
                                <LazyLoadImage
                                  width={'100%'}
                                  height={'100%'}
                                  src={product.image}
                                  alt={product?.name
                                    ?.trim()
                                    ?.split(' ')
                                    ?.slice(0, 9)
                                    ?.join(' ')}
                                />
                              </div>
                            </div>
                          </Link>
                          <ProductDetails product={product} />
                        </div>
                      </div>{' '}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarInterestSlider;
