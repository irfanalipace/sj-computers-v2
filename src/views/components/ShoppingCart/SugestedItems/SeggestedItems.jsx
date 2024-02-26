import React, { useEffect, useState } from 'react';
import { featureProductsApi } from '@api/products';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import './Sugesteditems.css';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import StarRatings from 'react-star-ratings';
import useAddToCart from '../../Product/CheckOutCard/useAddToCart';
import { useSelector } from 'react-redux';

const SeggestedItems = ({ num }) => {
  const [products, setProducts] = useState([]);
  const [addingStates, setAddingStates] = useState({});
  const getFeaturedProduct = async () => {
    try {
      const resp = await featureProductsApi(12);
      const selectedProducts = resp?.data.slice(0, num);
      setProducts(selectedProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedProduct();
  }, []);
  const ProductDetails = ({ product }) => {
    const cartClickHandler = useAddToCart(product, 1);
    const isAdding = addingStates[product.id];
    const cart = useSelector(state => state.cart.cart);
    const cartItem = cart.find(ci => ci.id === product.id);

    return (
      <div key={product?.id}>
        <div className='dev-section-button-dev-card'>
          <Link
            to={`${new URL(product?.url).pathname}`}
            style={{ color: '#007185', textDecoration: 'none' }}
          >
            <div
              className='suggested-items product-name product-cart-name-mobile-screen'
              style={{ fontSize: '12px' }}
            >
              {product.name}
            </div>
            <div className=' d-sm-none product-prices'>
              {product.originalPrice && (
                <div className='product-original-price'>
                  ${product.originalPrice}
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className='hide-on-mobile'>
          <Link
            to={`${new URL(product?.url).pathname}`}
            style={{ textDecoration: 'none' }}
          >
            {/* <div className="d-none d-sm-block product-rating"> */}
            <StarRatings
              rating={product?.rating}
              starRatedColor='rgb(232, 126, 36)'
              numberOfStars={5}
              name='rating'
              isSelectable={false}
              starDimension={'15px'}
              starSpacing={'0'}
            />
            <span className='ms-2' style={{ color: '#1270c4' }}>
              ({product?.total_review})
            </span>
            {/* </div> */}
          </Link>
        </div>
        <div className='item-price mb-2'>
          {product.originalPrice && (
            <div className='product-original-price'>
              ${product.originalPrice}
            </div>
          )}
          ${product?.price?.toString().split('.')[0]}.
          {product?.price?.toString().split('.')[1]}
        </div>

        <>
          {isAdding ? (
            <p style={{ fontSize: '12px' }}>
              {' '}
              <DoneRoundedIcon sx={{ color: 'green', fontSize: '20px' }} />{' '}
              <span style={{ fontSize: '11px' }}>Item Added Successfully</span>
            </p>
          ) : (
            <>
              {' '}
              {!cartItem?.id ? (
                <button
                  className='suggested-item-btn hide-on-mobile'
                  onClick={e => {
                    setAddingStates(prevState => ({
                      ...prevState,
                      [product.id]: true,
                    }));

                    cartClickHandler(null, '');
                  }}
                >
                  Add to cart
                </button>
              ) : (
                <p style={{ fontSize: '12px' }} className='hide-on-mobile'>
                  Item already in cart
                </p>
              )}{' '}
            </>
          )}
        </>
      </div>
    );
  };

  return (
    <div>
      {products?.map((item, index) => (
        <div className='suggested-item-container' key={index}>
          <div className='suggested-item-image'>
            <div>
              <LazyLoadImage
                width={'100%'}
                height={'100%'}
                src={item?.image}
                alt={item?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
              />
            </div>
          </div>

          <span className='suggested-items-content'>
            <ProductDetails product={item} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SeggestedItems;
