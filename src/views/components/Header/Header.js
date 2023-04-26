import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {CartOverLay }from './CartOverLay/CartOverLay'
import footerlogo from "@images/header-logo.png";
import english from "@images/home/eng.png";
import vectorcart from "@images/home/vector.png";
import reaxtimg from "@images/rext.png";
import vectorimg from "@images/setr.png";
import "./Header.css";
import { Modal } from "react-bootstrap";
import LocationModel from "./Location/LocationModel";
import LoginCart from "./LoginCart";
import Search from "./Search";
const Header = () => {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const currentState = useSelector((state) => state.states.currentState);
    const states = useSelector((state) => state.states.states);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [country, setCountry] = useState(false);
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

    useEffect(() => {
        let countryName = states.filter(
            (state) => state.id === currentState.id
        );

        setCountry(countryName[0]?.name);
    }, [currentState]);


    return (
        <>
            {!nonHeaderRoutes.includes(location.pathname.split("/")[1]) && (
                <header className="navbar navbar-expand-lg header-background px-3">
                    <a className="navbar-brand" href="#">
                        <img src={footerlogo} alt="" className="homepage-img" />
                    </a>
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
                                <span className="deliver-text">Deliver to</span>
                             <span> {country ? country : "California"}</span>  
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
                            
                            <button className="icon-cart me-2 " onClick={() => setSmShow(true)}>
                           
                                 
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
                                
                            </button>
                            
                        </div>
                    </div>
                </header>
            )}

           <div className="" >
            <Modal 
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className="box-cart box-overlay"
               
            >
                <Modal.Header closeButton style={{borderBottom: 0}}>
                </Modal.Header>
              
                <Modal.Body className="body-cart">
                <div className="mein-cotain">
                        <div className="row ">
                        <div className="dev">
                        <div className="not-add">
                            <span><img src={vectorimg} />  Not Added</span>
                        </div>
                        <div className="cart-dev-section">
                            <span className="cart-item">Cart Subtotal</span><span className="items-no"> ( 1 item ):</span>
                        </div>
                        </div>
                        </div>
                        <div className="row ">
                        <div className="img-dev">
                        <div className="">
                        <img src={reaxtimg} alt=""/>
                        </div>
                        <div>
                           <button className="cart-button">Cart</button>
                        </div>
                        <div>
                        <button className="checkout-proced">Proceed to checkout (item)</button>
                        </div>
                      
                        </div>
                        </div>
                    </div>
                </Modal.Body>
              
            </Modal>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body><img src={reaxtimg}/></Modal.Body>
            </Modal>
            </div>
        </>
    );
};

export default Header;
