import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import LoginCard from './LoginCard';
import footerlogo from '@images/header-logo.png';
import english from '@images/home/eng.png';
import vectorcart from '@images/home/vector.png';

import Loader from '@common/Spinner/Spinner';

const TopBar = lazy(() => import('@components/TopBar/TopBar'));
// const Search = lazy(() => import("./Search"));
const LocationModal = lazy(() => import('./Location/LocationModal'));
// const BottomNavigation = lazy(() =>
//     import("./BottomNavigation/BottomNavigation")
// );
const MobileSearch = lazy(() => import('./MobileSearch/MobileSearch'));
const CartOverlay = lazy(() => import('./CartOverlay'));
const SideBarCartLayer2 = lazy(() => import('./SideBarCartLayer2'));
// import TopBar from "@components/TopBar/TopBar";
import Search from './Search';
// import LocationModal from "./Location/LocationModal";
import BottomNavigation from './BottomNavigation/BottomNavigation';
// import MobileSearch from "./MobileSearch/MobileSearch";
// import CartOverlay from "./CartOverlay";
import { US } from 'country-flag-icons/react/3x2';
import './Header.css';
import { Troubleshoot } from '@mui/icons-material';
import MobileScreenModal from './MobileSearch/MobileScreenModal/MobileScreenModal';
import ModalBox from './MobileSearch/MobileScreenModal/ModalBox';
import useLocation1 from '../../../core/hooks/getLocation';

