import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logout from "@components/auth/Logout";
import { login } from "@store/auth/authThunks";
const Home = () => {
    const dispatch = useDispatch();
    const option = {
        email: "haroon@gmail.com",
        password: "12345678",
    };
    useEffect(() => {
        dispatch(login(option));
    }, []);
    return (
        <div>
            Home
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
                <Link to={"/profile"}>Profile</Link>
                <Logout />
            </div>
        </div>
    );
};

export default Home;
