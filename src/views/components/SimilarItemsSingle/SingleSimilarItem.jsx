import React from 'react';
import './SingleSimilaritem.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';
import AddCartComponents from '../Product/CheckOutCard/AddCartComponents';
import { generatePath } from '../../../core/utils/helpers';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

const SingleSimilarItem = ({
  type = '',
  product,
  isMobile,
  heading = isMobile ? '' : 'Similar items with fast delivery',
}) => {
  const orderEstimatedDelivery = useSelector(
    state => state.orders.orderEstimatedDelivery,
  );
  const productPath = generatePath(product?.url);
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  const ProductDetails = () => (
    <div>
      <div className={'product-details'}>
        <div className='dev-section-button-dev-card'>
          {/* <Link to={`${new URL(product?.url).pathname}`}> */}
          <Link
            to={productPath}
            style={{ textDecoration: 'none', color: '#007185' }}>
            <div className='similer-items-product-name product-cart-name-mobile-screen'>
              {product?.name}
            </div>
            <div className=' d-sm-none product-prices'>
              {product?.originalPrice && (
                <div className='product-original-price'>
                  ${product?.originalPrice}
                </div>
              )}
              <div className='product-new-price'>
                <span>$</span>
                {product?.price?.toString().split('.')[0]}
                <sup>{product?.price?.toString().split('.')[1]}</sup>
              </div>
            </div>

            <div className='d-sm-none '>
              <span className='dilvery-system-mobile-card-product'>
                Get it by{' '}
                {orderEstimatedDelivery?.free_shipment_amount?.estimate_day}
              </span>
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

        <Link to={productPath} style={{ textDecoration: 'none' }}>
          <div className='d-non d-sm-block product-rating'>
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
              <span className='ms-2' style={{ color: '#007185' }}>
                ({product?.total_review})
              </span>
            </div>
          </div>
        </Link>
        <div className='d-none d-sm-block product-prices'>
          {product?.originalPrice && (
            <div className='product-original-price'>
              ${product?.originalPrice}
            </div>
          )}
          <div className='product-new-price-similar-item'>
            <span>$</span>
            {product?.price?.toString().split('.')[0]}.
            {product?.price?.toString().split('.')[1]}
            <span style={{ color: '#000', fontWeight: 700 }}>
              &nbsp;& FREE shipping
            </span>
          </div>
        </div>
        {product?.deliveryCharges && (
          <div className='product-delivery-charges'>
            <FontAwesomeIcon icon={faTruck} /> {product?.deliveryCharges}
          </div>
        )}
        {type === 'recommended' && (
          <div className='product-delivery-charges mt-2 ms-2'>
            <FontAwesomeIcon className='me-1' icon={faTruck} /> Free Shipping
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div
      className='similar-item-one ms-2 ms-md-auto mt-1 mt-md-5'
      style={{
        padding: isMobile ? '5px' : '20px 20px 50px 20px',
        border: isMobile ? 'none' : '',
        height: isMobile ? 'auto' : '',
      }}>
      {!isMobile ? (
        <>
          <h3>{heading}</h3>
          <div className='similar-item-one-inner'>
            <div className='image-wrapper-similar-items'>
              <LazyLoadImage
                width={'100%'}
                height={'100%'}
                src={product?.image}
                alt={product?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
              />
            </div>
            <div className='details'>
              <ProductDetails />
            </div>
          </div>
        </>
      ) : (
        <Box>
          <Typography
            sx={{ mb: 2 }}
            fontFamily={'Arial'}
            fontWeight={700}
            fontSize={'16px'}
            lineHeight={'24px'}
            color={'#0F1111'}>
            {heading}
          </Typography>
          <Stack direction={'row'} alignItems={'start'}>
            <LazyLoadImage
              width={isUpSmall ? '55px' : '100px'}
              height={isUpSmall ? '55px' : '100px'}
              style={{ objectFit: 'contain' }}
              src={product?.image}
              alt={product?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
            />
            <Stack spacing={0.5}>
              <Typography
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={'20px'}
                color={'#007185'}>
                <div className={'product-name-similar-items'}>
                  {product?.name}
                </div>
              </Typography>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                <StarRatings
                  rating={product?.rating}
                  starRatedColor='rgb(232, 126, 36)'
                  numberOfStars={5}
                  name='rating'
                  isSelectable={false}
                  starDimension={'20px'}
                  starSpacing={'0'}
                />
                <Typography
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'14px'}
                  lineHeight={'20px'}
                  color={'#007185'}>{`(${product?.total_review})`}</Typography>
              </Stack>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                <Typography
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'14px'}
                  lineHeight={'20px'}
                  color={'#B12704'}>{`${
                  product?.price?.toString().split('.')[0]
                }.${product?.price?.toString().split('.')[1]}`}</Typography>
                <span>&</span>
                <Typography
                  fontFamily={'Inter'}
                  fontWeight={700}
                  fontSize={'13px'}
                  lineHeight={'20px'}
                  color={'#0F1111'}>{` FREE Shipping`}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              mt: 2,
              border: 'none',
              borderTop: '2px solid #CDCDCD',
            }}></Box>
        </Box>
      )}
    </div>
  );
};

export default SingleSimilarItem;
