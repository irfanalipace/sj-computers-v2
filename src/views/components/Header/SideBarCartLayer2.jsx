import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, deleteLocalItem } from '@store/cart/cartThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  generatePath,
  makeDataLayerItemObject,
} from '../../../core/utils/helpers';
import './CartOverlay.css';
import { Box, Stack, Typography } from '@mui/material';
import vetimges from '../../../assets/images/setr.png';
import StarRatings from 'react-star-ratings';
import CircularProgress from '@mui/material/CircularProgress';
import { getProductsCategory } from '../../../core/api/products';
import useAddToCart from '../Product/CheckOutCard/useAddToCart';
const SideBarCartLayer2 = ({ isOpen, toggleSidebar }) => {
  const cartItems = useSelector(state => state.cart.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const details = useSelector(state => state.cart.details);
  const cart = useSelector(state => state.cart.cart);
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

  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async total => {
    try {
      setLoading(true);
      const filterObject = {
        page: 1,
        category: 'best-sellers',
        per_page: 6,
      };

      const response = await getProductsCategory(filterObject);

      viewItemDataLayer(response?.data?.data);
      setBestSeller(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const viewItemDataLayer = (products, categorySlug) => {
    console.log(
      'view_item_list data layer best sellers category',
      makeDataLayerItemObject(products),
    );
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: 'best-sellers',
      items: makeDataLayerItemObject(products),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 200);
  }, []);

  const alreadInCart = id => {
    const resp = cart?.findIndex(cartItem => cartItem.id === id);
    if (resp !== -1) return true;
    return false;
  };

  const AddToCartButton = ({ product }) => {
    const [cartClickHandler] = useAddToCart(product, 1);

    return (
      <button
        style={{
          color: alreadInCart(product.id) ? 'black' : 'white',
          backgroundColor: alreadInCart(product.id) ? '' : '#52ac66',
        }}
        disabled={alreadInCart(product.id)}
        onClick={e => {
          cartClickHandler(
            null,
            `/cart/${product?.name}/dp/${product?.asin}/${product.id}`,
          );
        }}>
        {alreadInCart(product.id) ? 'Already in cart' : '  Add to cart '}
      </button>
    );
  };

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
          {/* <div className='col-md-4 mt-2' style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '12px' }}>
              <img src={vetimges} />{' '}
              <span style={{ fontWeight: '500' }}>Not Added</span>
            </div>

            <div className='image-data-scroll-cart mt-2'>
              <img src={vectorimg} />
            </div>
          </div> */}

          <Stack mb={2} direction={'column'} className='col-md-6 mt-2'>
            <Stack spacing={1} direction={'row'} style={{ marginTop: '12px' }}>
              <Typography className='' style={{ fontWeight: '500' }}>
                Cart Subtotal:
              </Typography>
              <Typography
                fontWeight={'bold'}>{`$${details?.sub_total}`}</Typography>
              <Typography> ({details?.total_items} items) </Typography>
            </Stack>
            {isAuthenticated ? (
              <div className='add-cart-button-proccesd-data pb-4 pt-3'>
                <Link
                  to='/cart'
                  className='text-decoration-none cart-text-link'
                  onClick={toggleSidebar}>
                  <button className='cart-overlaybutton-overlay-desktop'>
                    Cart
                  </button>
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
                <div style={{ display: 'flex', marginTop: '12px' }}>
                  <div>
                    <Link
                      to='/cart'
                      className='text-decoration-none cart-text-link'
                      onClick={toggleSidebar}>
                      <button className='cart-overlaybutton-overlay-desktop'>
                        Cart
                      </button>
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
          </Stack>

          <div style={{ position: 'absolute', top: 5, right: 5 }}>
            <div style={{ textAlign: 'end' }}>
              <button
                style={{ fontSize: '30px' }}
                onClick={toggleSidebar}
                className='close-button-overlay-layer'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* <div className='data-span-modal-cart-view-add-cart'>
            <div>
              {' '}
              <img src={vetimges} />{' '}
              <span>
                There are no coupons to display at this time. Please check back
                later..{' '}
              </span>
            </div>
          </div> */}

          {loading ? (
            <Box mt={5} justifyContent={'center'} display={'flex'}>
              <CircularProgress sx={{ color: 'black' }} />
            </Box>
          ) : (
            <div className='mt-3 container container-products-sections-sidebar-overlay'>
              <div className='descover-data-overlay-cart'>
                <span>Best Selling Products</span>
              </div>
              <div>
                <div className='container'>
                  <div className='row'>
                    {bestSeller?.map(item => (
                      <>
                        <div key={item.id} className='col-md-4'>
                          <div
                            id={item.id}
                            className='items-data-overlay-side-bar'
                            style={{
                              background: 'white',
                              border: '1px solid lightgray',
                              borderRadius: '5px',
                            }}>
                            <div className='dev-sections-products'>
                              <div className='' style={{ textAlign: 'center' }}>
                                <img src={item?.image[0]} alt='' />
                              </div>
                              <Link
                                to={
                                  generatePath(item?.url) || location.pathname
                                }
                                className='text-decoration-none pb-2 d-block'>
                                <strong className='item-details clas-cart-overlay-sidebar'>
                                  {item?.name?.length > 50
                                    ? `${item?.name.substring(0, 50)}...`
                                    : item?.name}
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
                                      rating={parseFloat(item?.rating || 0)}
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
                                      {item?.total_review}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </div>
                              <div className='price-data-load-overlay'>
                                <span>
                                  ${parseFloat(item?.price).toFixed(2)}
                                </span>
                              </div>
                              <div className='overlay-add-cart-button-area'>
                                {/* <Link
                                  to='/cart'
                                  className='text-decoration-none'> */}
                                <AddToCartButton product={item} />
                                {/* <button
                                  style={{
                                    color: 'white',
                                    backgroundColor: '#52ac66',
                                  }}
                                  disabled={alreadInCart(item.id)}
                                  onClick={e => {
                                    handlecart(item);
                                    // cartClickHandler(
                                    //   null,
                                    //   `/cart/${item?.name}/dp/${item?.asin}/${item.id}`,
                                    // );
                                  }}>
                                  {alreadInCart(item.id)
                                    ? 'Already in cart'
                                    : '  Add to cart '}
                                </button> */}
                                {/* </Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <hr className='hrline'></hr> */}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarCartLayer2;
