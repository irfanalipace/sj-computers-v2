import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@store/auth/authThunks";

import userImg from "@images/user.png";
import { US } from "country-flag-icons/react/3x2";

import "./Sidebar.css";

export default function Sidebar({ openState, toggleSidebar }) {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const user = {
    //     name: "haroon",
    // };
    const dispatch = useDispatch();
    const categories = [
        {
            id: 1,
            name: "Food",
        },
        {
            id: 2,
            name: "Clothes",
        },
        {
            id: 3,
            name: "Electronics",
        },
        {
            id: 4,
            name: "Home",
        },
        {
            id: 5,
            name: "Electronics",
        },
        {
            id: 6,
            name: "Laptops",
        },
    ];

    return (
        <div
            className="sideMenu-container"
            style={{ left: openState ? "0" : "-350px" }}
        >
            <div className="sideMenu-wrapper">
                <button
                    onClick={() => toggleSidebar()}
                    className="sideMenu-close-btn"
                >
                    <i className="fa fa-times"></i>
                </button>
                <div className="sideMenu-inner">
                    <div className="sideMenu-header">
                        <img
                            className="me-3"
                            src={
                                user?.profileImage ? user.profileImage : userImg
                            }
                        />
                        <span>
                            Hello,
                            {isAuthenticated ? (
                                user?.name
                            ) : (
                                <Link to={"/login"}>Sign In</Link>
                            )}
                        </span>
                    </div>
                    <div className="sideMenu">
                        <h4>Shop By Category</h4>
                        <ul className="menu-list">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link to={`/category/${category.id}`}>
                                        {category.name}
                                    </Link>
                                    <i className="fa fa-angle-right"></i>
                                </li>
                            ))}
                        </ul>

                        <h4>Help & Settings</h4>
                        <ul className="menu-list">
                            {isAuthenticated && (
                                <li>
                                    <Link to={`/profile`}>Your Account</Link>
                                </li>
                            )}
                            <li className="d-block">
                                <i className="fa fa-globe"></i>
                                <Link>English</Link>
                            </li>
                            <li className="d-block">
                                <US
                                    title="United States"
                                    className="country-flag"
                                />
                                <Link className="ms-1">United States</Link>
                            </li>
                            <li>
                                <Link>Customer Services</Link>
                            </li>
                            <li>
                                {isAuthenticated ? (
                                    <Link onClick={() => dispatch(logout())}>
                                        Logout
                                    </Link>
                                ) : (
                                    <Link to={"/login"}>Sign In</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
