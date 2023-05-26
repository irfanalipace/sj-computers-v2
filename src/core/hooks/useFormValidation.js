import { useState } from "react";
import {
    validateForm,
    validateZipCode,
    validatePhoneNumber,
} from "@utils/formHelpers";

const FIELD_TYPE_ENUMS = {
    phone_number: validatePhoneNumber,
    zip_code: validateZipCode,
};

export function useFormValidation(initialState, { fieldLengths }, submitForm) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    function handleChange(event, _value) {
        const { name, value } = _value || event.target;
        if (typeof FIELD_TYPE_ENUMS[name] === "function") {
            if (FIELD_TYPE_ENUMS[name](value))
                setValues({
                    ...values,
                    [name]: value,
                });
        } else
            setValues({
                ...values,
                [name]: value,
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validateForm(values, { fieldLengths });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            if (typeof submitForm === "function") submitForm(values);
        }
    }

    return { values, handleChange, handleSubmit, errors };
}
