import React from "react";
import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className="auth-inner-body">
                        <h3 className="login-h3">Create account</h3>
                        <div className="mb-3">
                            <label className="name-lable font-weight-bold">
                                Your name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="email-lable font-weight-bold">
                                Email or mobile phone number
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <p className="text-muted small">
                            {/* <img src={vectoricon} alt='' style={{width:'7px'}}/> */}
                            <FontAwesomeIcon
                                icon={faInfo}
                                style={{ color: "#52AC66" }}
                            />{" "}
                            Passwords must be at least 6 characters.
                        </p>
                        <div className="mb-3">
                            <label className="font-weight-bold">
                                Re-enter password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter password"
                            />
                        </div>

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary login-button"
                            >
                                Verify email
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

                        <p className="forgot-password text-left">
                            Already have an account?{" "}
                            <Link to="/" className="text-decoration-none">
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
