import React from "react";
import Cart from "./Cart";
import ssd from "@images/shipping-cart/ssd-pannel.png";
import "./ShopingCart1.css";
import { Link } from "react-router-dom";
export const ShopingCart1 = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div class="card">
                        <div className="row">
                            <div>
                                {" "}
                                <h3 className="shopping-heading">
                                    Shopping Cart
                                </h3>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-2">
                                <img src={ssd} alt="" className="ssd-image" />
                            </div>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-md-10">
                                        <p>
                                            <strong className="item-details">
                                                SAMSUNG 980 PRO SSD 2TB PCIe
                                                NVMe Gen 4 Gaming M.2 Internal
                                                Control, MZ-V8P2T0B
                                            </strong>
                                            
                                        </p>
                                        <ul className="item-list">
                                        <li><span className="item-stock">In Stock</span></li>
                                            <li>Discount Available</li>
                                            <li><span className="item-capacity">Capacity:</span> <span clasName="item-capacity1">2TB</span></li>
                                            <li><span className="item-capacity">Style:</span> <span clasName="item-style1">980 PRO</span></li>
                                         
                                        </ul>
                                    </div>
                                    <div className="col-md-2">
                                        <p>
                                            <strong className="price-item">
                                                $120.50
                                            </strong>
                                        </p>
                                    </div>
                                    <div>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-secondary active">
    <input type="radio" name="options" id="option1" autocomplete="off" checked /> Option 1
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option2" autocomplete="off" /> Option 2
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option3" autocomplete="off" /> Option 3
  </label>
</div>


                                    <button class="button-link">Delete</button>
                                    <button class="button-link">Save for later</button>
                                    <button class="button-link">Compare with similer item</button>
                                    <button class="button-link">Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                    </div>
                </div>
                <div className="col-md-2">
                    <p>sub detail</p>
                </div>
            </div>
        </div>
    );
};
