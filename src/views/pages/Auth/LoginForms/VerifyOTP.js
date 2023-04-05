import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import { verifyOtp } from "@store/auth/authThunks";
import Loader from "@common/spinner/Spinner";
import { getUserEmail } from "@services/jwtService";

import "../auth.css";

const VerifyOTP = () => {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const email = getUserEmail();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function verifyOtpFunction(e) {
        e.preventDefault();
        dispatch(verifyOtp(), () => navigate("/home"));
    }

    return (
        <div>
            <div className="container form-container-verify">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className="auth-inner-body">
                        <h3 className="login-h3-verify">
                            Verification required
                        </h3>
                        One Time Password (OTP) sent to<br></br> {email}. Please
                        enter it below.
                        <br></br>
                        <br></br>
                        <div className="mb-3">
                            <label className="name-lable font-weight-bold">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            {error && (
                                <p className="text-danger">Invalid OTP</p>
                            )}
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary login-button"
                                onClick={verifyOtpFunction}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader /> : "Verify OTP"}
                            </button>
                        </div>
                        <p className="text-muted small">
                            <a
                                href="#"
                                className="text-decoration-none "
                                style={{ paddingLeft: "172px" }}
                            >
                                Resend OTP
                            </a>
                        </p>
                        <p className="forgot-password text-left">
                            <a href="/sign-in" className="text-decoration-none">
                                I need more help
                            </a>
                        </p>
                    </form>

                    <div></div>
                    <div></div>
                </div>
            </div>
            <br></br>
            <div className="col-md-12 sticky-bottom py-3" style={{}}>
                <Footer />
            </div>
        </div>
    );
};
export default VerifyOTP;
