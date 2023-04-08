

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import Loader from "@common/spinner/Spinner";

// import logo from '@images/fa-icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { verifyEmail } from "@store/auth/authThunks";
import "@pages/Auth/auth.css";

const Emailsent = () => {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function verifyEmailFunction(e) {
        e.preventDefault();
        dispatch(verifyEmail(email, () => navigate("/verify-password")));
    }

    return (
        <div>
            <div className="container form-container" >
                <div className="row">
                    <div className="header-logo">
                        <Header />
                    </div>

                    <form className="auth-inner-body">
                      
                        <div className="mb-3" style={{textAlign:'center'}}>
                        <h3>Email Sent</h3>
                        </div>
                        <div className="mb-3" style={{textAlign: 'center', fontSize: '18px'}}>
                            
                            <span>Please check your inbox we’ve sent a verification link just go and click that link</span>
                            {/* */}
                        </div>
                       

                        <div className="mb-3" style={{textAlign: 'center', paddingTop:'56px'}}>
                        <button
                                type="submit"
                                className="btn btn-primary sentmail"
                             style={{border:'1px solid #52AC66', borderRadius:'5px', background:'white', color:'#52AC66', width:'75px', height:'45px'}}
                            >
                               Back
                            </button>
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
    );
};

export default Emailsent;
