import { useEffect, useState } from "react";

import ShippingDetailsForm from "./ShippingDetailsForm";
import ShippingButton from "./ShippingButton";

import "./ShippingDetails.css";

export default function ShippingDetails({ handleClick }) {
    const [newAddress, setNewAddress] = useState(false);

    const buttonClickHandler = (e) => handleClick(e, true);

    return (
        <div>
            {newAddress ? (
                <ShippingDetailsForm handleClick={handleClick} />
            ) : (
                <div>
                    <h3 className="accordion-content-heading">Your Address</h3>
                    <div className="address-list">
                        <div className="address">
                            <input
                                type="radio"
                                id="address1"
                                name="selectedAddress"
                                value="Address 1"
                            />
                            <div>
                                <label htmlFor="address1">
                                    John Adam Eagandale Blvd, Eagan, MN 55121,
                                    USA.(complete address, Zip code etc.)
                                </label>
                                <div className="address-container">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            console.log("edit clicked")
                                        }
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="address">
                            <input
                                type="radio"
                                id="address2"
                                name="selectedAddress"
                                value="Address 2"
                            />
                            <div>
                                <label htmlFor="address2">
                                    John Adam Eagandale Blvd, Eagan, MN 55121,
                                    USA.(complete address, Zip code etc.)
                                </label>
                                <div className="address-container">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            console.log("edit clicked")
                                        }
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="new-address"
                            onClick={() => {
                                setNewAddress(true);
                                handleClick();
                                setTimeout(() => {
                                    handleClick();
                                });
                            }}
                        >
                            <i className="fa fa-add"></i>Add a new address
                        </button>
                    </div>
                    <div>
                        <ShippingButton handleClick={buttonClickHandler} />
                    </div>
                </div>
            )}
        </div>
    );
}
