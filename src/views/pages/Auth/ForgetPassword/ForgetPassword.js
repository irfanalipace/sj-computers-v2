import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import Loader from "@common/spinner/Spinner";

// import logo from '@images/fa-icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "@store/auth/authThunks";
import { getUserEmail } from "@services/jwtService";
import "@pages/Auth/auth.css";

const ForgetPassword = () => {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = getUserEmail();

    function verifyPasswordFunction(e) {
        const credentials = {
            email,
            password,
        };
        e.preventDefault();
        dispatch(resetPassword(credentials, () => navigate("/login")));
    }

    return (
        <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className="auth-inner-body">
                        <h3 className="login-h3">Sign in</h3>
                        <div className="mb-3">
                            <label className="password-lable font-weight-bold">
                                Enter your password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && (
                                <p className="text-danger">
                                    Password Does Not Exist
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="password-lable font-weight-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {error && (
                                <p className="text-danger">
                                    Password Does Not Exist
                                </p>
                            )}
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary login-button"
                                onClick={verifyPasswordFunction}
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
                            <a
                                href="#"
                                className="text-decoration-none need-help"
                            >
                                Need Help?
                            </a>
                        </div>
                    </form>
                    <div className="container new-data">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="h5-heading">
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
    );
};

export default ForgetPassword;
