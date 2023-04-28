import { useState } from "react";
import "./logincart.css";
import { Link, useNavigate } from "react-router-dom";
const LoginCart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const [isPaymentFrameVisible, setIsPaymentFrameVisible] = useState(false);
    return (
        <div className="dropdown-payment">
            <button
                onClick={handleButtonClick}
                className="dropdown-toggle pb-0 login-cart-button"
            >
                Login <br></br>Register
            </button>
            {isOpen ? (
                <div className="product-section-cart">
                    <div className="d-grid ">
                        <div className="text-center mt-2">
                            <Link to={"/login"}>
                                <button
                                    type="submit"
                                    className="btn btn-primary login-button"
                                >
                                    Sigin In
                                </button>
                            </Link>
                        </div>
                        <p className="forgot-password text-left new-customer">
                            New Customer
                            <Link
                                to="/register"
                                className="text-decoration-none"
                            >
                                Start here
                            </Link>
                        </p>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="your-list">Your List</h4>
                            <p className="create-list">Create List</p>
                        </div>

                        <div className="col-md-6">
                            <h4  className="your-account">
                                Your Account
                            </h4>

                            <ul className="ul-list">
                                <li> Account </li>

                                <li> Order </li>

                                <li> Recommandations </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default LoginCart;
