import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import CartOverlay from "./CartOverlay";
import LocationModel from "./Location/LocationModel";
import LoginCart from "./LoginCart";
import Search from "./Search";
import MobileHeader from "./MobileHeader/MobileHeader";
import MobileSearch from "./MobileSearch/MobileSearch";
import TopBar from "@components/TopBar/TopBar";
import footerlogo from "@images/header-logo.png";
import english from "@images/home/eng.png";
import vectorcart from "@images/home/vector.png";
import "./Header.css";

const Header = () => {
    const currentState = useSelector((state) => state.states.currentState);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartDetails = useSelector((state) => state.cart.details);

    const firstLogin = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();
    firstLogin.current = searchParams.get("firstLogin");

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const location = useLocation();
    const ThankyouPage = location.pathname === "/thank-you";
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

    useEffect(() => {
        firstLogin.current && !currentState && setShow(true);
        searchParams.delete("firstLogin");
        setSearchParams(searchParams);
    }, [firstLogin.current, currentState]);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    return (
        <>
            {screenWidth <= 889 ? (
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
                        <>
                            <header className="navbar navbar-expand-lg header-background px-3">
                                <div
                                    className={`header-container ${
                                        ThankyouPage ? "header-thank-you" : ""
                                    }`}
                                >
                                    <Link
                                        className="navbar-brand me-xl-2 me-0"
                                        to="/"
                                    >
                                        <img
                                            src={footerlogo}
                                            alt=""
                                            className="homepage-img hover-effect-sets"
                                        />
                                    </Link>
                                    {!ThankyouPage && (
                                        <>
                                            <div className="d-flex flex-row align-items-center main-nav">
                                                <div className="d-flex align-items-center justify-content-center flex-wrap header-position ">
                                                    <div className="hover-effect-sets">
                                                        <Button
                                                            className="dliver-set "
                                                            variant="primary"
                                                            onClick={handleShow}
                                                            style={{
                                                                background:
                                                                    "#00305E",
                                                                border: "#00305E",
                                                                fontSize:
                                                                    "12px",
                                                                padding: "2px",
                                                                textAlign:
                                                                    "left",
                                                            }}
                                                        >
                                                            <span className="deliver-text ">
                                                                Deliver to{" "}
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
                                                        handleClose={() =>
                                                            setShow(false)
                                                        }
                                                    />
                                                )}
                                                <Search />

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
                                                                    src={
                                                                        english
                                                                    }
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
                                                            <div>
                                                                <p className="mb-0 text-white check-auth">
                                                                    Hello{" "}
                                                                    {user?.name}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <LoginCart className="card" />
                                                        )}
                                                    </div>
                                                    <div className="return-button ">
                                                        <div className="hover-effect-sets">
                                                            <Link
                                                                to={
                                                                    "account/orders"
                                                                }
                                                                className="order-button dropdown-toggle "
                                                                type="button"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                Return <br></br>
                                                                & Order
                                                            </Link>
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
                                                    <div className="hover-effect-sets">
                                                        <button
                                                            className="icon-cart me-2 icon-cart-effect-hover icon cart-image-boll-background-image"
                                                            onClick={
                                                                toggleSidebar
                                                            }
                                                        >
                                                            <div className="product-boll ">
                                                                <div
                                                                    className="dropdown dot "
                                                                    style={{
                                                                        position:
                                                                            "relative",
                                                                        display:
                                                                            "inline-block",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            vectorcart
                                                                        }
                                                                        alt=""
                                                                        className="vector-cart"
                                                                        style={{
                                                                            display:
                                                                                "block",
                                                                        }}
                                                                    />
                                                                    <div className="total-items">
                                                                        {
                                                                            cartDetails.total_items
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <span className="cart-text">
                                                                    Cart
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </header>
                            {!ThankyouPage && <TopBar />}
                        </>
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
