import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { CartItem } from './CartItem/CartItem';
import toggleSlice from '../../../core/store/toggle/toggleSlice';
import './ShopingCart.css';
import { CheckoutBox } from './CheckOut/CheckoutBox';
import CartOverlay from '../Header/CartOverlay';
import { validateCartItems } from '../../../core/store/cart/cartThunks';
import { IS_CHRISTMAS_HOLIDAYS } from '../../../core/utils/constants';
import EmptyCart from './EmptyCart';
import SeggestedItems from './SugestedItems/SeggestedItems';
import Recommendation from '../Recommendation/Recommendation';
import { featureProductsApi } from '@api/products';
import { getUserId } from '../../../core/services/authService';
import { makeDataLayerItemObject } from '../../../core/utils/helpers';

export const ShopingCart = ({ onFormSubmit, form }) => {
  const cartItems = useSelector(state => state.cart.cart);
  const cartDetails = useSelector(state => state.cart.details);
  const isLoading = useSelector(state => state.cart.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const error = location.state?.error || searchParams.get('error');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const orderEstimatedDelivery = useSelector(
    state => state.orders.orderEstimatedDelivery,
  );
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  const handleClick = () => {
    isAuthenticated ? navigate('/checkout') : setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    // displays error on top whenever payment fails and open shipping details form (First Accordion)
    if (error && cartItems.length > 0) {
      const cartData = cartItems?.map(item => {
        // map item according to the request payload format
        return {
          product_id: item.id,
          qty: item.quantity,
        };
      });
      dispatch(
        validateCartItems({ cart_items: cartData }), //validate if all the items in the cart are available or not
      );
    }
  }, [error, cartItems]);

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);
  const [products, setProducts] = useState([]);
  const getFeaturedProduct = async () => {
    try {
      const resp = await featureProductsApi(12);
      const selectedProducts = resp?.data;
      setProducts(selectedProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedProduct();
  }, []);

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }

    window.dataLayer.push({
      event: 'view_cart',
      currency: 'USD',
      value: parseFloat(cartDetails?.sub_total).toFixed(2),
      items: makeDataLayerItemObject(cartItems),
    });
  }, []);

  return cartItems.length === 0 ? (
    <>
      <EmptyCart />
      <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <div
          className='emty-cart-bottom-section'
          style={{
            // padding: "10px 70px",
            borderTop: '1px solid #D0D0D0',
            borderBottom: '1px solid #D0D0D0',
          }}>
          <h3
            className='d-block d-sm-none'
            style={{
              fontSize: '20px',
              fontWeight: 600,
              textWrap: 'nowrap',
            }}>
            Recommended Products
          </h3>
          <div className='hide-on-desktop'>
            <SeggestedItems num={3} />
          </div>
          <div className='d-none d-sm-block'>
            <Recommendation prod={products} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div>
          <div className=' cart-mein-dev'>
            <div className='row'>
              <div className='col-md-8 col-lg-9'>
                <div
                  className='card cart-box'
                  style={{
                    borderBottom: 'none',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}>
                  <div className='row mx-0'>
                    <div className='shop-heading'>
                      <div className='col-md-10'>
                        <h3 className='shop-heading'>Shopping Cart</h3>
                      </div>
                      <div className='col-md-2'>
                        <p className='price-heading d-sm-block d-none'>Price</p>
                      </div>
                    </div>
                  </div>
                  {cartItems?.map(item => (
                    <div key={item.id} id={item.id}>
                      <hr className='hrline hide-on-mobile '></hr>
                      <div className='items'>
                        <CartItem cartData={item} />
                      </div>
                    </div>
                  ))}
                  <hr className='hrline hide-on-desktop shopping-cart-align-hr-line'></hr>
                </div>
                <div className='cart-product-subtotal-price hide-mobile-cart-btn'>
                  <span>
                    Subtotal (
                    {cartDetails?.total_items ? cartDetails.total_items : 0}
                    &nbsp;items):
                    <strong className='price-with-sign'>
                      &ensp;$
                      {cartDetails?.sub_total
                        ? parseFloat(cartDetails.sub_total).toFixed(2)
                        : 0}
                    </strong>
                  </span>
                </div>

                {/* <div className="add-more-items-dev">
                                    <Link to={"/"}>
                                        <button className="add-more-button-product  hide-mobile-cart-btn">
                                            Add more items
                                        </button>
                                    </Link>
                                </div> */}
              </div>
              <div className='col-md-4 col-lg-3'>
                <div className='card card-checkout' style={{ borderRadius: 0 }}>
                  <div className='card-body'>
                    <div className='checkout-container'>
                      <p className='checkout-text hide-on-mobile'>
                        <span style={{ color: '#318243' }}>
                          Your order qualifies for FREE Shipping.
                        </span>{' '}
                        <br />
                        Choose this option at checkout.&ensp;
                        <Link>see details</Link>
                      </p>
                      <div className='card-body-text'>
                        <div className='text-body'>
                          <span className='sub-title'>
                            Subtotal( {cartDetails?.total_items}
                            &nbsp;items):&nbsp;
                            <strong
                              className='price-items'
                              style={{
                                fontWeight: 'bold',
                              }}>
                              ${cartDetails?.sub_total}
                            </strong>
                          </span>
                          <br></br>
                          <label className='checkbox-paragraph hide-on-mobile'>
                            <input type='checkbox' name='myCheckbox' />
                            &ensp;This order contains an offer
                          </label>
                        </div>
                      </div>

                      <div className='button-checkout-data'>
                        <button
                          onClick={handleClick}
                          className='btn btn-primary checkout-button'>
                          Proceed to checkout
                        </button>
                      </div>
                      <hr className='hide-on-desktop' />
                      <div className='mob-cart hide-on-desktop'>
                        {cartItems?.map(item => (
                          <div key={item.id} id={item.id}>
                            <hr className='hrline hide-on-mobile'></hr>
                            <div className='items'>
                              <CartItem cartData={item} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className='btn btn-primary checkout-button hide-on-desktop'
                        style={{ width: '140px' }}
                        onClick={() => navigate('/')}>
                        Add More items
                      </button>
                    </div>

                    {/* <div className="add-more-items-dev mt-3 hide-desktop-cart-btn">
                                            <Link to={"/"}>
                                                <button className="add-more-button-product">
                                                    Add more items
                                                </button>
                                            </Link>
                                        </div> */}
                  </div>
                </div>
                <div
                  className='card card-checkout mt-3 hide-on-mobile'
                  style={{ borderRadius: 0 }}>
                  <div className='card-body'>
                    <div className='checkout-container'>
                      <div className='card-body-text'>
                        <div
                          style={{
                            fontSize: '12px',
                            lineHeight: '17px',
                          }}>
                          <strong
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                            }}>
                            Note:
                          </strong>
                          &nbsp;Parcel Arrives on&nbsp;
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                            }}>
                            {
                              orderEstimatedDelivery?.free_shipment_amount
                                ?.estimate_day
                            }
                          </span>{' '}
                          (Tentative)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-3 hide-on-mobile'></div>
                <div
                  className='card card-checkout  mb-5'
                  style={{ borderRadius: 0 }}>
                  <div className='card-body'>
                    <div className='checkout-container'>
                      <div className='card-body-text'>
                        <h3
                          className='hide-on-mobile'
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                          }}>
                          You might also like
                        </h3>
                        <h3
                          className='hide-on-desktop'
                          style={{
                            fontSize: '20px',
                            fontWeight: 600,
                          }}>
                          Recommended Products
                        </h3>
                        <SeggestedItems num={3} />
                      </div>
                    </div>
                  </div>
                </div>
                {IS_CHRISTMAS_HOLIDAYS && (
                  <div className='card card-checkout mt-3 mb-sm-0 mb-2'>
                    <div className='card-body'>
                      <div className='text-body'>
                        <p className='christmas-offer-card'>
                          <strong
                            className='price-items'
                            style={{
                              fontWeight: '600',
                            }}>
                            Note:
                          </strong>
                          Parcel{' '}
                          <span className='text-danger'>
                            Arrives after Christmas,{' '}
                          </span>
                          on
                          <strong
                            style={{
                              fontWeight: '600',
                            }}>
                            {' '}
                            {
                              orderEstimatedDelivery?.free_shipment_amount
                                ?.estimate_day
                            }{' '}
                          </strong>
                          <span className='text-muted'>(Tentative)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className='overlay-model-checkout-model'>
          <div
            className='overlay-modal-checkout-model-checkout-model'
            ref={modalRef}>
            <CheckoutBox />
          </div>
        </div>
      )}
      <div
        style={{ paddingTop: '50px', paddingBottom: '50px' }}
        className='hide-on-mobile'>
        <div
          style={{
            padding: '10px 70px',
            borderTop: '1px solid #D0D0D0',
            borderBottom: '1px solid #D0D0D0',
          }}>
          <Recommendation prod={products} />
        </div>
      </div>
    </>
  );
};
