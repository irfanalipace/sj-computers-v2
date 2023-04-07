import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@store/auth/authThunks";
import { resetPassword } from "@store/auth/authThunks";
import Form from "@components/auth/ResetPassword";

import "@pages/Auth/auth.css";

const PasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const forget = urlParams.get("forget");

    function verifyPasswordFunction(e, credentials) {
        e.preventDefault();
        forget
            ? dispatch(resetPassword(credentials, () => navigate("/login")))
            : dispatch(login(credentials, () => navigate("/")));
    }

    return <Form onFormSubmit={verifyPasswordFunction} />;
};

export default PasswordForm;
