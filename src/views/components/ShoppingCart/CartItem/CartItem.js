import ssd from "@images/shipping-cart/ssd-pannel.png";

import "./CartItem.css";

export const CartItem = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <img src={ssd} alt="" className="ssd-image" />
                </div>
                <div className="col-md-10">
                    <div className="row mx-0">
                        <div className="items-card-data">
                            <div className="col-md-10">
                                <p>
                                    <strong className="item-details">
                                        SAMSUNG 980 PRO SSD 2TB PCIe NVMe Gen 4
                                        Gaming M.2 Internal Control, MZ-V8P2T0B
                                    </strong>
                                </p>
                                <ul className="item-list">
                                    <li>
                                        <span className="item-stock">
                                            In Stock
                                        </span>
                                    </li>
                                    <li>Discount Available</li>
                                    <li>
                                        <span className="item-capacity">
                                            Capacity:
                                        </span>{" "}
                                        <span clasName="item-capacity1">
                                            2TB
                                        </span>
                                    </li>
                                    <li>
                                        <span className="item-capacity">
                                            Style:
                                        </span>{" "}
                                        <span clasName="item-style1">
                                            980 PRO
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-2 price-item">
                                <p>
                                    <strong className="">$120.50</strong>
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                maxWidth: "700px",
                            }}
                        >
                            <select className="selectpicker selectbutton-option">
                                <option>Qty: 1</option>
                                <option>Ketchup</option>
                                <option>Relish</option>
                            </select>

                            <button className="button-link">Delete</button>
                            <button className="button-link">
                                Save for later
                            </button>
                            <button className="button-link">
                                Compare with similer item
                            </button>
                            <button className="button-link">Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
