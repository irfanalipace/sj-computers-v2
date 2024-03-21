import React, { useState } from 'react';
import wellsjcomputer from '@images/categories/welcomesjcomputer.webp';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { useViewportWidth } from '@hooks/useViewportWidth';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

import './LoginAndTimeProduct.css';
import Loader from '@common/LoaderComponent/LoaderComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginAndTimeProduct = () => {
  const screenWidth = useViewportWidth();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state?.products.products);
  const isLoading = useSelector(state => state?.products.isLoading);
  const [loading, setLoading] = useState(true);
  console.log(isLoading, 'isLoading');
  const dbDate = new Date().getTime();

  const parsedDate = new Date(dbDate);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  console.log(products, 'single products');

  return (
    <div className='dev-sections-two-sctions'>
      {/* {isAuthenticated ? ( */}
      {/* <div className='advertisement-heading'>
           <img
             className={`advertisment-img`}
         src={wellsjcomputer}
             alt={'wellsjcomputer'}
           />
         </div> */}
      {/* ) : ( */}

      {isAuthenticated ? (
        ((products && products?.length > 0) || isLoading || loading) && (
          <div className='product-type-section dev-sections-products'>
            {isLoading || loading ? (
              <div
                style={{
                  height: '303px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <div style={{ textAlign: 'center' }}>
                  <Loader />
                </div>
              </div>
            ) : (
              <div style={{ minHeight: '303px' }}>
                {products && products?.length > 0 && (
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        className={`advertisment-img-products-imges`}
                        src={products[0].image}
                        alt={'addDesktop'}
                      />
                    </div>

                    <h5 className='time-product-name'>{products[0].name}</h5>
                    <Stack mb={1} alignItems={'start'} spacing={1}>
                      <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                        // spacing={1}
                        direction={'row'}>
                        <StarRatings
                          rating={products[0].rating}
                          starRatedColor='rgb(232, 126, 36)'
                          numberOfStars={5}
                          name='rating'
                          isSelectable={false}
                          starDimension={'18px'}
                          starSpacing={'0'}
                        />
                        <Typography
                          fontFamily={'Inter'}
                          sx={{ pt: 0.3 }}
                          fontWeight={500}
                          fontSize={'12px'}
                          lineHeight={'17px'}
                          color={'#007185'}>
                          ({products[0].total_review})
                        </Typography>
                      </Stack>
                      {/* {type === "recommended" && getRandomComponent()} */}
                    </Stack>
                    <div className='featured-product-timing mt-4'>
                      {/* <div className='original-price'>
                        ${Math.floor(products[0]?.price)}
                      </div> */}

                      <div className='discount-price'>
                        <span>$</span>
                        {products[0]?.price.toString().split('.')[0]}
                        <sup>
                          {products[0]?.price?.toString().split('.')[1]}
                        </sup>
                      </div>
                      <div className='product-delivery-charges ms-0 ms-sm-2 mb-2 mb-sm-0'>
                        <FontAwesomeIcon className='me-1' icon={faTruck} /> Free
                        Shipping
                      </div>
                      {/* <div className='save-value'>
                        <span>Save $20</span>
                      </div> */}
                      {/* <div className='end-in'>
                        Ends in {parsedDate.getHours()}
                        h:{parsedDate.getMinutes()}m
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )
      ) : (
        <>
          <div className='advertisement-heading' style={{ padding: '5px' }}>
            <div style={{ padding: screenWidth > 575 ? '10px' : '0px 10px' }}>
              <h2
                className='h2-cart'
                style={{
                  marginBottom: '5px',
                  fontSize: '1.18rem',
                  paddingBottom: '10px',
                  textAlign: screenWidth > 575 ? '' : 'start',
                }}>
                {screenWidth > 575 ? 'Login' : 'Sign in'} for the best
                experience
              </h2>
              <Link to='/login'>
                <button
                  style={{
                    borderRadius: '8px',
                    backgroundColor: screenWidth > 575 ? '#318243' : '#28A343',
                    color: 'white',
                    width: '100%',
                  }}
                  type='button'
                  className='button-save'>
                  {screenWidth > 575 ? 'Login Safely' : 'Sign in Safely'}
                </button>
              </Link>

              {screenWidth > 575 ? (
                ''
              ) : (
                <Link
                  to={'/register'}
                  style={{
                    textDecoration: 'none',
                    color: '#007185',
                    paddingTop: '10px',
                    width: '100%',
                    display: 'flex',
                    fontSize: '14px',
                  }}>
                  Create an Account
                </Link>
              )}
            </div>
          </div>

          {((products && products?.length > 0) || isLoading || loading) && (
            <div className='product-type-section product-type-section-mobile-size'>
              {isLoading || loading ? (
                <>
                  <div
                    style={{
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <div style={{ textAlign: 'center' }}>
                      <Loader />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {products && products?.length > 0 && (
                    <Link to={`/${products[0].name}/dp/${products[0].asin}`}>
                      <div style={{ textAlign: 'center' }}>
                        <img
                          className={`advertisment-img-products-imges-unautherized-user`}
                          src={products[0].image}
                          alt={'addDesktop'}
                        />
                      </div>

                      <h5
                        className='time-product-name'
                        style={{ color: 'black' }}>
                        {products[0].name}
                      </h5>
                      <Stack mb={1} alignItems={'start'} spacing={1}>
                        <Stack
                          alignItems={'center'}
                          justifyContent={'center'}
                          // spacing={1}
                          direction={'row'}>
                          <StarRatings
                            rating={products[0].rating}
                            starRatedColor='rgb(232, 126, 36)'
                            numberOfStars={5}
                            name='rating'
                            isSelectable={false}
                            starDimension={'18px'}
                            starSpacing={'0'}
                          />
                          <Typography
                            fontFamily={'Inter'}
                            sx={{ pt: 0.3 }}
                            fontWeight={500}
                            fontSize={'12px'}
                            lineHeight={'17px'}
                            color={'#007185'}>
                            ({products[0].total_review})
                          </Typography>
                        </Stack>
                        {/* {type === "recommended" && getRandomComponent()} */}
                      </Stack>
                      <div className='featured-product-timing'>
                        {/* <div className='original-price'>
                          ${Math.floor(products[0]?.price)}
                        </div> */}
                        <div className='discount-price'>
                          <span>$</span>
                          {products[0]?.price.toString().split('.')[0]}
                          <sup>
                            {products[0]?.price?.toString().split('.')[1]}
                          </sup>
                        </div>
                        <div className='product-delivery-charges ms-0 ms-sm-2 mb-2 mb-sm-0'>
                          <FontAwesomeIcon className='me-1' icon={faTruck} />{' '}
                          Free Shipping
                        </div>
                        {/* <div className='save-value'>
                          <span>Save $20</span>
                        </div> */}
                        {/* <div className='end-in'>
                          Ends in {parsedDate.getHours()}
                          h:{parsedDate.getMinutes()}m
                        </div> */}
                      </div>
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginAndTimeProduct;
