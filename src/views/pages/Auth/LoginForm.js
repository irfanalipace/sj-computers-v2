import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EmailForm from "@components/auth/EmailFormWrapper";
import PasswordForm from "@components/auth/PasswordForm";
import VerifyOTP from "@components/auth/VerifyOTP";
import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";

const LoginForm = () => {
    const currentPage = useSelector((state) => state.auth.currentPage);

    const CurrentForm = () => {
        return (
            <div>
                {currentPage === 1 && <EmailForm form={"login"} />}
                {currentPage === 2 && <PasswordForm />}
                {currentPage === 3 && <VerifyOTP />}
            </div>
        );
    };
    return (
        <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <CurrentForm />

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
};

export default LoginForm;
