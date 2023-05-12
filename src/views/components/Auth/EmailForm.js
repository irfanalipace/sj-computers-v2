import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
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

    const dispatch = useDispatch();
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
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);

    const isLoading = useSelector((state) => state.auth.isLoading);

    function verifyEmail() {
        onFormSubmit(values.email);
    }

    return (
        <form
            className={`auth-form ${mounted && "slide"} `}
            onSubmit={handleSubmit}
        >
            <h3 className="login-h3">
                {form === "forgetPassword" ? "Forget Password" : "Sign In"}
            </h3>
            <div className="mb-3">
                <label className="email-label ">Enter Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control email-login-input"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    autoFocus
                />
                {fieldErrors && (
                    <p className="fs-6 mt-1 text-danger">{fieldErrors.email}</p>
                )}
            </div>
            <div className="d-flex justify-content-center w-100">
                <button
                    type="submit"
                    className=" loginform-button"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : "Continue"}
                </button>
            </div>
            <p className=" small-text-paragrap">
                By continuing, you agree to SJ Computer’s{" "}
                <a href="#" className="text-decoration-none">
                    Conditions of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-decoration-none">
                    Privacy Noticee
                </a>
                .
            </p>

            <div className="need-help">
                <FontAwesomeIcon
                    icon={faCaretRight}
                    className="need-help-singin-arrow"
                />
                <a href="#" className="text-decoration-none need-help">
                    Need Help?
                </a>
            </div>
        </form>
    );
}
