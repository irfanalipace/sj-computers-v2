import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetailsForm from "./ShippingDetailsForm";
import ShippingButton from "./ShippingButton";

import "./ShippingDetails.css";

export default function ShippingDetails({
    toggleAccordion,
    handleHeight,
    shippingAddress,
}) {
    const [newAddress, setNewAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const loading = useSelector((state) => state.orders.isLoading);

    const buttonClickHandler = (e) => toggleAccordion(e, true);
    const dispatch = useDispatch();

    const hideForm = () => {
        setNewAddress(false);
        setEditAddress(false);
    };

    useEffect(() => {
        dispatch(fetchStates());
        handleHeight();
        return () => {
            hideForm();
        };
    }, []);

    const ShippingFormWrapper = () => {
        if (newAddress)
            return (
                <ShippingDetailsForm
                    handleHeight={handleHeight}
                    hideForm={hideForm}
                />
            );
        else
            return (
                <ShippingDetailsForm
                    address={shippingAddress}
                    handleHeight={handleHeight}
                    hideForm={hideForm}
                />
            );
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {newAddress || editAddress || !shippingAddress.address ? (
                        <ShippingFormWrapper />
                    ) : (
                        <div>
                            <h3 className="accordion-content-heading">
                                Your Address
                            </h3>
                            <div className="address-list">
                                <div className="address">
                                    {/* <input
                                        type="radio"
                                        id="address_id"
                                        name="selectedAddress"
                                        value="address_id"
                                        onChange={handleChange}
                                        defaultChecked={true}
                                    /> */}
                                    <div>
                                        <label htmlFor="address_id">
                                            {shippingAddress?.full_name}{" "}
                                            {shippingAddress?.address}{" "}
                                            {shippingAddress?.city}{" "}
                                            {shippingAddress?.zip_code}{" "}
                                        </label>
                                        <div className="address-container">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditAddress(true)
                                                }
                                            >
                                                Edit Address
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="new-address"
                                    onClick={() => setNewAddress(true)}
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
