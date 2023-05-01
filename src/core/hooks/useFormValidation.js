import { useState } from "react";
import { validateForm } from "@utils/formHelpers";

export function useFormValidation(initialState, { fieldLengths }, submitForm) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
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
