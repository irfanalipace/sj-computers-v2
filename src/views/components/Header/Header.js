import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartOverLay } from "./CartOverLay/CartOverLay";
import footerlogo from "@images/header-logo.png";
import english from "@images/home/eng.png";
import vectorcart from "@images/home/vector.png";
import "./Header.css";

import LocationModel from "./Location/LocationModel";
import LoginCart from "./LoginCart";
import Search from "./Search";
const Header = () => {
    const currentState = useSelector((state) => state.states.currentState);
    const states = useSelector((state) => state.states.states);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

    return (
        <>
            {!nonHeaderRoutes.includes(location.pathname.split("/")[1]) && (
                <header className="navbar navbar-expand-lg header-background px-3">
                    <Link className="navbar-brand" to="/">
                        <img src={footerlogo} alt="" className="homepage-img" />
                    </Link>
                    <div className="d-flex flex-row align-items-center main-nav">
                        <div className="d-flex align-items-center justify-content-center flex-wrap header-position">
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                style={{
                                    background: "#00305E",
                                    border: "#00305E",
                                }}
                            >
                                <p></p>Deliver to <br></br>
                                {currentState?.name
                                    ? currentState?.name
                                    : "Select Location"}
                            </Button>
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
                                className="form-control "
                                name="x"
                                id="search"
                                placeholder="Search"
                            />
                            <span className="input-group-btn">
                                <button
                                    type="button"
                                    className="btn btn-success search-logo"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </span>
                        </div>
                        <div className="nav-right">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle eng-button"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="false"
                                    aria-expanded="false"
                                >
                                    <img src={english} alt="English Flag" /> EN
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="#">
                                        English
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Spanish
                                    </a>
                                </div>
                            </div>

                            <div className="dropdown-cart">
                                {isAuthenticated ? (
                                    <div>
                                        <p className="mb-0 text-white">
                                            Hello, {user?.name}
                                        </p>
                                    </div>
                                ) : (
                                    <LoginCart className="card" />
                                )}
                            </div>
                            <div className="return-button ">
                                <button
                                    className="order-button dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Return <br></br>& Order
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="#">
                                        Return
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Order
                                    </a>
                                </div>
                            </div>

                            <div className="icon-cart">
                                <CartOverLay />

                                <div className="product-boll">
                                    <div
                                        className="dropdown dot"
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                        }}
                                    >
                                        0
                                        <img
                                            src={vectorcart}
                                            alt=""
                                            className="vector-cart"
                                        />
                                    </div>
                                    <span className="cart-text">Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
