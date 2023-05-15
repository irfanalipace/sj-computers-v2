import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "@store/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();

    function logout() {
        dispatch(LOGOUT());
    }

    return <button onClick={logout}>Logout</button>;
};

export default Login;
