import { useState } from "react";
import "./logincart.css";
import { Link } from "react-router-dom";
const LoginCart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="dropdown-payment hover-effect-sets">
            <button onClick={handleButtonClick} className="hover-effect-sets">
                <p className="text-start mb-1">Login</p>{" "}
                <p className="mb-0">Register</p>
            </button>
            {isOpen && (
                <div
                    className="sidebarOverlay"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
            {isOpen ? (
                <div className="product-section-cart">
                    <div className="d-grid ">
                        <div className="text-center mt-2">
                            <Link to={"/login"}>
                                <button
                                    type="submit"
                                    className="login-register-cart-button"
                                >
                                    Sign In
                                </button>
                            </Link>
                        </div>
                        <p className="forgot-password text-left new-customer">
                            New Customer{" "}
                            <Link
                                to="/register"
                                className="text-decoration-none"
                            >
                                Start here
                            </Link>
                        </p>
                    </div>
                    <hr className="hr-list-head"></hr>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <h4 className="your-list">Your List</h4>
                            <p className="create-list">Create Your Wishlist</p>
                        </div>

                        <div className="col-md-6 my-list-hr">
                            <h4 className="your-account">Your Account</h4>

                            <ul className="ul-list">
                                <li> Account </li>

                                <li> Order </li>

                                <li> Recommendations </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            ) : null}
        </div>
    );
};

export default LoginCart;
