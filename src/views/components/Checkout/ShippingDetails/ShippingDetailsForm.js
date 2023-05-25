import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setShippingDetails } from "@store/orders/ordersThunk";
import { SET_SHIPPING_DETAILS } from "@store/orders/ordersSlice";
import { useFormValidation } from "@hooks/useFormValidation";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingButton from "./ShippingButton";

function ShippingDetailsForm({ address, handleHeight, hideForm }) {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            country: address?.country || "US",
            full_name: address?.full_name || "",
            phone_number: address?.phone_number || "",
            address: address?.address || "",
            floorAddress: "",
            city: address?.city || "",
            state: address?.state || "Alabama",
            zip_code: address?.zip_code || "",
        },
        {
            fieldLengths: {
                country: { min: 3, max: 50 },
                full_name: { min: 3, max: 100 },
            },
        }
    );

    const states = useSelector((state) => state.states.states);
    const apiError = useSelector((state) => state.orders.apiError);
    const loading = useSelector((state) => state.orders.isLoading);
    const settingAdress = useSelector((state) => state.orders.settingAdress);

    const [fieldErrors, setFieldErrors] = useState({});
    const [permanentAddress, setPermanentAddress] = useState(false);
    const dispatch = useDispatch();

    const handlePermanentAddresses = (e) => {
        setPermanentAddress(e.target.checked);
    };

    useEffect(() => {
        setFieldErrors({ ...errors });
    }, [errors]);

    useEffect(() => {
        setFieldErrors({ ...apiError });
    }, [apiError]);

    const submitShippingDetails = (e) => {
        e.preventDefault();
        let params = { ...values, permanent_address: permanentAddress };
        console.log("params: ", params);
        if (permanentAddress) dispatch(setShippingDetails(params, hideForm));
        else {
            dispatch(SET_SHIPPING_DETAILS(params));
            hideForm();
        }
    };

    useEffect(() => {
        if (typeof cb === "function") handleHeight();
    }, [fieldErrors]);

    useEffect(() => {
        handleHeight();
    }, []);
    return (
        <div>
            {settingAdress ? (
                <Loader />
            ) : (
                <>
                    <h3 className="accordion-content-heading">
                        Add New Address
                    </h3>
                    {/* <div className="autofill-container">
                <div className="d-flex justify-content-between align-items-center">
                    <p>Save time. Autofill your current location.</p>
                    <button className="autofill-btn">Autofill</button>
                </div>
            </div> */}
                    <form
                        className="shipping-form"
                        onSubmit={submitShippingDetails}
                    >
                        <div className="field-section">
                            {/* <label htmlFor={"state"}>
                                Country/State{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="country"
                                name="country"
                                className="input-field"
                                type="text"
                                placeholder="Country/State"
                                value={values?.country}
                                onChange={handleChange}
                            ></input>

                            {fieldErrors.country && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.country}
                                </p>
                            )} */}
                        </div>
                        <div className="field-section">
                            <label htmlFor={"name"}>
                                Full Name (First & Last Name)
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="full_name"
                                name="full_name"
                                className="input-field"
                                type="text"
                                placeholder="Full Name"
                                value={values?.full_name}
                                onChange={handleChange}
                            ></input>
                            {fieldErrors.full_name && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.full_name}
                                </p>
                            )}
                        </div>

                        <div className="field-section">
                            <label htmlFor={"phoneNumber"}>
                                Phone Number
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="phone_number"
                                name="phone_number"
                                className="input-field"
                                type="text"
                                placeholder="Phone Number"
                                value={values?.phone_number}
                                onChange={handleChange}
                            ></input>
                            {fieldErrors.phone_number && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.phone_number}
                                </p>
                            )}
                        </div>
                        <div className="field-section">
                            <label htmlFor={"streetAddress"}>
                                Address
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="address"
                                name="address"
                                className="input-field"
                                type="text"
                                placeholder="Street address (P.O Box)"
                                value={values?.address}
                                onChange={handleChange}
                            ></input>
                            {fieldErrors.address && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.address}
                                </p>
                            )}
                            <br></br>
                            <input
                                id="floorAddress"
                                name="floorAddress"
                                className="input-field mt-1"
                                type="text"
                                placeholder="Unit, building, floor etc."
                                value={values?.floorAddress}
                                onChange={handleChange}
                            ></input>
                            {fieldErrors.floorAddress && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.floorAddress}
                                </p>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="field-section">
                                    <label htmlFor={"city"}>
                                        City
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        className="input-field"
                                        type="text"
                                        placeholder="City"
                                        value={values?.city}
                                        onChange={handleChange}
                                    ></input>
                                    {fieldErrors.city && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {fieldErrors.city}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="field-section">
                                    <label htmlFor={"state"}>
                                        State
                                        <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        className="input-field"
                                        placeholder="Select Stte"
                                        onChange={handleChange}
                                        value={values?.state}
                                    >
                                        {states.map((state) => (
                                            <option
                                                value={state?.name}
                                                key={state?.id}
                                            >
                                                {state?.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldErrors.state && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {fieldErrors.state}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="field-section">
                                    <label htmlFor={"zip_code"}>
                                        {" "}
                                        Zip Code
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="zip_code"
                                        name="zip_code"
                                        className="input-field"
                                        type="text"
                                        placeholder=" ZipCode"
                                        value={values?.zip_code}
                                        onChange={handleChange}
                                    />
                                    {fieldErrors.zip_code && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {fieldErrors.zip_code}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="field-section checkbox-wrapper">
                            <input
                                id="permanent_address"
                                name="permanent_address"
                                className="input-field"
                                type="checkbox"
                                checked={permanentAddress}
                                onChange={handlePermanentAddresses}
                            />
                            <label
                                htmlFor={"permanent_address"}
                                className="pb-0"
                            >
                                Make this my address
                            </label>
                        </div>
                        <ShippingButton
                            handleClick={submitShippingDetails}
                            isLoading={loading}
                        />
                    </form>
                </>
            )}
        </div>
    );
}

export default memo(ShippingDetailsForm);
