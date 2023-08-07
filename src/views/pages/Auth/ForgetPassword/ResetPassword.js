import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { resetPassword } from "@store/auth/authThunks";
import Header from "@components/Auth/Header";
import Footer from "@components/Auth/Footer";
import Loader from "@common/Spinner/Spinner";
import { useFormValidation } from "@hooks/useFormValidation";

import "@pages/Auth/auth.css";
<<<<<<< HEAD

=======
>>>>>>> origin/test-merge-3

const PasswordForm = () => {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const apiError = useSelector((state) => state.auth.apiError);
    const [mounted, setMounted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            email: email,
            password: "",
            confirmPassword: "",
        },
        {
            fieldLengths: {
                email: { min: 5, max: 100 },
                password: { min: 6, max: 20 },
                confirmPassword: { min: 6, max: 20 },
            },
        },
        resetPasswordFunction
    );
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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function resetPasswordFunction() {
        const credentials = {
            access_token: token,
            email: values.email,
            password: values.password,
            confirm_password: values.confirmPassword,
        };
        dispatch(resetPassword(credentials, () => navigate("/login")));
    }

    return (
<<<<<<< HEAD
    
=======
>>>>>>> origin/test-merge-3
        <div>
            <div className={`container form-container`} onSubmit={handleSubmit}>
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className={`auth-form ${mounted && "slide"} `}>
                        <h3 className="login-h3">Reset Password</h3>
                        <div className="mb-3">
                            <label className="password-label ">
                                Enter your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your Email"
                                value={email}
                                readOnly
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="password-label ">
                                Enter new password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {fieldErrors && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="password-label ">
                                Re-enter your password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm password"
                                value={values.confirmPassword}
                                onChange={handleChange}
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
                                className="resetpassword-button"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader /> : "Continue"}
                            </button>
                        </div>
                        <p className="resetpassword-praragraph-text">
                            By continuing, you agree to SJ Computer’s{" "}
                            <Link
                                to="/term_services"
                                className="text-decoration-none"
                            >
                                Conditions of Use
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/term_services"
                                className="text-decoration-none"
                            >
                                Privacy Notice
                            </Link>
                            .
                        </p>

                        <div className="need-help">
                            <FontAwesomeIcon
                                icon={faCaretRight}
                                className="icon-need-help-resetpassword"
                            />
                            <Link
                                to=""
                                className="text-decoration-none need-help"
                            >
                                Need Help?
                            </Link>
                        </div>
                    </form>
                    <div className="container new-data">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="h5-heading ">
                                    New to SJ Computers?
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div></div>

                    <div className="react-heading">
                        <div className="rectangle">
                            <Link
                                to="/register"
                                className="text-decoration-none"
                                style={{ color: "#333333" }}
                            >
                                Create your SJ Computer account
                            </Link>
                        </div>
                    </div>

                    <div></div>
                </div>
            </div>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col">
                        <div className="sticky-bottom py-3">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
<<<<<<< HEAD
      
       
=======
>>>>>>> origin/test-merge-3
    );
};

export default PasswordForm;
