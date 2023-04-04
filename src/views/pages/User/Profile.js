import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            Profile
            <Link to={"/"}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
            <Link to={"/profile"}>Profile</Link>
        </div>
    );
};

export default Profile;
