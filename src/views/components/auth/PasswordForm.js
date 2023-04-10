import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Loader from "@common/spinner/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { login } from "@store/auth/authThunks";
import { getUserEmail } from "@services/jwtService";
import { useFormValidation } from "@hooks/useFormValidation";

import "@pages/Auth/auth.css";

const PasswordForm = () => {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            password: "",
        },
        {
            fieldLengths: {
                password: { min: 6, max: 20 },
            },
        },
        verifyPasswordFunction
    );

    const apiError = useSelector((state) => state.auth.apiError);
    const [mounted, setMounted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setFieldErrors(errors);
    }, [errors]);

    useEffect(() => {
        setFieldErrors(apiError);
    }, [apiError]);

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    const isLoading = useSelector((state) => state.auth.isLoading);

    const email = getUserEmail();

    function verifyPasswordFunction() {
        const credentials = {
            email,
            password: values.password,
        };
        dispatch(login(credentials));
    }

    return (
        <form
            className={`auth-inner-body ${mounted && "slide"} `}
            onSubmit={handleSubmit}
        >
            <h3 className="login-h3">Sign in</h3>
            <div className="mb-3">
                <label className="password-lable font-weight-bold">
                    Enter your password
                </label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                />
                <div className="d-flex justify-content-end">
                    <Link to={"/forget-password"}>Forget Password?</Link>{" "}
                </div>
                {fieldErrors && (
                    <p className="text-danger">
                        {fieldErrors.password || fieldErrors.credentials}
                    </p>
                )}
            </div>
            <div className="d-grid">
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
};

export default PasswordForm;
