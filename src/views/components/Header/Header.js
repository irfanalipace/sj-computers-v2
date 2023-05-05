import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

import CartOverlay from "./CartOverlay";
import LocationModel from "./Location/LocationModel";
import LoginCart from "./LoginCart";
import Search from "./Search";
import MobileHeader from "./MobileHeader/MobileHeader";
import MobileSearch from "./MobileSearch/MobileSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import footerlogo from "@images/header-logo.png";
import english from "@images/home/eng.png";
import vectorcart from "@images/home/vector.png";
import "./Header.css";

const Header = () => {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const currentState = useSelector((state) => state.states.currentState);
    const states = useSelector((state) => state.states.states);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartDetails = useSelector((state) => state.cart.details);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const location = useLocation();
    const nonHeaderRoutes = [
        "login",
        "register",
        "forgot_password",
        "forget-password",
        "email-sent",
        "checkout",
    ];
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const [isOpen, setIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    return (
        <>
            {screenWidth <= 750 ? (
                <div>
                    <MobileHeader />

                    <MobileSearch />

                    {/* components to render when screen width is less than or equal to 750px */}
                </div>
            ) : (
                <div>
                    {!nonHeaderRoutes.includes(
                        location.pathname.split("/")[1]
                    ) && (
                        <header className="navbar navbar-expand-lg header-background px-3">
                            <Link className="navbar-brand" to="/">
                                <img
                                    src={footerlogo}
                                    alt=""
                                    className="homepage-img hover-effect-sets"
                                />
                            </Link>
                            <div className="d-flex flex-row align-items-center main-nav">
                                <div className="d-flex align-items-center justify-content-center flex-wrap header-position ">
                                    <div className="hover-effect-sets">  
                                         <Button
                                        className="dliver-set "
                                        variant="primary"
                                        onClick={handleShow}
                                        style={{
                                            background: "#00305E",
                                            border: "#00305E",
                                        }}
                                    >
                                        
                                        <span className="deliver-text ">
                                            Deliver to
                                        {" "}
                                        </span>
                                        <br></br>
                                     
                                        {currentState?.name
                                            ? currentState?.name
                                            : "Select Location"}
                                       
                                    </Button>
                                    </div>
                                  
                                </div>
                                {show && (
                                    <LocationModel
                                        isOpen={show}
                                        handleClose={() => setShow(false)}
                                    />
                                )}
                                <div className="input-group search-inputgroup">
                                    <div className="input-group-btn search-panel">
                                        <Search />
                                    </div>
                                    <input
                                        type="hidden"
                                        name="search_param"
                                        value="all"
                                        id="search_param"
                                    />
                                    <input
                                        type="text"
                                        className="form-control search-input-type"
                                        name="x"
                                        id="search"
                                        placeholder="Search"
                                    />
                                    <span className="input-group-btn">
                                        <button
                                            type="button"
                                            className="btn btn-success search-logo"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                size="1x"
                                                className="search-button-header-icon"
                                            />
                                        </button>
                                    </span>
                                </div>

                                <div className="nav-right">
                                    <div className="dropdown">
                                     <div className="hover-effect-sets ">
                                     <button
                                            className="dropdown-toggle eng-button"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="false"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={english}
                                                alt="English Flag"
                                            />{" "}
                                            EN
                                        </button>
                                     </div>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                English
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Spanish
                                            </a>
                                        </div>
                                    </div>

                                    <div className="dropdown-cart ">
                                        {isAuthenticated ? (
                                            <div >
                                                <p className="mb-0 text-white check-auth">
                                                    Hello {user?.name}
                                                </p>
                                            </div>
                                        ) : (
                                            <LoginCart className="card" />
                                        )}
                                    </div>
                                    <div className="return-button ">
                                    <div className="hover-effect-sets">
                                        <button
                                            className="order-button dropdown-toggle "
                                            type="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                           
                                            Return <br></br>& Order
                                          
                                            
                                        </button>
                                        </div>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Return
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Order
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        className="icon-cart me-2 icon-cart-effect-hover "
                                        onClick={toggleSidebar}
                                    >
                                        <div className="product-boll hover-effect-sets">
                                            <div
                                                className="dropdown dot"
                                                style={{
                                                    textAlign: "center",
                                                    color: "white",
                                                }}
                                            >
                                                {cartDetails.total_items}
                                                <img
                                                    src={vectorcart}
                                                    alt=""
                                                    className="vector-cart"
                                                />
                                            </div>
                                            <span className="cart-text">
                                                Cart
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </header>
                    )}

                    {/* CartOverLay code */}
                    <CartOverlay
                        isOpen={isOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    {/* components to render when screen width is greater than 750px */}
                </div>
            )}
        </>
    );
};

export default Header;
