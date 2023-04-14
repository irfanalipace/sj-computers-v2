import React, { useEffect, useState } from "react";
import footerlogo from '@images/header-logo.png';
import english from '@images/home/eng.png';
import vectorcart from '@images/home/vector.png';
import splice from '@images/home/ellipse.png';
import './Header.css'
import Sidebar from "@components/Sidebar/Sidebar";

import Popup from "./Popup";
import LoginCart from "./LoginCart";
import Search from "./Search";
const Header = () => {
  
  
    // const [isOpen, setIsOpen] = useState(false);

    // const handleButtonClick = () => {
    //   setIsOpen(!isOpen);
    // };
    // const [isPaymentFrameVisible, setIsPaymentFrameVisible] = useState(false);
    // ...
    return (
        <div >
        <header className="navbar navbar-expand-lg header-background">
           
                <a className="navbar-brand" href="#"><img src={footerlogo} alt='' className="homepage-img" /></a>
                <div className="d-flex flex-row align-items-center w-100">
                    {/* <ul className="ul-menu">
                        <li className="text-color-heading" style={{color:'#B8B8B9', listStyleType:'none'}}>Deilver to</li>
                        <li className="text-color-heading2">California</li>
                    </ul> */}
                    <Popup />
                    <div className="input-group search-inputgroup">
                        <div className="input-group-btn search-panel">
                        <Search />
                           
                        </div>
                        <input type="hidden" name="search_param" value="all" id="search_param" />
                        <input type="text" className="form-control " name="x" id="search" placeholder="Search" />
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-success search-logo">
                                <i className="fas fa-search"></i>
                            </button>
                        </span>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-toggle eng-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={english} alt="English Flag" /> EN
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">English</a>
                            <a className="dropdown-item" href="#">Spanish</a>
                        </div>
                    </div>
                    <div className="dropdown-cart">
                        <LoginCart className='card'/>
                    </div>
                    <div className="return-button ">
                        <button className="order-button dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Return <br></br>& Order
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Return</a>
                            <a className="dropdown-item" href="#">Order</a>
                        </div>
                    </div>
                    <div className="icon-cart">
                        <div className="product-boll">
                            <div className="dropdown dot" style={{textAlign:'center', color:'white'}}>
                                0
                                <img src={vectorcart} alt="" className="vector-cart" />
                            </div>
                            <span className="cart-text">Cart</span> 
                        </div>
                    </div>
                </div>
          
        </header>


        <Sidebar />
    </div>
    
    );
};

export default Header;

