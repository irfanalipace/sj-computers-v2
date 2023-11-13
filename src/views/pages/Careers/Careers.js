import React from "react";
import "./Careers.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";

function Careers() {
    return (
        <div className="contact-container">
            <div className="contact-header"></div>
            <div>
                <div className="my-contact-menu">
                    <nav className="navbar navbar-expand-lg nav-contact-background-color">
                        <div className="container">
                            <div className="navbar-collapse">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact"
                                            to="/contact"
                                        >
                                            <span>Contact Us</span>
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="navbar-collapse justify-content-end ">
                                <ul className="navbar-nav">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact "
                                            to="mailto: cs@sjcomputersmn.com"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />{" "}
                                            cs@sjcomputersmn.com
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
                                            to="tel: 952-452-8884"
                                        >
                                            <FontAwesomeIcon icon={faMobile} />
                                            952-452-8884
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="home-text-paragraph-contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <div className="p-tages-text-contact">
                                    <h4 className="contact-text-home">
                                        Welcome to SJ Computer Customer Service,{" "}
                                    </h4>
                                    <h6 className="contact-text-home2">
                                        What would you like help with today? You
                                        can quickly take care of most things
                                        here, or connect with us when needed.
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Careers;
