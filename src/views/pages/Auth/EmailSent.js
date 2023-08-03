import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Header from "@components/Auth/Header";
import Footer from "@components/Auth/Footer";

import "@pages/Auth/auth.css";
import PageWrapper from "../../PageWrapper";

const Emailsent = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);
    return (
        <PageWrapper title="SJ | Email Sent">
   <div>
            <div className="container form-container">
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className={`auth-form ${mounted && "slide"} `}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
                            <h3>Email Sent</h3>
                        </div>
                        <div
                            className="mb-3"
                            style={{ textAlign: "center", fontSize: "18px" }}
                        >
                            <span>
                                Please check your inbox we’ve sent a
                                verification link just go and click that link
                            </span>
                            {/* */}
                        </div>

                        <div
                            className="mb-3"
                            style={{ textAlign: "center", paddingTop: "56px" }}
                        >
                            <Link to={"/login"}>
                                <button
                                    type="submit"
                                    className="btn btn-primary sentmail"
                                    style={{
                                        border: "1px solid #52AC66",
                                        borderRadius: "5px",
                                        background: "white",
                                        color: "#52AC66",
                                        width: "75px",
                                        height: "45px",
                                    }}
                                >
                                    Back
                                </button>
                            </Link>
                        </div>
                    </form>
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
                    <Link
                        to="/register"
                        className="text-decoration-none"
                        style={{ color: "#333333" }}
                    >
                        <div className="react-heading">
                            <div className="rectangle">
                                Create your SJ Computer account
                            </div>
                        </div>
                    </Link>
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

export default Emailsent;
