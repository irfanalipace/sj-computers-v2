import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './ProductCardLayout3.css';
import AddCartComponents from '../../Product/CheckOutCard/AddCartComponents';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { Box, Stack, Typography } from '@mui/material';
import { generatePath } from '../../../../core/utils/helpers';
const ProductCardLayout3 = ({
  type = '',
  product,
  inGrid,
  searchParams,
  productView,
}) => {
  const orderEstimatedDelivery = useSelector(
    state => state.orders.orderEstimatedDelivery,
  );

  let productUrl = generatePath(product?.url, searchParams);
  const Label = ({ bgcolor = '', text = 'text', secondText = '', color }) => {
    return (
      <Stack
        position={'relative'}
        alignItems={'center'}
        spacing={1.5}
        direction={'row'}
      >
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
          justifyContent={'center'}
        >
          <Stack direction={'row'} spacing={1}>
            <Typography
              color={'white'}
              fontWeight={500}
              fontSize={'12px'}
              fontFamily={'Inter'}
            >
              {text}
            </Typography>
            {secondText && (
              <Typography
                fontWeight={500}
                fontSize={'12px'}
                fontFamily={'Inter'}
                color={color}
              >
                {secondText}
              </Typography>
            )}
          </Stack>
        </Box>
        <Typography
          sx={{
            position: text === "SJ's Choice" ? 'absolute' : '',
            right: text === "SJ's Choice" ? '-40%' : '',
          }}
          color={'#6F6F6F'}
          fontWeight={500}
          fontSize={'12px'}
          lineHeight={'14px'}
          fontFamily='Inter'
        >
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
    const randomIndex = Math.floor(Math.random() * componentsArray.length);
    const RandomComponent = componentsArray[randomIndex];
    return <RandomComponent />;
  };

  const ProductDetails = () => (
    <div>
      <div
        className='product-details pe-2 ps-0 ps-lg-1'
        style={{ padding: '0px 0px', marginLeft: '5px' }}
      >
        {/* <div>
            <span className="span-the-product-color-product">
            crocs Contrary to popular
            (205100-410)
            </span>
        </div> */}

        <div
          className={`dev-section-button-dev-card ${
            productView == 'list' ? '' : 'mb-2'
          }`}
        >
          <Link
            // to={`${new URL(product?.url).pathname}`}
            to={productUrl}
          >
            <div
              className='product-name product-cart-name-mobile-screen'
              style={{
                margin: productView == 'list' ? '2px 0px' : '',
              }}
            >
              {product.name}
            </div>

            {/* Mobile code here */}

            {/* <div className=" d-sm-none product-prices">
                            {product.originalPrice && (
                                <div className="product-original-price">
                                    ${product.originalPrice}
                                </div>
                            )}
                            <div className="product-new-price">
                                <span>$</span>
                                {product?.price?.toString().split(".")[0]}
                                <sup>
                                    {product?.price?.toString().split(".")[1]}
                                </sup>
                            </div>
                            <div>
                                <span className="old-price-product-card">$3,495</span>
                            </div>
                        </div> */}

            <div className='d-sm-none '>
              {/* <button className="off-sale-button-product-card">50% <span>{' '} off</span></button> */}

              {/* <span className="dilvery-system-mobile-card-product">
                                Get it by{" "}
                                {
                                    orderEstimatedDelivery?.free_shipment_amount
                                        ?.estimate_day
                                }
                            </span> */}
              {/* <span className="span-get-data-pagragraph-card">
                                Free Delivery Available{" "}
                            </span> */}
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
          //  to={`${new URL(product?.url).pathname}`}
          to={productUrl}
          style={{ textDecoration: 'none' }}
        >
          <div
            className='product-rating'
            style={{ margin: productView == 'list' ? 0 : '' }}
          >
            <Stack mb={inGrid ? 0 : 2} alignItems={'start'} spacing={1}>
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                spacing={1}
                direction={'row'}
              >
                <StarRatings
                  rating={product.rating}
                  starRatedColor='rgb(232, 126, 36)'
                  numberOfStars={5}
                  name='rating'
                  isSelectable={false}
                  starDimension={'20px'}
                  starSpacing={'0'}
                />
                <Typography
                  fontFamily={'Inter'}
                  sx={{ pt: 0.3 }}
                  fontWeight={500}
                  fontSize={'12px'}
                  lineHeight={'17px'}
                  color={'#007185'}
                >
                  {product.total_review}
                </Typography>
              </Stack>
              {type === 'recommended' && getRandomComponent()}
            </Stack>

            {/* <span className="product-num-reviews ms-2 mt-1">
                            {product.numReviews ? product.numReviews : 0}
                        </span> */}
          </div>
        </Link>
        {/* {!inGrid && (
            <>
                <div className="product-badge">
                    <div className="badge-text">Best Seller</div>
                </div>
                <div className="product-deal my-1">
                    <div className="product-off-percentage">
                        {product.offPercentage}% off
                    </div>
                    <span>Deals</span>
                </div>
            </>
        )} */}
        <div className='product-prices'>
          <div>
            {product.originalPrice && (
              <div className='product-original-price'>
                ${product.originalPrice}
              </div>
            )}
            <div className='product-new-price m-1'>
              {productView == 'grid' && (
                <span
                  style={{
                    textDecoration: 'line-through',
                    fontSize: '12px',
                    paddingRight: '5px',
                  }}
                >
                  $120{' '}
                </span>
              )}
              <span>$</span>
              {product?.price?.toString().split('.')[0]}
              <sup>{product?.price?.toString().split('.')[1]} </sup>
              {productView == 'list' && (
                <span
                  style={{
                    fontSize: '12px',
                    color: '#666666',
                  }}
                >
                  Was:{' '}
                  <span
                    style={{
                      textDecoration: 'line-through',
                    }}
                  >
                    $120.00
                  </span>
                </span>
              )}
            </div>
            {productView == 'list' && (
              <div className='discount-with-coupon'>
                <div className='discount-label'>
                  Save <span style={{ color: '#E0BC00' }}>$20.00 </span>
                </div>
                <div style={{ fontSize: '12px', padding: '6px' }}>
                  {' '}
                  with coupon
                </div>
              </div>
            )}
          </div>

          {productView == 'list' && (
            <div className='list-view-details d-none d-lg-flex'>
              <div className='extra-details-item'>
                <div className='model-data-products'>Model</div>
                <div
                  style={{
                    fontWeight: '700',
                    padding: '4px 0px',
                    fontSize: '12px',
                    color: '#000000',
                  }}
                >
                  Sonic
                </div>
              </div>
              <div className='extra-details-item'>
                <div className='model-data-products'>Display</div>
                <div
                  style={{
                    fontWeight: '700',
                    padding: '4px 0px',
                    fontSize: '12px',
                    color: '#000000',
                  }}
                >
                  32"
                </div>
              </div>
              <div className='extra-details-item'>
                <div className='model-data-products'>Company</div>
                <div
                  style={{
                    fontWeight: '700',
                    padding: '4px 0px',
                    fontSize: '12px',
                    color: '#000000',
                  }}
                >
                  Sonic
                </div>
              </div>
              <div className='extra-details-item'>
                <div className='model-data-products'>Size</div>
                <div
                  style={{
                    fontWeight: '700',
                    padding: '4px 0px',
                    fontSize: '12px',
                    color: '#000000',
                  }}
                >
                  Multiple
                </div>
              </div>
            </div>
          )}
        </div>
        {product.deliveryCharges && (
          <div className='product-delivery-charges'>
            {/* <i className="fa fa-truck"></i>{" "} */}
            <FontAwesomeIcon icon={faTruck} /> {product.deliveryCharges}
          </div>
        )}
        {type === 'recommended' ||
          (productView == 'grid' && (
            <div className='product-delivery-charges mt-2 ms-0 mb-2 mb-sm-0'>
              <FontAwesomeIcon className='me-1' icon={faTruck} /> Free Shipping
            </div>
          ))}
        {productView == 'list' && (
          <div className='delivery-details'>
            <div style={{ color: '#1270C4', margin: '4px 0px' }}>
              FREE delivery{' '}
              <span
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                Friday, May 19
              </span>
            </div>
            <div style={{ color: '#666666', margin: '4px 0px' }}>
              or fastest delivery{' '}
              <span style={{ color: 'black', fontWeight: '500' }}>
                Monday, May 15
              </span>
            </div>
            <div style={{ color: '#666666', margin: '4px 0px' }}>
              order within{' '}
              <span style={{ color: '#E87E24' }}>8 hours 58 mins</span>
            </div>
            {/* we will render it when pieces left less than 10 in in_stock */}
            {product?.quantity < 30 && (
              <div
                style={{
                  color: '#FF0000',
                  margin: '5px 0px',
                  fontWeight: 500,
                }}
              >
                Only {product?.quantity} left in stock - Order now
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={` product ${inGrid && 'product-grid'}`}
      style={{
        flexDirection: productView == 'list' ? 'row' : '',
        border: productView == 'list' ? 'none' : '',
      }}
    >
      <Link
        //to={`${new URL(product?.url).pathname}`}
        to={productUrl}
        className={`${
          productView == 'list' ? 'product-image-link-list-view' : ''
        }`}
        style={{
          width: productView !== 'list' ? '100%' : '',
          height: '180px',
        }}
        // style={{width: productView == "list" ? "20%" : "100%", }}
      >
        <div className='full-image'>
          <div className='upper-div'>
            {inGrid && (
              <div
                className='product-offer-label'
                style={{
                  backgroundColor:
                    product?.total_review > 0 ? '#52AC66' : '#1860A3',
                  top: productView == 'list' ? '-9px' : '',
                }}
              >
                {product?.total_review > 0 ? 'Top Seller' : 'New'}
              </div>
            )}
          </div>
          <div className='image-wrapper-2'>
            <div className='sub-image-wrapper'>
              <LazyLoadImage
                // width={"100%"}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                // height={"100%"}
                src={product.image}
                alt={product?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
              />
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`${productView == 'list' ? 'product-detail-list-view' : ''}`}
      >
        <ProductDetails />
      </div>
    </div>
  );
};

export default ProductCardLayout3;

{
  /* <Link */
}
//     //to={`${new URL(product?.url).pathname}`}
//     to={productUrl}
//     className={`${
//         productView == "list" ? "product-image-link-list-view" : ""
//     }`}
//     style={{ width: productView == "grid" ? "100%" : "" }}
//     // style={{width: productView == "list" ? "20%" : "100%", }}
// >
//     <div
//         className={` ${
//             inGrid ? "product-image-grid" : ""
//         } product-image`}
//     >
/* {inGrid && (
                    <div className="product-badge">
                        <div className="badge-text">Best Seller</div>
                    </div>
                )} */
//         {inGrid && <div className="product-offer-label" style={{backgroundColor: product?.total_review > 0 ? "#52AC66" : "#1860A3", top: productView == "list" ? "-9px" : "" }}>{product?.total_review > 0 ? "Top Seller" : "New" }</div>}

//         <div className="image-wrapper">
// <LazyLoadImage
//     width={"100%"}
//     // style={{maxHeight: "80%", maxWidth: '80%'}}
//     height={"100%"}
//     src={product.image}
//     alt={product?.name
//         ?.trim()
//         ?.split(" ")
//         ?.slice(0, 9)
//         ?.join(" ")}
// />
//         </div>
//     </div>
// </Link>
