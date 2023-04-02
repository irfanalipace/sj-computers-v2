import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            Login
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/profile"}>Profile</Link>
            </div>
        </div>
    );
};

export default Login;
