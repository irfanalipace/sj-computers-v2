export const ErrorMessages = {
    otp_invalid: "OTP is invalid",
    email_invalid: "Email address is invalid",
    field_required: "{fieldName} is required",
    field_too_short: "{fieldName} must be at least {minLength} characters long",
    field_too_long: "{fieldName} must be at most {maxLength} characters long",
    password_mismatch: "Password and Confirm Password fields are not same",
};

const FIELD_ENUMS = {
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    otp: "OTP",
};

export function validateForm(values, { fieldLengths }) {
    let errors = {};
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = ErrorMessages.email_invalid;
    }
    if (values.otp && !/^\d{4}$/.test(values.otp)) {
        errors.otp = ErrorMessages.otp_invalid;
    }

    for (let fieldName in fieldLengths) {
        let minLength = fieldLengths[fieldName].min;
        let maxLength = fieldLengths[fieldName].max;
        if (!values[fieldName]) {
            errors[fieldName] = ErrorMessages.field_required;
        } else if (minLength && values[fieldName].length < minLength) {
            errors[fieldName] = ErrorMessages.field_too_short;
        } else if (maxLength && values[fieldName].length > maxLength) {
            errors[fieldName] = ErrorMessages.field_too_long;
        }
        if (errors[fieldName]) {
            errors[fieldName] = errors[fieldName]
                .replace("{fieldName}", FIELD_ENUMS[fieldName])
                .replace("{minLength}", minLength)
                .replace("{maxLength}", maxLength);
        }
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = ErrorMessages.password_mismatch;
    }
    return errors;
}
