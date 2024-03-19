import React from 'react';
import StarRatings from 'react-star-ratings';
import { Typography, Box, Stack } from '@mui/material';

import './SellingProducts.css';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation]);

const SellingProducts = ({ topRatedProduct, inTopRated, bestSeller }) => {
  const Label = ({ bgcolor = '', text = 'text', secondText = '', color }) => {
    return (
      <Stack
        position={'relative'}
        alignItems={'center'}
        spacing={1.5}
        direction={'row'}>
        <Box
          bgcolor={bgcolor}
          sx={{
            clipPath:
              text === "SJ's Choice"
                ? 'polygon(0 0, 100% 0%, 87% 100%, 0 100%);'
                : '',
          }}
          px={1.8}
          py={0.5}
          // width={"auto"}
          alignItems={'center'}
          justifyContent={'center'}>
          <Stack direction={'row'} spacing={1}>
            <Typography
              color={'white'}
              fontWeight={500}
              fontSize={'12px'}
              fontFamily={'Inter'}>
              {text}
            </Typography>
            {secondText && (
              <Typography
                fontWeight={500}
                fontSize={'12px'}
                fontFamily={'Inter'}
                color={color}>
                {secondText}
              </Typography>
            )}
          </Stack>
        </Box>
        <Typography
          // sx={{
          //   position: text === "SJ's Choice" ? 'absolute' : '',
          //   right: text === "SJ's Choice" ? '-40%' : '',
          // }}
          color={'#6F6F6F'}
          fontWeight={500}
          fontSize={'12px'}
          lineHeight={'14px'}
          fontFamily='Inter'>
          Deals
        </Typography>
      </Stack>
    );
  };
  const Trending = () => <Label bgcolor='#B12704' text='Trending' />;
  const BestSeller = () => (
    <Label text='Best' bgcolor='#000000' secondText='seller' color='#E0BC00' />
  );
  const SjChoice = () => <Label bgcolor='#E87E24' text="SJ's Choice" />;
  const OFF = () => (
    <Label bgcolor='#00305E' text='30%' secondText='OFF' color='#E87E24' />
  );
  const Demanding = () => <Label bgcolor='#318243' text='Demanding' />;
  const componentsArray = [Trending, BestSeller, SjChoice, OFF, Demanding];
  const getRandomComponent = () => {
    if (inTopRated) {
      const randomIndex = Math.floor(Math.random() * componentsArray.length);
      const RandomComponent = componentsArray[randomIndex];
      return <RandomComponent />;
    } else {
      return <BestSeller />;
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={8}
        spaceBetween={50}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 3,
          },

          1200: {
            slidesPerView: 6,
          },
        }}
        navigation
        className='hp-slider-1 px-5 recommendation-slider recommund-dev-slider-sections-opps'>
        {topRatedProduct?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className='px-1'>
              <Link
                to={`/${product.name}/dp/${product.asin}`}
                style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    height: '133px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <img
                    style={{ maxHeight: '100%', maxWidth: '90%' }}
                    src={product.image[0]}
                    alt={`Image ${index + 1}`}
                  />
                </div>
                {(inTopRated || bestSeller) && (
                  <div className='product-description'>
                    <div className='product-name'>{product.name}</div>
                    <div>
                      <StarRatings
                        rating={product.rating}
                        starRatedColor='rgb(232, 126, 36)'
                        numberOfStars={5}
                        name='rating'
                        isSelectable={false}
                        starDimension={'20px'}
                        starSpacing={'0'}
                      />
                      <span
                        style={{
                          color: '#007185',
                          fontSize: '10px',
                          padding: '10px',
                        }}>
                        {product.total_review}
                      </span>
                    </div>
                    <div style={{ padding: '4px 0px' }}>
                      {getRandomComponent()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          marginRight: '10px',
                          fontSize: '12px',
                          textDecoration: 'line-through',
                          color: '#666666',
                        }}>
                        ${parseFloat(((product?.price * 2) / 1.5).toFixed(2))}
                      </span>
                      <span
                        style={{
                          padding: '2px',
                          fontSize: '18px',
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        ${product?.price?.toString().split('.')[0]}
                      </span>
                    </div>
                  </div>
                )}
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
