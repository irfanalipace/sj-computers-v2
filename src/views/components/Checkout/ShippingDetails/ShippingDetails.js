import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "@store/states/statesThunks";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingDetailsForm from "./ShippingDetailsForm";
import ShippingButton from "./ShippingButton";

import "./ShippingDetails.css";

export default function ShippingDetails({ toggleAccordion, handleHeight }) {
    const [newAddress, setNewAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const loading = useSelector((state) => state.orders.isLoading);
    const shippingAddress = useSelector(
        (state) => state.orders.shippingDetails
    );

    const buttonClickHandler = (e) => toggleAccordion(e, true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStates());
    }, []);

    useEffect(() => {
        handleHeight();
    });

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    const ShippingFormWrapper = () => {
        if (newAddress)
            return <ShippingDetailsForm handleHeight={handleHeight} />;
        else
            return (
                <ShippingDetailsForm
                    address={shippingAddress}
                    handleHeight={handleHeight}
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
                                                onClick={() => true}
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
