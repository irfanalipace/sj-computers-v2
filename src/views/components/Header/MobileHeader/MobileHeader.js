import React, { useState } from "react";
import "./MobileHeader.css";

import { Link } from "react-router-dom";

import Sidebar from "@components/Sidebar/Sidebar";

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
                                <Link to="/">
                                    <i
                                        className="fa fa-home"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/account">
                                    <i
                                        className="fa fa-user"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <i
                                        className="fa fa-shopping-cart"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </li>

                            <span
                                className="navIcon  hover-effect-sets"
                                onClick={() => {
                                    toggleSidebar();
                                }}
                            >
                                <i
                                    className="fa fa-bars fa-icon-cart"
                                    aria-hidden="true"
                                >
                                    {isSideMenu ? (
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                                    ) : (
                                        <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                                    )}
                                </i>
                                <Sidebar
                                    openState={isSideMenu}
                                    toggleSidebar={toggleSidebar}
                                />
                            </span>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default MobileHeader;
