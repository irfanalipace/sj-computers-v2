import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Button from "@common/button/Button";
import Logout from "@components/auth/Logout";
import { login } from "@store/auth/authThunks";
const Home = () => {
    const dispatch = useDispatch();

    const option = {
        email: "user@gmail.com",
        password: "12345678",
    };

    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleClick = function () {
        console.log("btn clicked");
        dispatch(login(option));
    };

    return (
        <div>
            Home
            <div>
                <Link to={"/"}>Home</Link>
                <Button clickHandler={handleClick} isLoading={isLoading}>Lick me</Button>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
                <Link to={"/profile"}>Profile</Link>
                <Logout />
            </div>
        </div>
    );
};

export default Home;
