import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getShippingAddressApi } from "@api/checkout";
import { fetchStates } from "@store/states/statesThunks";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetailsForm from "./ShippingDetailsForm";
import ShippingButton from "./ShippingButton";

import "./ShippingDetails.css";

export default function ShippingDetails({ handleClick }) {
    const [newAddress, setNewAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    const buttonClickHandler = (e) => handleClick(e, true);
    const dispatch = useDispatch();

    useEffect(() => {
        getAdresses();
        dispatch(fetchStates());
    }, []);

    const getAdresses = async () => {
        setLoading(true);
        try {
            const response = await getShippingAddressApi();
            const address = response.data;
            if (address) setShippingAddress(address);
            else {
                toggleAccordion();
                setNewAddress(true);
            }
        } catch (error) {}
        setLoading(false);
    };

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
