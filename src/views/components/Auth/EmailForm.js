import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useFormValidation } from "@hooks/useFormValidation";

import Loader from "@common/Spinner/Spinner";

export default function EmailForm({ onFormSubmit, form }) {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            email: "",
        },
        {
            fieldLengths: {
                email: { min: 5, max: 100 },
            },
        },
        verifyEmail
    );

    const apiError = useSelector((state) => state.auth.apiError);
    const [mounted, setMounted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        setFieldErrors({ ...errors });
    }, [errors]);

    useEffect(() => {
        setFieldErrors({ ...apiError });
    }, [apiError]);

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    const isLoading = useSelector((state) => state.auth.isLoading);

    function verifyEmail() {
        onFormSubmit(values.email);
    }

    return (
        <form
            className={`auth-inner-body ${mounted && "slide"} `}
            onSubmit={handleSubmit}
        >
            <h3 className="login-h3">
                {form === "forgetPassword" ? "Forget Password" : "Sign In"}
            </h3>
            <div className="mb-3">
                <label className="email-lable font-weight-bold">
                    Email or mobile phone number
                </label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                />
                {fieldErrors && (
                    <p className="text-danger">{fieldErrors.email}</p>
                )}
            </div>
            <div className="d-grid justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary login-button"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : "Continue"}
                </button>
            </div>
            <p className="text-muted small">
                By continuing, you agree to SJ Computer’s{" "}
                <a href="#" className="text-decoration-none">
                    Conditions of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-decoration-none">
                    Privacy Notice
                </a>
                .
            </p>

            <div className="need-help">
                <FontAwesomeIcon icon={faCaretRight} />{" "}
                <a href="#" className="text-decoration-none need-help">
                    Need Help?
                </a>
            </div>
        </form>
    );
}
