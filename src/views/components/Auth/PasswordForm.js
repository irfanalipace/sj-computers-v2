import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
import { RESET_PAGE } from "@store/auth/authSlice";
import Loader from "@common/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { login } from "@store/auth/authThunks";
import { getUserEmail } from "@services/jwtService";
import { useFormValidation } from "@hooks/useFormValidation";

import "@pages/Auth/auth.css";
<<<<<<< HEAD

=======
>>>>>>> origin/test-merge-3

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

    const email = getUserEmail();

    function verifyPasswordFunction() {
        const credentials = {
            email,
            password: values.password,
        };
        dispatch(login(credentials));
    }

    return (
<<<<<<< HEAD
     
 <form
=======
        <form
>>>>>>> origin/test-merge-3
            className={`auth-form ${mounted && "slide"} `}
            onSubmit={handleSubmit}
        >
            <h3 className="login-h3">Sign in</h3>
            <div className="email-text-verify-form mt-2 mb-1">
                {email}
                {". "}
                <button
                    className="change-email-btn"
                    onClick={() => dispatch(RESET_PAGE())}
                    type="button"
                >
                    Change Email ?
                </button>
            </div>
            <div className="mb-3">
                <label className="password-label" htmlFor="password">
                    Enter your password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    autoFocus
                />
                <div className="d-flex justify-content-end">
                    <Link
                        to={"/forget-password"}
                        className="text-decoration-none mt-2 forget-password-text-loginform"
                    >
                        Forget password?
                    </Link>
                </div>
                {fieldErrors && (
                    <p className="fs-6 mt-1 text-danger">
                        {fieldErrors.password || fieldErrors.credentials}
                    </p>
                )}
            </div>
            <div className="d-flex justify-content-center w-100">
                <button
                    type="submit"
                    className=" singinnbutton"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : "Continue"}
                </button>
            </div>
            <p className="tetxt-signin">
                By continuing, you agree to SJ Computer’s{" "}
                <Link to="/term_services" className="text-decoration-none">
                    Conditions of Use
                </Link>{" "}
                and{" "}
                <Link to="/term_services" className="text-decoration-none">
                    Privacy Noticee
                </Link>
                .
            </p>

            <div>
                <FontAwesomeIcon
                    icon={faCaretRight}
                    className="need-help-singin-arrow"
                />
                <Link to="" className="text-decoration-none my-text-signin">
                    Need Help?
                </Link>
            </div>
        </form>
<<<<<<< HEAD
       
       
=======
>>>>>>> origin/test-merge-3
    );
};

export default PasswordForm;
