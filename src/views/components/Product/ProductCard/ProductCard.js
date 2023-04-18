import React from "react";
import "./ProductCard.css";
import imges from "@images/bottom-arrow.png";
import imges1 from "@images/cart-product/location.png";
export const ProductCard = () => {
    return (
        <div>
            <div class="card-section-left">
                <div className="row">
                    <div className="col-md-12 color-text">
                        <sup className="$-color">$</sup> 550<sup>99</sup>
                    </div>
                </div>
                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            Lorem Ipsum is simply dummy text of the printing.
                            <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button>
                        </p>
                    </div>
                </div>
                <div>
                    <span className="color-card">
                        <img src={imges1} /> Deliver to John - USA,12345
                    </span>
                </div>

                <span className="color-card">In Stoke</span>
                <div>
                    <select className="selectpicker selectbutton-option-button">
                        <option>Qty: 1</option>
                        <option>Ketchup</option>
                        <option>Relish</option>
                    </select>
                </div>


                <div className="button-cart-sell">
                <button className="button1"><span className="button-text-button">Add to Cart</span></button>  
                </div>
                <div className="button-cart-sell">
                <button className="button2"><span className="button-text-button">Buy Now</span></button>
                </div>
               
            </div>
        </div>
    );
};
