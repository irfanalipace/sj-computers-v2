import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { updatePassword } from "@store/auth/authThunks";
import Button from "@common/Button/Button";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";

import securityIllustration from "@images/security-illustration.png";
import "react-datepicker/dist/react-datepicker.css";

const Security = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const apiError = useSelector((state) => state.auth.apiError);
    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            email: user.email,
            oldPassword,
            password: password,
            confirmPassword: confirmPassword,
        };
        // dispatch(updatePassword(params));
    };

    return (
        <div className="account-page">
            <div className="container-xl">
                <Breadcrumb />
                <h3 className="account-heading">Security</h3>
                <div className="profile-container security-form">
                    <div className="row mx-0">
                        <div className="col-sm-6 col-12">
                            <div className="user-info-container">
                                <form
                                    className="user-info-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="input-wrapper">
                                        <label htmlFor="email">
                                            Your Email
                                        </label>
                                        <input
                                            type="text"
                                            value={user.email}
                                            readOnly
                                            name="email"
                                            id="email"
                                        />
                                    </div>
                                    {apiError && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {apiError.email}
                                        </p>
                                    )}
                                    <div className="input-wrapper">
                                        <label htmlFor="oldPassword">
                                            Old Password
                                        </label>
                                        <input
                                            id="oldPassword"
                                            name="oldPassword"
                                            placeholder="Old Password"
                                            type={
                                                showOldPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={oldPassword}
                                            onChange={(e) =>
                                                setOldPassword(e.target.value)
                                            }
                                        />
                                        <button
                                            className="edit-btn"
                                            type="button"
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showOldPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    {apiError && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {apiError.oldPassword}
                                        </p>
                                    )}
                                    <div className="input-wrapper">
                                        <label htmlFor="password">
                                            New Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            placeholder="New Password"
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <button
                                            className="edit-btn"
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showNewPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    {apiError && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {apiError.password}
                                        </p>
                                    )}
                                    <div className="input-wrapper">
                                        <label htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            className="edit-btn"
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showConfirmPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    {apiError && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {apiError.confirmPassword}
                                        </p>
                                    )}

                                    <Button
                                        className={"account-btn update-btn"}
                                        onClick={handleSubmit}
                                        isLoading={isLoading}
                                        type={"submit"}
                                    >
                                        Update
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className="col-sm-6 d-sm-block d-none">
                            <div className="right-illustration">
                                <img src={securityIllustration} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
