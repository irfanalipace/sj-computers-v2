import React from "react";
import { Link } from "react-router-dom";
import './PolicyComponets.css'
import policyimage from "@images/Policy/polict-cart-comp.png";
import Header from "@components/Header/Header";

const PolicyComponets = () => {
    return (
       <div>
{/* <Header /> */}
<div className="policy-background-color">
            <div className="row">
                <div >
                    <header className="topBar px-3 policy-header-topbar">
                        <div className="topBar-inner-policy">
                            <div className="menuBar-policy" >
                            

                                <ul className="text-decoration-none policy-menu-item-list">
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                           About Us
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                         What We Do?
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                           Return & Refund
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            Shipping Policy
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                          Terms of Services
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                          Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                         Subscribe
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
           <div className="policyset-container-dev">
           <div className="">
                
                
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-8 text-color-all-text">
                    <span className="privacy-policy-text-dev">Privacy Policy</span>
                    <div className="cart-dev-policy-section">
                    <div className="card-policy-coponents">
                        <img src={policyimage} alt='' />
                      <div className="text-span-policy-dev">
                        <span className='text-color-all-text-span'>  Want to check the status of your order? Go to Your Orders to find tracking information and order details</span>
                        <div className="order-button-policy">
                        <button className="policy-card-order-button">Order</button>
                        </div>
                      </div>
                     
                    </div>
                    </div>
                   
                        </div>
                    <div className="col-lg-8 col-md-10 col-sm-12 text-color-all-text text-dev-section-dev" >
                        <div>
                        <p  className="data-ul-list-itel-paragraph" style={{color:'white'}}>Items shipped from sjcomputers.us, including SJ Computers Warehouse, can be returned within 30 days of delivery, with some exceptions</p>
                            <ul className="policy-item-data">
                              
                       
                            <li>
                            For more information about returning to third-party sellers. For products purchased from the SJ Computers Global Store,aken Returns. 
                            </li>
                            <li>
                            For more information about returning. For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            <li>
                          For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            </ul>
                            <div className="margin-text-policy-text">
                                <span className="conditional-granti">Unconditional Satisfaction Guarantee</span>
                                <div style={{paddingTop:'12px'}}>
                                    <span className="conditional-granti-text">If you're not completely satisfied with these brands at any time, we are happy to give you a full refund: Buttoned Down Core 10 Moon and Back Obsidian</span>
                           
                                </div>
                                <div>
                                <ul className="policy-items-cart-sction2-dev">
                                    <li className="line-height-dev-ul">Buttoned Down</li>
                                    <li className="line-height-dev-ul">Core 10</li>
                                    <li className="line-height-dev-ul">Moon and Back</li>
                                    <li className="line-height-dev-ul">Obsidian</li>
                                    </ul>
                                    </div>
                            </div>
   

                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
       </div>
    );
};

export default PolicyComponets;
