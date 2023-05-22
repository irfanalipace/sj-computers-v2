import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import footer from "@images/header-logo.png";
import vectorimg from "@images/common/boll.png";
import copyrightimg from "@images/common/copywrite.png";
import img1 from "@images/footer/setting.png";
import BackToTopButton from "./BackToTopButton";

import "./Footer.css";

const Footer = () => {
    const location = useLocation();
    const authRoutes = [
        "login",
        "register",
        "forgot_password",
        "forget-password",
        "email-sent",
        "checkout",
    ];

    return (
        <>
            {!authRoutes.includes(location.pathname) && (
                <div className="footer">
                    <div
                        className="footer-copyright text-center py-3 back-to-top-hover-effct"
                        style={{ backgroundColor: "#002549" }}
                    >
                        <h4 style={{ color: "white" }}>
                            <BackToTopButton />
                        </h4>
                    </div>
                    <footer className="page-footer font-small blue pt-4 footer-section">
                        <div className="container text-center text-md-center footer-data">
                            <div className="row">
                                <div className="col-md-3 mb-md-0 mb-3 footer-text-line-font-size">
                                    <ul className="list-unstyle1">
                                        <h6 className="text-uppercase herf-link font-style-heading-footer">
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
                                            <Link
                                                to="/contact"
                                                href="#!"
                                                className="herf-link text-decoration-none"
                                            >
                                                Contact Us
                                            </Link>
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

                                <div className="col-md-3 mb-md-0 mb-3 footer-text-line-font-size">
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyle2">
                                        <h6 className="text-uppercase herf-link font-style-heading-footer">
                                            Connect With Us
                                        </h6>
                                        <li>
                                            <a
                                                href="#"
                                                className="herf-link text-decoration-none"
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="herf-link text-decoration-none"
                                            >
                                                Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="herf-link text-decoration-none"
                                            >
                                                Instagram
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="herf-link text-decoration-none"
                                            >
                                                Youtube
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 mb-md-0 mb-3 footer-text-line-font-size">
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyle3">
                                        <h6 className="text-uppercase herf-link font-style-heading-footer">
                                            Let Us Help You
                                        </h6>
                                        <li>
                                            <Link
                                                to="/account"
                                                className="herf-link text-decoration-none"
                                            >
                                                Your Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/return_refund_policy"
                                                className="herf-link text-decoration-none"
                                            >
                                                Return And refund Policies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/shipping_policy"
                                                className="herf-link text-decoration-none"
                                            >
                                                Shipping Policies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/term_services"
                                                className="herf-link text-decoration-none"
                                            >
                                                Terms of Services
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/privacy_policy"
                                                className="herf-link text-decoration-none"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3 mb-md-0 mb-3 footer-text-line-font-size">
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyle4">
                                        <h6 className="text-uppercase herf-link font-style-heading-footer">
                                            Reach Us
                                        </h6>
                                        <p className="text-uppercase herf-link">
                                            2817 Eagandale Blvd Eagan, MN 55121.
                                        </p>
                                        <p className="herf-link ">
                                            952-452-8884
                                        </p>
                                        <li>
                                            <a
                                                href="mailto:cs@sjcomputersmn.com"
                                                className="herf-link text-decoration-none"
                                            >
                                                cs@sjcomputersmn.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="hr-line"></hr>
                        <div className="footer-copyright text-center py-3">
                            <img
                                src={footer}
                                alt=""
                                style={{ paddingRight: "105px" }}
                                className="footer-copywrite-images"
                            />

                            <button
                                className="btn btn-secondary dropdown-toggle language-dropdown"
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
                                />
                                English
                                <img
                                    src={img1}
                                    style={{ marginLeft: "10px" }}
                                />
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <a className="dropdown-item" href="#">
                                    span
                                </a>
                                <a className="dropdown-item" href="#">
                                    UK
                                </a>
                            </div>
                        </div>
                        <div className="footer-copyright text-center py-3">
                            <img
                                src={copyrightimg}
                                alt=""
                                className="copywriten"
                            />
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};
export default Footer;
