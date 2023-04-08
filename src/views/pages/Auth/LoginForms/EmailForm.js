import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { verifyEmail } from "@store/auth/authThunks";
import Form from "@components/auth/EmailForm";

import "@pages/Auth/auth.css";

const EmailForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function verifyEmailFunction(email) {
        dispatch(verifyEmail(email));
    }

    return (
        <div>
            <Form onFormSubmit={verifyEmailFunction} />
        </div>
    );
};

export default EmailForm;
