import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import footer from '@images/header-logo.png';
import vectorimg from '@images/common/boll.png';
import copyrightimg from '@images/common/copywrite.png';
import img1 from '@images/footer/setting.png';
import BackToTopButton from './BackToTopButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const authRoutes = [
    '/login',
    '/register',
    '/forgot_password',
    '/forget-password',
    '/email-sent',
    '/thank-you',
  ];

  return (
    <>
      {!authRoutes.includes(location.pathname) && (
        <div className='footer'>
          <div
            className='footer-copyright text-center back-to-top-hover-effct'
            style={{ backgroundColor: '#002549' }}
          >
            <p className='backtotop-button-footer-click-onit'>
              <BackToTopButton />
            </p>
          </div>
          <footer className='page-footer font-small blue pt-4 footer-section'>
            <div className='container text-center text-md-center footer-data'>
              <div className='row'>
                <div className='col-6 col-md-3 mb-md-0 mb-3 footer-text-line-font-size'>
                  <ul className='list-unstyle1'>
                    <p className='text-uppercase herf-link font-style-heading-footer'>
                      Get to Know Us
                    </p>
                    <li>
                      <Link
                        to='about_us'
                        className='herf-link text-decoration-none'
                      >
                        About us
                      </Link>
                    </li>
                    {/* <li>
                                            <a
                                                href="#!"
                                                className="herf-link text-decoration-none"
                                            >
                                                Product
                                            </a>
                                        </li> */}
                    <li>
                      <Link
                        to='/contact'
                        href='#!'
                        className='herf-link text-decoration-none'
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/blogs'}
                        className='herf-link text-decoration-none'
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/careers'
                        className='herf-link text-decoration-none'
                      >
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className='col-6 col-md-3 mb-md-0 mb-3 footer-text-line-font-size'>
                  {/* <h5 className="text-uppercase">Links</h5> */}
                  <ul className='list-unstyle2'>
                    <p className='text-uppercase herf-link font-style-heading-footer'>
                      Connect With Us
                    </p>
                    <li>
                      <a
                        href='https://www.facebook.com/sjcomputersllc'
                        className='herf-link text-decoration-none'
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/company/sj-computers/'
                        className='herf-link text-decoration-none'
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.instagram.com/sjcomputersllc/'
                        className='herf-link text-decoration-none'
                      >
                        Instagram
                      </a>
                    </li>
                    {/* <li>
                                            <a
                                                href="#"
                                                className="herf-link text-decoration-none"
                                            >
                                                Youtube
                                            </a>
                                        </li> */}
                  </ul>
                </div>

                <div className='col-6 col-md-3 mb-md-0 mb-3 footer-text-line-font-size'>
                  {/* <h5 className="text-uppercase">Links</h5> */}
                  <ul className='list-unstyle3'>
                    <p className='text-uppercase herf-link font-style-heading-footer'>
                      Let Us Help You
                    </p>
                    <li>
                      <Link
                        to='/account'
                        className='herf-link text-decoration-none'
                      >
                        Your Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/return_refund_policy'
                        className='herf-link text-decoration-none'
                        style={{ lineHeight: '1.2rem' }}
                      >
                        Return And Refund Policies
                      </Link>
                    </li>
                    {/* <li>
                                            <Link
                                                to="/shipping_policy"
                                                className="herf-link text-decoration-none"
                                            >
                                                Shipping Policies
                                            </Link>
                                        </li> */}
                    <li>
                      <Link
                        to='/term_services'
                        className='herf-link text-decoration-none'
                      >
                        Terms of Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/privacy_policy'
                        className='herf-link text-decoration-none'
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/refund-order'
                        className='herf-link text-decoration-none'
                      >
                        Refund Order
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='col-6 col-md-3 mb-md-0 mb-3 footer-text-line-font-size'>
                  {/* <h5 className="text-uppercase">Links</h5> */}
                  <ul className='list-unstyle4'>
                    <p className='text-uppercase herf-link font-style-heading-footer'>
                      Reach Us
                    </p>
                    <div className='reach-us '>
                      <p
                        className='text-uppercase herf-link  reach-us-paragraph-data-footer'
                        style={{ lineHeight: '17px' }}
                      >
                        2817 Eagandale Blvd Eagan, MN 55121.
                      </p>
                      <p className='herf-link phonenumber-footer'>
                        952-452-8884
                      </p>
                      <p>
                        <a
                          href='mailto:cs@sjcomputersmn.com'
                          className='herf-link text-decoration-none phonenumber-footer'
                        >
                          cs@sjcomputersmn.com
                        </a>
                      </p>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <hr className='hr-line'></hr>
            <div className='footer-copyright text-center py-3 footer-image-lien'>
              <div className='image-footer-dev-sectionsjcomputers'>
                <Link to='/'>
                  <img
                    src={footer}
                    alt=''
                    className='footer-copywrite-images'
                  />
                </Link>
              </div>

              <div className='setting-button-fax'>
                <button
                  className='btn btn-secondary dropdown-toggle language-dropdown'
                  style={{ background: '#00305E' }}
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <FontAwesomeIcon className='me-1' icon={faGlobe} />
                  English
                  <img src={img1} style={{ marginLeft: '10px' }} />
                </button>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <a className='dropdown-item' href='#'>
                    span
                  </a>
                  <a className='dropdown-item' href='#'>
                    UK
                  </a>
                </div>
              </div>
            </div>
            <div className='footer-copyright text-center py-3'>
              {/* <img
                                src={copyrightimg}
                                alt=""
                                className="copywriten footer-end-image-data"
                            /> */}
              <span className='copywriten footer-end-image-data'>
                S.J Computers @ 2023 Tech Store. All Rights <br></br>Reserved
              </span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};
export default Footer;
