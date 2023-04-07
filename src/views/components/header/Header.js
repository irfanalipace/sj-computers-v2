import React, { useEffect } from "react";
import footerlogo from '@images/header-logo.png';
import english from '@images/home/eng.png';
import vectorcart from '@images/home/vector.png';
import splice from '@images/home/ellipse.png';
import './header.css'
const Header = () => {

    return (
        <div>
            <header className="navbar navbar-expand-lg navbar-light bg-light header-background">
                <div className="container-fluid">

                    <a className="navbar-brand " href="#"><img src={footerlogo} alt='' className="homepage-img" /></a>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div>
                        <p style={{color:'#B8B8B9'}}> Deliver to California </p>
                        </div>
                          
                        
                     
                        <div className="input-group ps-5 searchbar">
                            <div id="navbar-search-autocomplete " className="form-outline search">
                                <input type="search" id="form1" className="form-control input-form-control" />

                            </div>
                            <button type="button" className="btn btn-success">
                                <i className="fas fa-search"></i>
                            </button>
                           
                        </div>

                        <div className="dropdown eng-dropdown">
                                <button className=" dropdown-toggle eng-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={english} alt="English Flag" /> EN
                                </button>

                            </div>
                            <div className="dropdown eng-dropdown">
                                <button className=" dropdown-toggle eng-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login<br>
                                    </br>
                                    Register
                                </button>

                            </div>
                            <div className="dropdown eng-dropdown">
                                <button className=" eng-button" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Return<br>
                                    </br>
                                    &Order
                                </button>

                            </div>
                            <div className="dropdown eng-dropdown">
                                <span className="ellipse"><img src={splice} alt="" className="boll-img"/></span>
                                <img src={vectorcart} alt="" className="vector-cart" />
                                {/*  */}
                            </div>

                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;
