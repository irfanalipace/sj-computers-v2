import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import userImg from "@images/user.png";

import "./Sidebar.css";
export default function Sidebar({ openState, toggleSidebar }) {
    const user = useSelector((state) => state.auth.user);
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
                        <span>Hello, {user ? user.name : "Sign In"}</span>
                    </div>
                    <div className="sideMenu">
                        <h4>Shop By Category</h4>
                        <ul className="menu-list">
                            {categories.map((category) => (
                                <li key={category}>
                                    <Link to={`/category/${category.id}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
