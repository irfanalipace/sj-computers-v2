import { useFormValidation } from "@hooks/useFormValidation";

import "./ShippingDetails.css";

export default function ShippingDetails() {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            state: "",
            name: "",
            phoneNumber: "",
            streetAddress: "",
            floorAddress: "",
            city: "",
            state: "",
            zipCode: "",
            saveAddress: false,
        },
        {
            fieldLengths: {
                state: { min: 3, max: 50 },
                name: { min: 3, max: 100 },
            },
        }
    );

    return (
        <div>
            <h3 className="accordion-content-heading">Add New Address</h3>
            <div className="autofill-container">
                <div className="d-flex justify-content-between align-items-center">
                    <p>Save time. Autofill your current location.</p>
                    <button className="autofill-btn">Autofill</button>
                </div>
            </div>
            <form className="shipping-form">
                <div className="field-section">
                    <label for={"state"}>
                        Country/State <span className="text-danger">*</span>
                    </label>
                    <input
                        name="state"
                        className="input-field"
                        type="text"
                        placeholder="Country/State"
                    ></input>
                </div>
                <div className="field-section">
                    <label for={"name"}>
                        Full Name (First & Last Name)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        name="name"
                        className="input-field"
                        type="text"
                        placeholder="Full Name"
                    ></input>
                </div>

                <div className="field-section">
                    <label for={"phoneNumber"}>
                        Phone Number
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        name="phoneNumber"
                        className="input-field"
                        type="text"
                        placeholder="Phone Number"
                    ></input>
                </div>
                <div className="field-section">
                    <label for={"streetAddress"}>
                        Address
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        name="streetAddress"
                        className="input-field"
                        type="text"
                        placeholder="Street address (P.O Box)"
                    ></input>
                    <input
                        name="floorAddress"
                        className="input-field mt-1"
                        type="text"
                        placeholder="Unit, building, floor etc."
                    ></input>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="field-section">
                            <label for={"city"}>
                                Full Name (First & Last Name)
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                name="city"
                                className="input-field"
                                type="text"
                                placeholder=""
                            ></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="field-section">
                            <label for={"state"}>
                                State
                                <span className="text-danger">*</span>
                            </label>
                            <select
                                name="state"
                                className="input-field"
                                placeholder=""
                            >
                                <option value="">fsafasfafa</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="field-section">
                            <label for={"zipCode"}>
                                ZipCode
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                name="zipCode"
                                className="input-field"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
                <div className="field-section">
                    <label for={"saveAddress"}>
                        Make this my address
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        name="saveAddress"
                        className="input-field"
                        type="checkbox"
                        placeholder=""
                    />
                </div>
                <button className="form-button">Use this address</button>
            </form>
        </div>
    );
}
