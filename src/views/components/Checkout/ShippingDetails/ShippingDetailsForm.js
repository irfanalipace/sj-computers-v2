import { useEffect, useState, memo } from "react";

import { useFormValidation } from "@hooks/useFormValidation";
import ShippingButton from "./ShippingButton";
import { useSelector } from "react-redux";

function ShippingDetailsForm({ address, handleClick }) {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            country: address?.country,
            name: address?.full_name,
            phoneNumber: address?.phone_number,
            streetAddress: address?.address,
            floorAddress: "",
            city: address?.city,
            state: address?.state,
            zipCode: address?.zip_code,
            saveAddress: false,
        },
        {
            fieldLengths: {
                country: { min: 3, max: 50 },
                name: { min: 3, max: 100 },
            },
        },
        submitShippingDetails
    );

    const states = useSelector((state) => state.states.states);
    console.log("states", states);

    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        setFieldErrors({ ...errors });
    }, [errors]);

    const submitShippingDetails = () => {
        const params = { ...values };
    };

    const buttonClickHandler = (e) => {
        handleClick(e, true);
    };

    return (
        <div>
            <h3 className="accordion-content-heading">Add New Address</h3>
            {/* <div className="autofill-container">
                <div className="d-flex justify-content-between align-items-center">
                    <p>Save time. Autofill your current location.</p>
                    <button className="autofill-btn">Autofill</button>
                </div>
            </div> */}
            <form className="shipping-form" onSubmit={handleSubmit}>
                <div className="field-section">
                    <label htmlFor={"state"}>
                        Country/State <span className="text-danger">*</span>
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
                    )}
                </div>
                <div className="field-section">
                    <label htmlFor={"name"}>
                        Full Name (First & Last Name)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        className="input-field"
                        type="text"
                        placeholder="Full Name"
                        value={values?.name}
                        onChange={handleChange}
                    ></input>
                    {fieldErrors.email && (
                        <p className="fs-6 mt-1 text-danger">
                            {fieldErrors.email}
                        </p>
                    )}
                </div>

                <div className="field-section">
                    <label htmlFor={"phoneNumber"}>
                        Phone Number
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        className="input-field"
                        type="text"
                        placeholder="Phone Number"
                        value={values?.phoneNumber}
                        onChange={handleChange}
                    ></input>
                    {fieldErrors.phoneNumber && (
                        <p className="fs-6 mt-1 text-danger">
                            {fieldErrors.phoneNumber}
                        </p>
                    )}
                </div>
                <div className="field-section">
                    <label htmlFor={"streetAddress"}>
                        Address
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        id="streetAddress"
                        name="streetAddress"
                        className="input-field"
                        type="text"
                        placeholder="Street address (P.O Box)"
                        value={values?.address}
                        onChange={handleChange}
                    ></input>
                    {fieldErrors.streetAddress && (
                        <p className="fs-6 mt-1 text-danger">
                            {fieldErrors.streetAddress}
                        </p>
                    )}
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
                                value={values?.name}
                            >
                                {states.map((state) => (
                                    <option value={state?.name} key={state?.id}>
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
                            <label htmlFor={"zipCode"}>
                                ZipCode
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="zipCode"
                                name="zipCode"
                                className="input-field"
                                type="text"
                                placeholder="ZipCode"
                                value={values?.zipCode}
                                onChange={handleChange}
                            />
                            {fieldErrors.zipCode && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.zipCode}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="field-section checkbox-wrapper">
                    <input
                        id="saveAddress"
                        name="saveAddress"
                        className="input-field"
                        type="checkbox"
                        placeholder=""
                        onChange={handleChange}
                    />
                    <label htmlFor={"saveAddress"}>Make this my address</label>
                </div>
                <ShippingButton handleClick={buttonClickHandler} />
            </form>
        </div>
    );
}

export default ShippingDetailsForm;
