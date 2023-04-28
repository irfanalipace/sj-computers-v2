import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetailsForm from "./ShippingDetailsForm";
import ShippingButton from "./ShippingButton";

import "./ShippingDetails.css";

export default function ShippingDetails({ handleClick }) {
    const [newAddress, setNewAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const loading = useSelector((state) => state.orders.isLoading);
    const shippingAddress = useSelector(
        (state) => state.orders.shippingDetails
    );

    const buttonClickHandler = (e) => handleClick(e, true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStates());
    }, []);

    useEffect(() => {
        toggleAccordion();
    }, [loading]);

    useEffect(() => {
        if (shippingAddress) {
            setNewAddress(false);
            setEditAddress(false);
        }
    }, [shippingAddress]);

    const toggleAccordion = () => {
        handleClick();
        setTimeout(() => {
            handleClick();
        });
    };

    const ShippingFormWrapper = () => {
        if (newAddress)
            return <ShippingDetailsForm handleClick={handleClick} />;
        else
            return (
                <ShippingDetailsForm
                    address={shippingAddress}
                    handleClick={handleClick}
                />
            );
    };

    return (
        <div>
            {newAddress || editAddress ? (
                <ShippingFormWrapper />
            ) : (
                <>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            <h3 className="accordion-content-heading">
                                Your Address
                            </h3>
                            <div className="address-list">
                                <div className="address">
                                    <input
                                        type="radio"
                                        id="address2"
                                        name="selectedAddress"
                                        value="Address 2"
                                        defaultChecked
                                    />
                                    <div>
                                        <label htmlFor="address2">
                                            {shippingAddress?.full_name}{" "}
                                            {shippingAddress?.address}{" "}
                                            {shippingAddress?.city}{" "}
                                            {shippingAddress?.zip_code}{" "}
                                        </label>
                                        <div className="address-container">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditAddress(true);
                                                    toggleAccordion();
                                                }}
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
                                        toggleAccordion();
                                    }}
                                >
                                    <i className="fa fa-add"></i>Add a new
                                    address
                                </button>
                            </div>
                            <div>
                                <ShippingButton
                                    handleClick={buttonClickHandler}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
