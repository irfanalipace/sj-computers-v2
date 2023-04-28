import React, { useState, useEffect } from 'react';
import "./Header2.css";
import footerlogo from "@images/header-logo.png";
import { Link } from "react-router-dom";
const Header2 = () => {
    const [mobileView, setMobileView] = useState(false);
    const [tabletView, setTabletView] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setMobileView(true);
          setTabletView(false);
        } else if (window.innerWidth < 1024) {
          setMobileView(false);
          setTabletView(true);
        } else {
          setMobileView(false);
          setTabletView(false);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
        <header>
        <div className="header-container">
          <Link to="/">
            <img src={footerlogo} alt="Amazon logo" className="logo" />
          </Link>
          {!tabletView && (
            <div className="search-bar">
              <select>
                <option>All</option>
                <option>Books</option>
                <option>Electronics</option>
              </select>
              <input type="text" placeholder="Search" />
              <button>Search</button>
            </div>
          )}
          <nav>
            {tabletView && (
              <Link to="#" className="hamburger-icon">
                <i className="fa fa-bars"></i>
              </Link>
            )}
            <Link to="/products">Products</Link>
            <Link to="/deals">Deals</Link>
            {tabletView && (
              <>
                <hr />
                <Link to="#">Your Account</Link>
                <Link to="#">Returns</Link>
                <Link to="#">Orders</Link>
                <Link to="#">Cart</Link>
              </>
            )}
            {!tabletView && (
              <div className="account-menu">
                <span>Hello, Guest</span>
                <Link to="#">Sign In</Link>
                <Link to="#">Orders</Link>
                <Link to="#">Cart</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
};
export default Header2;
