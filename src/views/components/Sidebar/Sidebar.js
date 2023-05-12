import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@store/auth/authThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "@common/Spinner/Spinner";
import userImg from "@images/user.png";
import { US } from "country-flag-icons/react/3x2";

import "./Sidebar.css";

export default function Sidebar({ openState, toggleSidebar }) {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.isLoading);

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

    console.log("user.profile_pic: ", typeof user.profile_pic);

    return (
        <div>
            {openState && (
                <div
                    className="sidebarOverlay"
                    onClick={() => toggleSidebar()}
                ></div>
            )}
            <div
                className="sideMenu-container"
                style={{ left: openState ? "0" : "-350px" }}
            >
                <div className="sideMenu-wrapper">
                    <button
                        onClick={() => toggleSidebar()}
                        className="sideMenu-close-btn"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="sideMenu-inner">
                        <div className="sideMenu-header">
                            {user?.profile_pic == "null" ||
                            !user?.profile_pic ? (
                                <img
                                    className="me-3 default-image"
                                    src={userImg}
                                />
                            ) : (
                                <img className="me-3" src={user?.profile_pic} />
                            )}
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
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </li>
                                ))}
                            </ul>

                            <h4>Help & Settings</h4>
                            <ul className="menu-list">
                                {isAuthenticated && (
                                    <li>
                                        <Link to={`/account`}>
                                            Your Account
                                        </Link>
                                    </li>
                                )}
                                <li className="d-block">
                                    <FontAwesomeIcon
                                        className="me-1"
                                        icon={faGlobe}
                                    />
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
                                        <>
                                            {isLoading ? (
                                                <Loader />
                                            ) : (
                                                <Link
                                                    onClick={() =>
                                                        dispatch(logout())
                                                    }
                                                >
                                                    Logout
                                                </Link>
                                            )}
                                        </>
                                    ) : (
                                        <Link to={"/login"}>Sign In</Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
