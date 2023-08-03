import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import policyimage from "@images/Policy/polict-cart-comp.png";
import TopBar from '../TopBar/TopBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import meetingimage from "@images/blog/meeting.png";
import smimage from "@images/blog/smallimage.png";
import meetingset from "@images/blog/meeting2image.png";
import meetingset1 from "@images/blog/videoimagemeeting1.png";
import whoareimage from "@images/blog/whoarewe.png";
import meetingset3 from "@images/blog/videoimagemeeting3.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const HeadereLinks = [
    { path: "/", title: "About Us" },
    { path: "/", title: "What We Do?" },
    { path: "/term_services", title: "Return & Refund" },
    { path: "/term_services", title: "Shipping Policy" },
    { path: "/term_services", title: "Terms of Services" },
    { path: "/term_services", title: "Privacy Policy" },
    { path: "/", title: "Subscribe" },
];


const About = () => {

  
  return (
    <div>
                        {/* <>
                        <div className="">
                            <div className="row">
                                <div>
                                    <header className="topBar px-3 policy-header-topbar">
                                        <div className="topBar-inner-policy">
                                            <div className="menuBar-policy">
                                                <ul className="text-decoration-none policy-menu-item-list">
                                                    {HeadereLinks.map((link, index) => (
                                                        <li
                                                            className="policy-listitem"
                                                            key={index}
                                                        >
                                                            <Link
                                                                to={link.path}
                                                                className="text-decoration-none text-color hover-effect-sets-topbar hover-text-color-policy-comp"
                                                            >
                                                                {link.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                            </div>
                            <div className="blog-background-color">
                                <div className="container my-text-container-about-us-page">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="who-we-are-blog">
                                               <span>Who We Are</span>
                                            </div>
                                          
                                        </div>
                                        <div className="col-md-10">
                                          
                                            <div className="blog-with-content-set-with-image">
                                                <span>
                                                Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi.Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi.Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. 
                                                </span>
                                            </div>
                                          
                                        </div>
                                    </div>
                                    <div className="container cart-about-ul-components-dev-section">
                                     <div className="row">
                                       <div className="col-md-6 col-lg-3 col-6">
                                         <div className="div-container-font-alignment-box-cart">
                                        <div className='div-container-font-alignment-box-cart-text'>
                                        <span>Leadership Principle</span>
                                       
                                        </div>
                                        <div className="dev-space-text-area-data-scrool-card">
                                        <span >Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one c.</span>
                                        </div>
                                        <div className="dev-button-learn-more-data-card hover-effect-card-button-blogs">
                                        <button >Learn <small className="fa-decoration-span-arrow-dev-card">more</small> {' '} {' '}<i className="fas fa-arrow-right fa-0x"></i>
                                    </button>
                                        </div>
                                         </div>
                                       </div>
                                       <div className="col-md-6 col-lg-3 col-6">
                                         <div className="div-container-font-alignment-box-cart">
                                        <div className='div-container-font-alignment-box-cart-text'>
                                        <span >Leadership Principle</span>
                                       
                                        </div>
                                        <div className="dev-space-text-area-data-scrool-card">
                                        <span >Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one c.</span>
                                        </div>
                                        <div className="dev-button-learn-more-data-card hover-effect-card-button-blogs">
                                        <button >Learn <small className="fa-decoration-span-arrow-dev-card">more</small> {' '} {' '}<i className="fas fa-arrow-right fa-0x"></i>
                                    </button>
                                        </div>
                                         </div>
                                       </div>
                                       <div className="col-md-6 col-lg-3 col-6">
                                         <div className="div-container-font-alignment-box-cart">
                                        <div className='div-container-font-alignment-box-cart-text'>
                                        <span >Leadership Principle</span>
                                       
                                        </div>
                                        <div className="dev-space-text-area-data-scrool-card">
                                        <span >Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one c.</span>
                                        </div>
                                        <div className="dev-button-learn-more-data-card hover-effect-card-button-blogs">
                                        <button >Learn <small className="fa-decoration-span-arrow-dev-card">more</small> {' '} {' '}<i className="fas fa-arrow-right fa-0x"></i>
                                    </button>
                                        </div>
                                         </div>
                                       </div>
                                       <div className="col-md-6 col-lg-3 col-6">
                                         <div className="div-container-font-alignment-box-cart">
                                        <div className='div-container-font-alignment-box-cart-text'>
                                        <span >Leadership Principle</span>
                                       
                                        </div>
                                        <div className="dev-space-text-area-data-scrool-card">
                                        <span >Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one c.</span>
                                        </div>
                                        <div className="dev-button-learn-more-data-card hover-effect-card-button-blogs">
                                        <button >Learn <small className="fa-decoration-span-arrow-dev-card">more</small> {' '} {' '}<i className="fas fa-arrow-right fa-0x"></i>
                                    </button>
                                        </div>
                                         </div>
                                       </div>
                                     </div>
                                    </div>
                                </div>
        
                            </div>
                            <div className="container image-cainter-dev">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="background-image-lin-dve">
                                            <img src={whoareimage} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container dev-container-side">
                                <div className="row">
                                  
                                    <div className="col-md-4 col-sm-12">
                               
                                        <div className="about-us-page-after-image-data">
                                            <span>Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one consectetur jsjshdi. Lorem ipsum dolor sit amet, trt aksdg asking no one consectetur asking no one c.</span>
                                        </div>
                        
                                    </div>
                                </div>
                                <div className="row">
                            <div className="col-10">
                                <div className="position-image-data-blog blog-about-position-image-data-footer">
                                    <img src={meetingset} />
                                </div>
                            </div>
        
                            <div className="col-2">
                                <div className="position-image-data-blog-text-data">
                                    <div className="dev-green-space-dev">
                                        <span>
                                            Lorem ipsum dolor sit amet, trt Lorem ipsum
                                            dolor sit amet, trt
                                        </span>
                                    </div>
                                    <div className="space-green-card-data">
                                        Lorem ipsum dolor sit amet, trt aksdg asking no
                                        one consectetur asking no one consectetur
                                        jsjshdi. Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one c.
                                    </div>
                                    <div className="learn-more-blog-button">
                                      <button >Learn <small>more</small> {' '} {' '}<i className="fas fa-arrow-right fa-0x"></i>
        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                          
                        </div>
                    
                       
                    </> */}

        
    </div>
  )
}

export default About