import { Link } from "react-router-dom";

import EmailForm from "@components/Auth/EmailFormWrapper";
import Header from "@components/Auth/Header";
import Footer from "@components/Auth/Footer";
import "@pages/Auth/auth.css";
import PageWrapper from "../../../../PageWrapper";

const LoginForm = () => {
    return (
        <PageWrapper title='SJ | ForgetPassword'>
     <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <EmailForm form={"forgetPassword"} />

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
        </PageWrapper>
       
    );
};

export default LoginForm;
