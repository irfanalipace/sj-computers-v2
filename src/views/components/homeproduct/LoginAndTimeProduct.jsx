import React from 'react';
import wellsjcomputer from '@images/categories/welcomesjcomputer.webp';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { useViewportWidth } from '@hooks/useViewportWidth';

import './LoginAndTimeProduct.css';

const LoginAndTimeProduct = () => {
  const screenWidth = useViewportWidth();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state?.products.products);

  const dbDate = new Date().getTime();

  const parsedDate = new Date(dbDate);

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
      {!isAuthenticated && (
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
              {screenWidth > 575 ? 'Login' : 'Sign in'} for the best experience
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
      )}
      <div className='product-type-section dev-sections-products'>
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
            <div className='featured-product-timing'>
              <div className='original-price'>
                ${Math.floor(products[0]?.price)}
              </div>
              <div className='discount-price'>
                <span>$</span>
                {products[0]?.price.toString().split('.')[0] - 20}
                <sup>{products[0]?.price?.toString().split('.')[1]}</sup>
              </div>
              <div className='save-value'>
                <span>Save $20</span>
              </div>
              <div className='end-in'>
                Ends in {parsedDate.getHours()}
                h:{parsedDate.getMinutes()}m
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAndTimeProduct;
