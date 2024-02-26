import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import styled from "styled-components";
import './MobileSearch.css';
import BottomNavigationlogo from '@images/header-logo.png';
import ModalBox from './MobileScreenModal/ModalBox';
import { SET_SEARCH_STRING } from '@store/products/productsSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '@components/Sidebar/Sidebar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import vectorcart from '@images/home/vector.png';

const MobileScreenModal = lazy(
  () => import('./MobileScreenModal/MobileScreenModal'),
);

const MobileSearch = ({ screenWidth }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const searchString = useSelector(state => state.products.searchString);
  const cartDetails = useSelector(state => state.cart.details);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSideMenu, setSideMenu] = useState(false);

  const toggleSidebar = () => {
    return setSideMenu(state => !state);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (search) {
      dispatch(SET_SEARCH_STRING(search));
      navigate('/products/search?s=' + search);
    }
  };
  useEffect(() => {
    setSearch(searchString || '');
  }, [searchString]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <Container className="search-dev">
                <>
                    <Link to="/">
                        <Image
                            src={BottomNavigationlogo}
                            alt="Left Image"
                            className="mobile-imagelogo"
                        />
                    </Link>
                </>
                <RightContent>
                    <SearchIconContainer>
                        <FontAwesomeIcon
                            icon={faBars}
                            size="xl"
                            onClick={() => {
                                toggleSidebar();
                            }}
                           
                            style={{ color: "#ffffff" }}
                        />

                      
                    </SearchIconContainer>
                </RightContent>
            </Container> */}
      {/* <CollapseContainer>
                <form onSubmit={handleSearch}>
                    <div className="search-hide-section-body">
                        <SearchBar>
                            <Input
                                className="search-section"
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span
                                className="input-group-text red lighten-3 search-icon-on-mobile-screen"
                                id="basic-text1"
                            >
                                <i
                                    className="fas fa-search text-grey set"
                                    aria-hidden="true"
                                    onClick={handleSearch}
                                ></i>
                            </span>
                        </SearchBar>
                    </div>
                </form>
            </CollapseContainer> */}

      <div className='search-dev'>
        <div className='left-content'>
          <div className='search-icon-container'>
            <FontAwesomeIcon
              icon={faBars}
              size='xl'
              onClick={() => {
                toggleSidebar();
              }}
              style={{ color: '#ffffff' }}
            />
          </div>
          <>
            <Link to='/'>
              <img
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                src={BottomNavigationlogo}
                alt='Left Image'
                className='mobile-imagelogo'
              />
            </Link>
          </>
        </div>
        <div className='right-content'>
          <div className='sign-in-div'>
            {isAuthenticated == true ? (
              <span>{user?.name}</span>
            ) : (
              <Link
                to={'/login'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Sign in <NavigateNextIcon />
                <PermIdentityIcon fontSize='large' className='sign-in-icon' />
              </Link>
            )}
          </div>
          <Link to={'/cart'}>
            <div
              className='dropdown dot'
              style={{
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <img
                src={vectorcart}
                alt=''
                className='vector-cart'
                style={{
                  display: 'block',
                }}
              />
              <div className='total-items'>{cartDetails.total_items}</div>
            </div>
          </Link>
        </div>
      </div>

      <div className='collapse-container'>
        <form onSubmit={handleSearch}>
          <div className='search-hide-section-body'>
            <div className='search-bar'>
              <input
                className='search-section'
                type='text'
                placeholder='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span
                className='input-group-text red lighten-3 search-icon-on-mobile-screen'
                id='basic-text1'
                onClick={handleSearch}
              >
                {/* <i
                                    className="fas fa-search text-grey set"
                                    aria-hidden="true"
                                ></i> */}
                <FontAwesomeIcon
                  icon={faSearch}
                  className='fa-search text-grey set'
                />
              </span>
            </div>
          </div>
        </form>
      </div>

      <Sidebar openState={isSideMenu} toggleSidebar={toggleSidebar} />
      {screenWidth > 450 && (
        <div className='mobile-box-model'>
          <MobileScreenModal onClick={handleButtonClick} />
          {showModal && <ModalBox closeModal={closeModal} />}
        </div>
      )}
    </div>
  );
};

// const Container = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// `;

// const LeftContent = styled.div`
//     flex: 1;
// `;

// const RightContent = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const Image = styled.img`
//     width: 50px;
//     height: 50px;
// `;

// const SearchIconContainer = styled.div`
//     padding: 10px;
//     cursor: pointer;
// `;

// const SearchIcon = styled.i`
//     font-size: 20px;
//     color: #0077c2;
// `;

// const SearchBar = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const CollapseContainer = styled.div``;

// const Input = styled.input`
//     width: 100%;
//     padding: 10px;
//     border-radius: 5px;
//     border: 1px solid #ccc;
//     font-size: 16px;
// `;

export default MobileSearch;
