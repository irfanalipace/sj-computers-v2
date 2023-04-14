import { Link } from "react-router-dom";
import Logout from "@components/Auth/Logout";

const Profile = () => {
    return (
        <div>
            Profile
            <Link to={"/"}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
            <Link to={"/profile"}>Profile</Link>
            <Logout />
        </div>
    );
};

export default Profile;
