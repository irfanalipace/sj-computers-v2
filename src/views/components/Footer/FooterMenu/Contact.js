import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import contact from "@images/footer/footer-links/contact-image.png";
import { Link } from "react-router-dom";
import "./Contact.css";
const Contact = () => {
    return (
        <div>
            <div className="contact-header">
          <div className="my-contact-menu">
          <nav className="navbar navbar-expand-lg nav-contact-background-color">
      <div className="container">
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
                
              <Link className="nav-link text-aligin-contact-menu link-no-hover" to="/home">
               <span>Contact us</span> 
              </Link>
            </li>
            <li className="nav-item">
                
                <Link className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line" to="/home">
                  Home
                </Link>
              </li>
          </ul>
        </div>
        <div className="navbar-collapse justify-content-end ">
          <ul className="navbar-nav">
          
            <li className="nav-item">
              <Link className="nav-link text-aligin-contact-menu link-no-hover" to="mailto:info@sjcomputer.com">
                <FontAwesomeIcon icon={faEnvelope} />{' '} {' '} info@sjcomputer.com
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line" to="tel:+9212345678">
                <FontAwesomeIcon icon={faMobile} /> {' '} +92-12345678
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
                                    Welcome to SJ Computer Customer Service,
                                    John
                                </h4>
                                <h6 className="contact-text-home2">
                                    What would you like help with today? You can
                                    quickly take care of most things here, or
                                    connect with us when needed.
                                </h6>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
             

                <div class="container image-cotact-container">
                    <h4 className="contact-heading-text-with-image">Contact Us</h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <img src={contact} className="img-fluid-contact" alt="Image" />
                        </div>
                        <div class="col-lg-6">
                            <form>
                                <h5 className="this-form-heading-contact">
                                    leave a message
                                </h5>
                                <p className="pa-form-heading-contact">
                                    Write to us if you have any questions, we
                                    will <br></br>definitely contact you and find a
                                    solution.
                                </p>
                                <div className="form-group text-group-input-contact">
                                    <input
                                        type="text"
                                        className="form-control contact-field"
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="form-group text-group-input-contact">
                                    <input
                                        type="email"
                                        className="form-control contact-field"
                                        id="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="form-group text-group-input-contact">
                                    <textarea
                                        className="form-control contact-field  contact-field-commits"
                                        id="comments"
                                        rows="5"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="contact-button"
                                >
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
