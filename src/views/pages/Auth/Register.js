import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
import Header from "@components/Auth/Header";
import Footer from "@components/Auth/Footer";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormValidation } from "@hooks/useFormValidation";
import Loader from "@common/Spinner/Spinner";
import { register } from "@store/auth/authThunks";

import "@pages/Auth/auth.css";

const Register = () => {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        {
            fieldLengths: {
                name: { min: 3, max: 50 },
                email: { min: 5, max: 100 },
                password: { min: 6, max: 20 },
                confirmPassword: { min: 6, max: 20 },
            },
        },
        registerFunction
    );

    const dispatch = useDispatch();
    const apiError = useSelector((state) => state.auth.apiError);
    const [fieldErrors, setFieldErrors] = useState({});
    const [mounted, setMounted] = useState(false);

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
    const navigate = useNavigate();

    function registerFunction() {
        dispatch(register(values, () => navigate("/email-sent")));
    }

    return (
        <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form
                        className={`auth-form ${mounted && "slide"} `}
                        onSubmit={handleSubmit}
                    >
                        <h3 className="login-h3">Create account</h3>
                        <div className="mb-3">
                            <label className="name-label ">Your name</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Full name"
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="email-label ">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={values.emal}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter password"
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>
                        <p className="register-p-text">
                            {/* <img src={vectoricon} alt='' style={{width:'7px'}}/> */}
                            <FontAwesomeIcon
                                icon={faInfo}
                                style={{
                                    color: "#52AC66",
                                    paddingRight: "6px",
                                }}
                            />
                            Passwords must be at least 6 characters.
                        </p>
                        <div className="mb-3">
                            <label className="">Re-enter password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Re-enter password"
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="d-flex justify-content-center w-100">
                            <button
                                type="submit"
                                className=" set-register-button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader /> : "Verify Email"}
                            </button>
                        </div>
                        <p className="set-register-text">
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

                        <p className="register-sign-link">
                            Already have an account?{" "}
                            <Link to="/login" className="text-decoration-none">
                                Sign in?
                            </Link>
                        </p>
                    </form>

                    <div></div>
                    <div></div>
                </div>
            </div>
            <br></br>
            <div className="col-md-12 sticky-bottom py-3">
                <Footer />
            </div>
        </div>
    );
};
export default Register;
