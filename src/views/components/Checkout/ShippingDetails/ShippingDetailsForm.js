import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setShippingDetails } from "@store/orders/ordersThunk";
import { SET_SHIPPING_DETAILS } from "@store/orders/ordersSlice";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ShippingButton from "./ShippingButton";
import { useFormik } from "formik";

function ShippingDetailsForm({ address, handleHeight, hideForm }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const states = useSelector((state) => state.states.states);
    const apiError = useSelector((state) => state.orders.apiError);
    const loading = useSelector((state) => state.orders.isLoading);
    const settingAdress = useSelector((state) => state.orders.settingAdress);

    // const [fieldErrors, setFieldErrors] = useState({});
    const [permanentAddress, setPermanentAddress] = useState(false);
    const dispatch = useDispatch();
    const {
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        handleBlur,
        setErrors,
        isValid,
    } = useFormik({
        initialValues: {
            country: address?.country || "US",
            full_name: address?.full_name || "",
            phone_number: address?.phone_number || "",
            email: address?.email || "",
            address: address?.address || "",
            floorAddress: address?.floorAddress || "",
            city: address?.city || "",
            state: address?.state || "Alabama",
            zip_code: address?.zip_code || "",
        },
        validate: (values) => {
            const errors = {};
            if (!isAuthenticated) {
                if (!values.email) errors.email = "( Required )";
            }
            if (!values.address) errors.address = "( Required )";
            if (!values.phone_number) errors.phone_number = "( Required )";
            return errors;
        },
        onSubmit: (values) => {
            submitShippingDetails(values);
        },
    });
    const handlePermanentAddresses = (e) => {
        setPermanentAddress(e.target.checked);
    };

    useEffect(() => {
        setErrors({ ...apiError });
    }, [apiError]);

    const submitShippingDetails = (values) => {
        let params = { ...values, permanent_address: permanentAddress };
        console.print("@@params: ", params);
        if (permanentAddress) dispatch(setShippingDetails(params, hideForm));
        else {
            dispatch(SET_SHIPPING_DETAILS(params));
            hideForm();
        }
    };

    // useEffect(() => {
    //     if (typeof cb === "function") handleHeight();
    // }, [errors]);

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
                    <form className="shipping-form" onSubmit={handleSubmit}>
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
                                onBlur={handleBlur}
                            ></input>
                            {/* {errors.full_name && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.full_name}
                                </p>
                            )} */}
                        </div>

                        <div className="field-section">
                            <label htmlFor={"phoneNumber"}>
                                Phone Number
                                <span className="text-danger">*</span>
                                {errors.phone_number &&
                                    touched.phone_number && (
                                        <span className="fs-6 mt-1 text-danger">
                                            {errors?.phone_number}
                                        </span>
                                    )}
                            </label>
                            <input
                                id="phone_number"
                                name="phone_number"
                                className={
                                    errors.email && touched.email
                                        ? "input-field border-danger"
                                        : "input-field"
                                }
                                type="text"
                                placeholder="Phone Number"
                                value={values?.phone_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></input>
                            {/* {errors.phone_number && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.phone_number}
                                </p>
                            )} */}
                        </div>
                        {!isAuthenticated && (
                            <div className="field-section">
                                <label htmlFor={"email"}>
                                    Email
                                    <span className="text-danger">*</span>
                                    {errors.email && touched.email && (
                                        <span className="fs-6 mt-1 text-danger">
                                            {errors.email}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    className={
                                        errors.email && touched.email
                                            ? "input-field border-danger"
                                            : "input-field"
                                    }
                                    type="text"
                                    placeholder="Enter Email to track order"
                                    value={values?.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></input>
                                {/* {errors.email && touched.email && (
                                    <p className="fs-6 mt-1 text-danger">
                                        {errors.email}
                                    </p>
                                )} */}
                            </div>
                        )}
                        <div className="field-section">
                            <label htmlFor={"streetAddress"}>
                                Address
                                <span className="text-danger">*</span>
                                {errors.address && touched.address && (
                                    <span className="fs-6 mt-1 text-danger">
                                        {errors?.address}
                                    </span>
                                )}
                            </label>
                            <input
                                id="address"
                                name="address"
                                className={
                                    errors.address && touched.address
                                        ? "input-field border-danger"
                                        : "input-field"
                                }
                                type="text"
                                placeholder="Street address (P.O Box)"
                                value={values?.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></input>
                            {/* {errors.address && touched.address && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.address}
                                </p>
                            )} */}
                            <br></br>
                            <input
                                id="floorAddress"
                                name="floorAddress"
                                className="input-field mt-1"
                                type="text"
                                placeholder="Unit, building, floor etc."
                                value={values?.floorAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></input>
                            {errors.floorAddress && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.floorAddress}
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
                                        onBlur={handleBlur}
                                    ></input>
                                    {/* {errors.city && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {errors.city}
                                        </p>
                                    )} */}
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
                                        className="input-field text-capitalize"
                                        placeholder="Select Stte"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.state}
                                    >
                                        {states.map((state) => (
                                            <option
                                                value={state?.name}
                                                key={state?.id}
                                                className="text-capitalize"
                                            >
                                                {state?.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {errors.state}
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
                                        onBlur={handleBlur}
                                    />
                                    {errors.zip_code && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {errors.zip_code}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {isAuthenticated && (
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
                        )}

                        <ShippingButton
                            handleClick={handleSubmit}
                            isLoading={loading}
                            disabled={!isValid}
                        />
                    </form>
                </>
            )}
        </div>
    );
}

export default memo(ShippingDetailsForm);
