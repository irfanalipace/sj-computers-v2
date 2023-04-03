import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@store/auth/authThunks";

const Login = () => {
    const dispatch = useDispatch();
    const option = {
        email: "haroon@gmail.com",
        password: "12345678",
    };
    useEffect(() => {
        // dispatch(login(option));
    }, []);

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
