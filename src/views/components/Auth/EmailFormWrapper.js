import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { verifyEmail } from "@store/auth/authThunks";
import { forgetPassword } from "@store/auth/authThunks";

import Form from "@components/Auth/EmailForm";

import "@pages/Auth/auth.css";

const EmailForm = ({ form }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let verifyEmailFunction = () => {};

    switch (form) {
        case "login":
            verifyEmailFunction = (email) => {
                dispatch(verifyEmail(email));
            };
            break;

        case "forgetPassword":
            verifyEmailFunction = (email) => {
                dispatch(forgetPassword(email, () => navigate("/email-sent")));
            };
            break;

        default:
            break;
    }

    return (
        <div>
            <Form onFormSubmit={verifyEmailFunction} form={form} />
        </div>
    );
};

export default EmailForm;
