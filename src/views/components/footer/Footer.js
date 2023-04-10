import React from "react";
import "./Footer.css";
import footer from "@images/common/header-logo.png";
import vectorimg from "@images/common/boll.png";
import copyrightimg from "@images/common/copywrite.png";
import arrowfun from "@images/common/arrow.png";

const Footer = () => {
    return (
        <div>
            <div
                className="footer-copyright text-center py-3"
                style={{ backgroundColor: "#002549" }}
            >
                <h4 style={{ color: "wheat" }}>
                    Back to top{" "}
                    <img src={arrowfun} alt="" style={{ width: "20px" }} />
                </h4>
            </div>
            <footer className="page-footer font-small blue pt-4 footer-section">
                <div className="container text-center text-md-center footer-data">
                    <div className="row">
                        <div className="col-md-3 mb-md-0 mb-3 ">
                            <ul className="list-unstyle1">
                                <h6 className="text-uppercase herf-link">
                                    Get to Know Us
                                </h6>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Product
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Amazon Science
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Shop
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-md-0 mb-3">
                            {/* <h5 className="text-uppercase">Links</h5> */}
                            <ul className="list-unstyle2">
                                <h6 className="text-uppercase herf-link">
                                    Connect With Us
                                </h6>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Instagram{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Youtube
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-md-0 mb-3">
                            {/* <h5 className="text-uppercase">Links</h5> */}
                            <ul className="list-unstyle3">
                                <h6 className="text-uppercase herf-link">
                                    Let Us Help You
                                </h6>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Your Account
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Return And refund Policies
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Shipping Policies
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Terms of Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 mb-md-0 mb-3">
                            {/* <h5 className="text-uppercase">Links</h5> */}
                            <ul className="list-unstyle4">
                                <h6 className="text-uppercase herf-link">
                                    Reach Us
                                </h6>
                                <p className="text-uppercase herf-link">
                                    {" "}
                                    2817 Eagandale Blvd Eagan, <br></br>MN
                                    55121.
                                </p>
                                {/* <li><a href="#!" className='herf-link text-decoration-none'></a></li> */}
                                <p className="herf-link ">952-452-8884</p>
                                <li>
                                    <a
                                        href="#!"
                                        className="herf-link text-decoration-none"
                                    >
                                        cs@sjcomputersmn.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">
                    <img
                        src={footer}
                        alt=""
                        style={{ paddingRight: "105px" }}
                    />

                    <button
                        class="btn btn-secondary dropdown-toggle"
                        style={{ background: "#00305E" }}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            src={vectorimg}
                            alt=""
                            className="english-dropdown"
                        />{" "}
                        English
                    </button>
                    <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                    >
                        <a class="dropdown-item" href="#">
                            span
                        </a>
                        <a class="dropdown-item" href="#">
                            UK
                        </a>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">
                    <img src={copyrightimg} alt="" className="copywriten" />
                </div>
            </footer>
        </div>
    );
};
export default Footer;
