import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import profileIcon from "@images/common/profile-icon.png";
import orderIcon from "@images/common/orders-icon.png";
import securityIcon from "@images/common/security-icon.png";

import Profile from "./Profile";

import "./Account.css";


const Account = () => {
    return (
        <div className="account-page">
            <div className="container-xl">
                <h3 className="account-heading">Your Account </h3>
                <div className="account-options row mx-0">
                    <Link
                        to={"orders"}
                        className="account-card col-md-3 col-sm-6 col-12"
                    >
                        <div className="account-card-inner">
                            <div className="img-wrapper">
                                <img src={orderIcon} />
                            </div>
                            <div className="account-info">
                                <h6>Your Order</h6>
                                <p>Track, return or cancel your order</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={"profile"}
                        className="account-card col-md-3 col-sm-6 col-12"
                    >
                        <div className="account-card-inner">
                            <div className="img-wrapper">
                                <img src={profileIcon} />
                            </div>
                            <div className="account-info">
                                <h6>Profile</h6>
                                <p>Edit name</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={"update-password"}
                        className="account-card col-md-3 col-sm-6 col-12"
                    >
                        <div className="account-card-inner">
                            <div className="img-wrapper">
                                <img src={securityIcon} />
                            </div>
                            <div className="account-info">
                                <h6>Security</h6>
                                <p>Edit Password</p>
                            </div>
                        </div>
                    </Link>
                    {/* <Link
                        to={"update-address"}
                        className="account-card col-md-3 col-sm-6 col-12"
                    >
                        <div className="account-card-inner">
                            <div className="img-wrapper">
                                <img src={profileIcon} />
                            </div>
                            <div className="account-info">
                                <h6>Your Address</h6>
                                <p>Edit remove or set default address</p>
                            </div>
                        </div>
                    </Link> */}
                </div>
            </div>
      
        </div>
    );
};

export default Account;
