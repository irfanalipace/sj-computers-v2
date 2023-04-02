import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            Home
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/profile"}>Profile</Link>
            </div>
        </div>
    );
};

export default Home;
