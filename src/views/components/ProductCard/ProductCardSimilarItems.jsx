import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './ProductCard.css';
import AddCartComponents from '../Product/CheckOutCard/AddCartComponents';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from '../../../core/utils/helpers';
import { useMediaQuery, useTheme } from '@mui/material';

const ProductCardSimilarItems = ({ type = '', product, inGrid }) => {
  const orderEstimatedDelivery = useSelector(
    state => state.orders.orderEstimatedDelivery,
  );

  const productPath = generatePath(product?.url);
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));

  const ProductDetails = () => (
    <div>
      {isUpSmall && (
        <div className='similer-items-product-details'>
          <div className='dev-section-button-dev-card'>
            <Link to={productPath} style={{ textDecoration: 'none' }}>
              <div className='product-namee product-cart-name-mobile-screen'>
                {product.name}
              </div>

              <div className=' d-sm-none product-prices'>
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
                <span className='ms-2' style={{ color: '#007185' }}>
                  ({product?.total_review})
                </span>
              </div>
            </div>
          </Link>
          <div className='sj-banner-similar-item best-choice-item-products'>
            <p>
              &ensp;SJ's <span style={{ color: '#E0BC00' }}>choice</span>
            </p>
            <div className='for-styling'></div>
            <div className='mt-1' style={{ fontSize: '14px' }}>
              in
            </div>
          </div>
          <div
            style={{ fontSize: '12px', marginTop: '-12px' }}
            className='mb-2 '>
            Computer Monitors
          </div>

          <div className='d-none d-sm-block product-prices mb-2'>
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
            Get it as soon as{' '}
            <span style={{ fontWeight: 'bold', lineHeight: '16px' }}>
              {orderEstimatedDelivery?.free_shipment_amount?.estimate_day}
            </span>
          </div>
          {product.deliveryCharges && (
            <div className='product-delivery-charges'>
              <FontAwesomeIcon icon={faTruck} /> {product.deliveryCharges}
            </div>
          )}
          {type === 'recommended' && (
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              Free shipping by SJ
            </div>
          )}
        </div>
      )}
      {!isUpSmall && (
        <div className='similer-items-product-details'>
          <div className='dev-section-button-dev-card'>
            <Link to={productPath} style={{ textDecoration: 'none' }}>
              <div
                className='product-name product-cart-name-mobile-screen'
                style={{ color: '#007185' }}>
                {product.name}
              </div>
            </Link>
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

            <div className='d-sm-none div-button-card-product'>
              <AddCartComponents
                product={product}
                className='d-sm-none add-to-card-button-mobile-product'
              />
            </div>
          </div>
          <div className='sj-banner-similar-item best-choice-item-products mt-2'>
            <p>
              &ensp; &ensp;SJ's <span style={{ color: '#E0BC00' }}>choice</span>
            </p>
            <div className='for-styling'></div>
            <div className='mt-1' style={{ fontSize: '14px' }}>
              in
            </div>
          </div>
          <div
            style={{ fontSize: '12px', marginTop: '-12px' }}
            className='mb-2 '>
            Computer Monitors
          </div>
          <div className=' d-sm-none product-prices-mobile'>
            {product.originalPrice && <div>${product.originalPrice}</div>}
            <div className='product-new-price'>
              <span
                style={{
                  fontSize: '11px',
                }}>
                $
              </span>
              {product?.price?.toString().split('.')[0]}.
              {product?.price?.toString().split('.')[1]}
            </div>
          </div>{' '}
          <div className='d-none d-sm-block product-prices mb-2'>
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
            Get it as soon as{' '}
            <span style={{ fontWeight: 'bold', lineHeight: '16px' }}>
              {orderEstimatedDelivery?.free_shipment_amount?.estimate_day}
            </span>
          </div>
          {product.deliveryCharges && (
            <div className='product-delivery-charges'>
              <FontAwesomeIcon icon={faTruck} /> {product.deliveryCharges}
            </div>
          )}
          {type === 'recommended' && (
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              Free Shipping by SJ
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div className={` product   ${inGrid && 'product-grid'}`}>
      <Link to={productPath}>
        <div className={` ${inGrid ? 'product-image-grid' : ''} product-image`}>
          <div className='image-wrapper'>
            <LazyLoadImage
              width={'85%'}
              height={'100%'}
              src={product.image}
              alt={product?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
            />
          </div>
        </div>
      </Link>
      <ProductDetails />
    </div>
  );
};

export default ProductCardSimilarItems;
