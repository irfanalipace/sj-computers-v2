import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { verifyOtp } from "@store/auth/authThunks";
import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
import Loader from "@common/Spinner/Spinner";
import { useFormValidation } from "@hooks/useFormValidation";
import { loginApi } from "@api/auth";

import "@pages/Auth/auth.css";
import { getUserEmail, getUserPassword } from "@services/jwtService";

const VerifyOTP = () => {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            otp: "",
        },
        {
            fieldLengths: {
                otp: { min: 4, max: 4 },
            },
        },
        verifyOtpFunction
    );

    const apiError = useSelector((state) => state.auth.apiError);
    const isLoading = useSelector((state) => state.auth.isLoading);
    // const accessToken = useSelector((state) => state.auth.accessToken);
    const [fieldErrors, setFieldErrors] = useState({});
    const [email, setEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFieldErrors({ ...errors });
    }, [errors]);

    useEffect(() => {
        setFieldErrors({ ...apiError });
    }, [apiError]);

    const password = getUserPassword();

    useEffect(() => {
        const interval = setInterval(
            () => setTimer((prevState) => prevState - 1),
            1000
        );
        setEmail(getUserEmail());
        setMounted(true);
        return () => {
            clearInterval(interval);
            setMounted(false);
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);

    useEffect(() => {
        if (timer === 0) setIsTimerFinished(true);
    }, [timer]);

    const resendOTP = async () => {
        setLoading(true);
        if (isTimerFinished)
            await loginApi({
                email,
                password,
            });
        setLoading(false);
        setIsTimerFinished(false);

        setTimer(20);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function verifyOtpFunction() {
        const credentials = {
            otp: values.otp,
        };
        dispatch(verifyOtp(credentials, () => navigate("/")));
    }

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /[0-9]/; // this regex matches any numeric digit

        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    };

    return (
        <form
            className={`auth-inner-body ${mounted && "slide"} `}
            onSubmit={handleSubmit}
        >
            <h3 className="login-h3-verify-form">Verification required</h3>
            <span className="email-text-verify-form">
                {" "}
                One Time Password (OTP) sent to {email}
                <span className="email-text-verify-form">
                    Please enter it below.
                </span>{" "}
            </span>
            <br></br>

            <div className="mb-3">
                <label className="name-lable font-weight-bold">Enter OTP</label>
                <input
                    type="text"
                    name="otp"
                    className="form-control"
                    value={values.otp}
                    maxLength={4}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                />

                {fieldErrors && (
                    <p className="fs-6 mt-1 text-danger">{fieldErrors.otp}</p>
                )}
            </div>
            <div className="d-grid justify-content-center">
                <button
                    type="submit"
                    className="verify-button-data verify-otp-btn"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? <Loader /> : "Verify OTP"}
                </button>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center mt-2">
                    <Loader />
                </div>
            ) : (
                <div className="align-items-center d-flex flex-column justify-content-center">
                    <p className="text-muted small d-flex justify-content-center">
                        <button
                            onClick={resendOTP}
                            type={"button"}
                            disabled={!isTimerFinished || isLoading || loading}
                            className="bg-white border-0 text-primary resend-otp-btn"
                        >
                            Resend OTP
                        </button>
                    </p>
                    <div className="border-primary text-primary timer">
                        {isTimerFinished ? "0" : timer}
                    </div>
                </div>
            )}
            <p className="forgot-password text-left">
                <a href="/sign-in" className="text-decoration-none">
                    I need more help
                </a>
            </p>
        </form>
    );
};
export default VerifyOTP;
