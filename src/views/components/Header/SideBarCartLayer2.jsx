import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@common/Spinner/Spinner';
import { deleteItem, deleteLocalItem } from '@store/cart/cartThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from '../../../core/utils/helpers';
import './CartOverlay.css';
import { Box, Stack, Typography } from '@mui/material';
import WarrantyBadge from '@components/ShoppingCart/CartItem/WarrantyBadge';
import vectorimg from '../../../assets/images/gaming-images/scan-images.png';
import { flip } from '@popperjs/core';
import vetimges from '../../../assets/images/setr.png';
import { Flex } from '@mantine/core';
import { Star } from '@material-ui/icons';
import StarRatings from 'react-star-ratings';
import { RateReview } from '@material-ui/icons';
const SideBarCartLayer2 = ({ isOpen, toggleSidebar }) => {
  const cartItems = useSelector(state => state.cart.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const details = useSelector(state => state.cart.details);
  const [updatingItem, setUpdatingItem] = useState(false);
  const dispatch = useDispatch();

  const deleteItemFunction = item => {
    let cartQuantity = details?.total_items - 1;
    let cartTotal =
      parseFloat(details?.total) -
      item?.price -
      parseFloat(item?.plan_price || 0);
    let cartSubTotal =
      parseFloat(details?.sub_total) -
      item?.price -
      parseFloat(item?.plan_price || 0);

    const cartDetails = {
      total_items: cartQuantity,
      sub_total: cartSubTotal.toFixed(2),
      total: cartTotal.toFixed(2),
    };

    isAuthenticated
      ? dispatch(deleteItem({ cartItem: item }))
      : dispatch(deleteLocalItem({ cartItem: item, cartDetails }));
  };

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      toggleSidebar(false);
    }
  };

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

  // useEffect(() => {
  //     if (showModal) {
  //         document.body.classList.add("modal-open");
  //     } else {
  //         document.body.classList.remove("modal-open");
  //     }

  //     return () => {
  //         document.body.classList.remove("modal-open");
  //     };
  // }, [showModal]);

  return (
    <div>
      {isOpen && (
        <div
          className='sidebarOverlay'
          onClick={toggleSidebar}
          style={{ overflowY: 'hidden' }}></div>
      )}
      <div className={`sidebar-cart-layer-view ${isOpen ? 'open' : 'closed'}`}>
        {/* sidebar content */}

        <div className='row  sub-title-add-overlay2'>
          <div className='col-md-4 mt-2'>
            <div style={{marginTop:"12px"}}>
              <img src={vetimges} />{' '}
              <span style={{ fontWeight: '500' }}>Not Added</span>
            </div>

            <div className='image-data-scroll-cart mt-2' >
              <img src={vectorimg} />
            </div>
          </div>

          <div className='col-md-6 mt-2'>
            <div style={{marginTop:"12px"}}>
              <span className='' style={{ fontWeight: '500' }}>
                Cart Subtotal
              </span>
              <span className=''>( {details?.total_items} items ):</span>$
              {details?.sub_total}
            </div>
            {isAuthenticated ? (
              <div className='add-cart-button-proccesd-data pb-4 pt-3'>
                <Link
                  to='/cart'
                  className='text-decoration-none cart-text-link'
                  onClick={toggleSidebar}>
                  <button className='cart-overlaybutton'>Cart</button>
                </Link>

                <Link
                  to='/checkout'
                  className='text-decoration-none processed-link'
                  onClick={toggleSidebar}>
                  <button className='processed-button'>
                    Proceed to checkout ({details?.total_items} item)
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', marginTop:'12px' }}>
                  <div>
                    <Link
                      to='/cart'
                      className='text-decoration-none cart-text-link'
                      onClick={toggleSidebar}>
                      <button className='cart-overlaybutton'>Cart</button>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className='text-decoration-none processed-link'
                      onClick={handleClick}
                      // onClick={toggleSidebar}
                      // to={"/checkout"}
                    >
                      <button className='processed-button'>
                        Proceed to checkout ({details?.total_items} item)
                      </button>
                    </Link>
                  </div>
                </div>
                {/* {showModal && ( */}
                {showModal && (
                  <div className='overlay-model-checkout-model-sidebar-checkout'>
                    <div
                      className='overlay-modal-checkout-model-checkout-model-sidebar-checkout'
                      ref={modalRef}>
                      <div className='modal-content-sidebar-checkout'>
                        <form>
                          <div className='dve-heading-data-login-checkout-sidebar-checkout'>
                            <h4 className='login-h3'>Sign in to checkout</h4>
                          </div>

                          <div className='d-flex justify-content-center-sidebar-checkout w-100'>
                            <Link
                              className='text-decoration-none'
                              to={'/login'}
                              onClick={toggleSidebar}>
                              {' '}
                              <button>Sign in</button>
                            </Link>
                          </div>
                          <div>
                            <p className='small-text-paragrap'>
                              <Link
                                to='/login'
                                className='text-decoration-none'>
                                Don't have account? <span>Sign Up</span>
                              </Link>
                            </p>
                          </div>
                          <div className='or-dev-section-overlay-checkout-sidebar-checkout'>
                            <span
                              style={{
                                color: 'black',
                              }}>
                              OR
                            </span>
                          </div>

                          <div className='after-the-or-dev-sction-leve-model-checkout-sidebar-checkout'>
                            <Link
                              onClick={toggleSidebar}
                              className='text-decoration-none'
                              to={'/checkout'}>
                              <button> Continue as a Guest</button>
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='col-2 mt-2'>
            <div style={{ textAlign: 'end', }}>
              <button
              style={{fontSize:"30px"}}
                onClick={toggleSidebar}
                className='close-button-overlay-layer'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className='data-span-modal-cart-view-add-cart'>
            <div>
              {' '}
              <img src={vetimges} />{' '}
              <span>
                There are no couples to display at this time. Please check back
                later.{' '}
              </span>
            </div>
          </div>

          <div className='container container-products-sections-sidebar-overlay'>
            <div className='descover-data-overlay-cart'>
              <span>Discover Best Deals</span>
            </div>

            {details?.total_items > 0 ? (
              <div className=''>
                <div className='row'>
                  {cartItems?.map((item, index) => (
                    <div key={item.id} className='col-md-4'>
                      <div id={item.id} className='items-data-overlay-side-bar'>
                        <div className='dev-sections-products'>
                          <div className='' style={{ textAlign: 'center' }}>
                            <img
                              src={item?.product?.image}
                              alt=''
                              className='cartItem-image'
                            />
                          </div>
                          <Link
                            to={
                              generatePath(item?.product?.url) ||
                              location.pathname
                            }
                            className='text-decoration-none pb-2 d-block'>
                            <strong className='item-details clas-cart-overlay-sidebar'>
                              {item?.product?.name.length > 50
                                ? `${item?.product?.name.substring(0, 50)}...`
                                : item?.product?.name}
                            </strong>
                          </Link>
                          <div className='star-rating-overlay-name'>
                            <Stack
                              mb={2}
                              alignItems={'start'}
                              spacing={1}
                              className='rating-overlay-sidebar'>
                              <Stack
                                alignItems={'center'}
                                justifyContent={'center'}
                                spacing={1}
                                direction={'row'}>
                                <StarRatings
                                  rating={item?.product?.rating}
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
                                  color={'#007185'}>
                                  {item?.product?.total_review}
                                </Typography>
                              </Stack>
                            </Stack>
                          </div>
                          <div className='price-data-load-overlay'>
                            <span>${parseFloat(item?.price).toFixed(2)}</span>
                          </div>
                          <div className='overlay-add-cart-button-area'>
                            <Link to='/cart' className='text-decoration-none'>
                              <button onClick={toggleSidebar}>
                                Add to cart
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className='hrline'></hr>
              </div>
            ) : (
              <div className='buttonoverlay-condtions'>
                <div style={{ marginTop: '53px' }}>
                  <p className='nomore-item-text-p'>No Added</p>
                </div>
                <div style={{ marginTop: '53px' }}>
                  <Link to='/' onClick={toggleSidebar}>
                    <button className='add-more-cart-overaybutton'>
                      Add More Items
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarCartLayer2;
