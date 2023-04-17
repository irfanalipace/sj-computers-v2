import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { verifyOtp } from "@store/auth/authThunks";
import Loader from "@common/Spinner/Spinner";
import { useFormValidation } from "@hooks/useFormValidation";
import { loginApi } from "@api/auth";

import "@pages/Auth/auth.css";

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
    const [fieldErrors, setFieldErrors] = useState({});
    const [email, setEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    const [timer, setTimer] = useState(20);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        setFieldErrors({ ...errors });
    }, [errors]);

    useEffect(() => {
        setFieldErrors({ ...apiError });
    }, [apiError]);

    useEffect(() => {
        if (timer >= 1) setTimer((state) => state - 1);
    }, [timer]);

    useEffect(() => {
        setEmail(user.email);
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    const resendOTP = async () => {
        if (timer === 0) await loginApi(user);
        setTimer(20);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function verifyOtpFunction() {
        const credentials = {
            opt: values.otp,
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
            <h3 className="login-h3-verify">Verification required</h3>
            One Time Password (OTP) sent to<br></br> {email}. Please enter it
            below.
            <br></br>
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
                    <p className="text-danger">{fieldErrors.otp}</p>
                )}
            </div>
            <div className="d-grid justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary login-button"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : "Verify OTP"}
                </button>
            </div>
            <p className="text-muted small d-flex justify-content-center">
                <a
                    onClick={resendOTP}
                    href="#"
                    disabled={!timer}
                    className="text-decoration-none"
                >
                    Resend OTP
                </a>
                <p>{timer}</p>
            </p>
            <p className="forgot-password text-left">
                <a href="/sign-in" className="text-decoration-none">
                    I need more help
                </a>
            </p>
        </form>
    );
};
export default VerifyOTP;
