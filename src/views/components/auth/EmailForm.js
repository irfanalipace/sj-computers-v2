import { useState } from "react";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import Loader from "@common/spinner/Spinner";

export default function EmailForm({ onFormSubmit }) {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function verifyEmail(e) {
        onFormSubmit(email);
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
                            <label className="email-lable font-weight-bold">
                                Email or mobile phone number
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && (
                                <p className="text-danger">
                                    Email Does Not Exist
                                </p>
                            )}
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary login-button"
                                onClick={verifyEmail}
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
}
