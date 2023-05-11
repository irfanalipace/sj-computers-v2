import React, { useState } from "react";
import "./MobileHeader.css"
import vectorcart from "@images/home/vector.png";
import { Link } from 'react-router-dom';


function MobileHeader() {
  const [isSideMenu, setSideMenu] = useState(false);
  const toggleSidebar = () => {
      return setSideMenu((state) => !state);
  };
  return (
    <div className="header-mobile">
    <header className="mobile-header">
      {/* <div className="mobile-header__logo">
        <Link to="/">
          <img src="Logo" alt="Logo" />
        </Link>
      </div> */}
      <div className="mobile-header__menu">
        {/* <button className="mobile-header__menu-button">
        <img src="Logo" alt="Menu" />
        <i className="fa fa-home" aria-hidden="true"></i>
      </button> */}
        <div className="mobile-header__menu-items">
          <ul className="ul-item-list-header">
            <li>
              <Link to="/"><i className="fa fa-home" aria-hidden="true"></i></Link>
            </li>
            <li>
              <Link to="/account"><i className="fa fa-user" aria-hidden="true"></i></Link>
            </li>
            <li>
              <Link to="/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>

              </Link>
            </li>
            <li>
              <Link to="/"   className="navIcon  hover-effect-sets"
                       ><i class="fa fa-bars" aria-hidden="true" ></i></Link>
            </li>
          </ul>
        </div>
        
      </div>
      
    </header>
    </div>
  );
}

export default MobileHeader