const Header = () => {
  const currentState = useSelector(state => state.states.currentState);
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const cartDetails = useSelector(state => state.cart.details);
  const [showModal, setShowModal] = useState(false);

  const firstLogin = useRef(null);

  const { location1, loading, error } = useLocation1();

  const [searchParams, setSearchParams] = useSearchParams();
  firstLogin.current = searchParams.get('firstLogin');

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const location = useLocation();
  const ThankyouPage = location.pathname === '/thank-you';
  const nonHeaderRoutes = [
    'login',
    'register',
    'forgot_password',
    'forget-password',
    'email-sent',
    'checkout',
  ];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    ((firstLogin.current && !currentState) ||
      window.localStorage.getItem('state') == null) &&
      // setTimeout(() => {
        // setShow(true); 
      // }, 10000);
    // setShow(true);
    searchParams.delete('firstLogin');
    setSearchParams(searchParams);
    // return () => {
    //   clearTimeout(setTimeout); // Clean up the timeout on component unmount
    // };
  }, [firstLogin.current, currentState]);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {screenWidth <= 450 ? (
        <div>
          {/* <Suspense> */}
          <BottomNavigation />
          {/* </Suspense> */}
          <Suspense>
            <MobileSearch DeliverBtn={<Button
                              className='dliver-set '
                              variant='primary'
                              onClick={handleShow}
                              style={{
                                background: '#00305E',
                                border: '#00305E',
                                fontSize: '12px',
                                padding: '2px',
                                textAlign: 'left',
                              }}>
                              <span className='deliver-text '>Deliver to </span>
                              <br></br>
                              {!loading && location1?.state}
                            </Button>} screenWidth={screenWidth} />
          </Suspense>
          {Troubleshoot ? (
            <Suspense>
              {/* <div className="d-none d-lg-block"> */}
              <TopBar screenWidth={screenWidth} />
              {/* </div> */}

              <div className='mobile-box-model'>
                <MobileScreenModal onClick={handleButtonClick} />
                {showModal && <ModalBox closeModal={closeModal} />}
              </div>
            </Suspense>
          ) : (
            <></>
          )}

          {/* components to render when screen width is less than or equal to 750px */}
        </div>
      ) : (
        <div>
          {!nonHeaderRoutes.includes(location.pathname.split('/')[1]) && (
            <>
              <header className='navbar navbar-expand-lg header-background px-3'>
                <div
                  className={`header-container ${
                    ThankyouPage ? 'header-thank-you' : ''
                  }`}>
                  <Link className='navbar-brand me-xl-2 me-0' to='/'>
                    <img
                      src={footerlogo}
                      alt=''
                      className='homepage-img hover-effect-sets'
                    />
                  </Link>
                  {!ThankyouPage && (
                    <>
                      <div className='d-flex flex-row align-items-center main-nav'>
                        <div className='d-flex align-items-center justify-content-center flex-wrap header-position '>
                          <div className='hover-effect-sets'>
                            <Button
                              className='dliver-set '
                              variant='primary'
                              onClick={handleShow}
                              style={{
                                background: '#00305E',
                                border: '#00305E',
                                fontSize: '12px',
                                padding: '2px',
                                textAlign: 'left',
                              }}>
                              <span className='deliver-text '>Deliver to </span>
                              <br></br>
                              {currentState ? currentState?.name : <>{!loading && location1?.state}</>}
                            </Button>
                          </div>
                        </div>
                        {show  && (
                          <Suspense>
                            <LocationModal
                              isOpen={show}
                              handleClose={() => setShow(false)}
                            />
                          </Suspense>
                        )}
                        <Search />

                        <div className='nav-right'>
                          <div className='dropdown'>
                            <div className='hover-effect-sets '>
                              <button
                                className=' eng-button'
                                type='button'
                                id='dropdownMenuButton'
                                data-toggle='dropdown'
                                aria-haspopup='false'
                                aria-expanded='false'>
                                <US
                                  title='United States'
                                  className='eng-button-type-data'
                                />{' '}
                                EN
                              </button>
                            </div>
                            <div
                              className='dropdown-menu'
                              aria-labelledby='dropdownMenuButton'>
                              <a className='dropdown-item' href='#'>
                                English
                              </a>
                              <a className='dropdown-item' href='#'>
                                Spanish
                              </a>
                            </div>
                          </div>

                          <div className='dropdown-cart '>
                            {isAuthenticated ? (
                              <div>
                                <p className='mb-0 text-white check-auth'>
                                  Hello {user?.name}
                                </p>
                              </div>
                            ) : (
                              <LoginCard className='card' />
                            )}
                          </div>
                          <div className='return-button '>
                            <div className='hover-effect-sets'>
                              <Link
                                to={'account/orders'}
                                className='order-button dropdown-toggle '
                                type='button'
                                data-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'>
                                Return <br></br>& Order
                              </Link>
                            </div>
                            <div
                              className='dropdown-menu'
                              aria-labelledby='dropdownMenuButton'>
                              <a className='dropdown-item' href='#'>
                                Return
                              </a>
                              <a className='dropdown-item' href='#'>
                                Order
                              </a>
                            </div>
                          </div>
                          <div className='hover-effect-sets'>
                            <button
                              className='icon-cart me-2 icon-cart-effect-hover icon cart-image-boll-background-image'
                              onClick={toggleSidebar}>
                              <div className='product-boll '>
                                <div
                                  className='dropdown dot '
                                  style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                  }}>
                                  <img
                                    src={vectorcart}
                                    alt=''
                                    className='vector-cart'
                                    style={{
                                      display: 'block',
                                    }}
                                  />
                                  <div className='total-items'>
                                    {cartDetails.total_items}
                                  </div>
                                </div>

                                <span className='cart-text'>Cart</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </header>
              {!ThankyouPage && (
                <Suspense>
                  <TopBar />
                </Suspense>
              )}
            </>
          )}

          {/* CartOverLay code */}
          {isOpen && (
            <Suspense>
              {/* <CartOverlay
                                isOpen={isOpen}
                                toggleSidebar={toggleSidebar}
                            /> */}
              <SideBarCartLayer2
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
              />
            </Suspense>
          )}

          {/* components to render when screen width is greater than 750px */}
        </div>
      )}
    </>
  );
};

export default Header;
