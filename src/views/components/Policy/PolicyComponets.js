import React from "react";
import { Link } from "react-router-dom";
import './PolicyComponets.css'
import policyimage from "@images/Policy/polict-cart-comp.png";
const PolicyComponets = () => {
    return (
        <div className="policy-background-color">
            <div className="row">
                <div className="col-12">
                    <header className="topBar px-3">
                        <div className="topBar-inner-policy" style={{paddingTop:'19px'}}>
                            <div className="menuBar">
                            

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
           <div className="container">
                
                
                <div className="row">
                    <div className="col-3 text-color-all-text">
                    <span className="privacy-policy-text-dev">Privacy Policy</span>
                    <div className="cart-dev-policy-section">
                    <div className="card-policy-coponents">
                        <img src={policyimage} alt='' />
                      <div className="text-span-policy-dev">
                        <span className='text-color-all-text-span'>  Want to check the status of your order? Go to Your Orders to find tracking information and order details</span>
                        <div style={{paddingTop:'32px'}}>
                        <button className="policy-card-order-button">Click</button>
                        </div>
                      </div>
                     
                    </div>
                    </div>
                   
                        </div>
                    <div className="col-9 text-color-all-text">
                        <div>
                        <p  className="data-ul-list-itel-paragraph" style={{color:'white'}}>Items shipped from sjcomputers.us, including SJ Computers Warehouse, can be returned within 30 days of delivery, with some exceptions</p>
                            <ul className="policy-item-data">
                              
                       
                            <li>
                            For more information about returning to third-party sellers. For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            <li>
                            For more information about returning. For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            <li>
                          For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            </ul>
                            <div>
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
                            {/* <div className="dialog-box-policy-page" style={{background:'red'}}>
  <div className="modal" tabindex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">yes</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">no</button>
        </div>
      </div>
    </div>
  </div>
</div> */}

                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default PolicyComponets;
