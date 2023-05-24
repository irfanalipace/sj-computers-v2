import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@store/auth/authThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "@common/Spinner/Spinner";
import userImg from "@images/user.png";
import { US } from "country-flag-icons/react/3x2";

import "./Sidebar.css";

export default function Sidebar({ openState, toggleSidebar }) {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const categoryLoader = useSelector((state) => state.category.isLoading);
    const categories = useSelector((state) => state.category.categories);

    const [visibleCategories, setVisibleCategories] = useState(8);

    const handleShowMore = () => {
        setVisibleCategories(
            (prevVisibleCategories) => prevVisibleCategories + 8
        );
    };

    let renderedCategories = categories
        .slice(0, visibleCategories)
        .map((category) => (
            <li key={category.id} onClick={() => toggleSidebar()}>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
                <FontAwesomeIcon icon={faAngleRight} />
            </li>
        ));

    const dispatch = useDispatch();

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
                            <p className="mb-0">
                                Hello,{" "}
                                {isAuthenticated ? (
                                    user?.name
                                ) : (
                                    <Link to={"/login"}>Sign In</Link>
                                )}
                            </p>
                        </div>
                        <div className="sideMenu">
                            <h4>Shop By Category</h4>
                            {categoryLoader ? (
                                <div className="d-flex justify-content-center my-2">
                                    <Loader />
                                </div>
                            ) : (
                                <ul className="menu-list">
                                    {renderedCategories}
                                    {visibleCategories < categories.length && (
                                        <li>
                                            <button onClick={handleShowMore}>
                                                <span className="me-2">
                                                    Show More
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                />
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            )}

                            <h4>Help & Settings</h4>
                            <ul className="menu-list">
                                {isAuthenticated && (
                                    <li>
                                        <Link
                                            to={`/account`}
                                            onClick={() => toggleSidebar()}
                                        >
                                            Your Account
                                        </Link>
                                    </li>
                                )}
                                <li className="d-block">
                                    <FontAwesomeIcon
                                        className="me-1"
                                        icon={faGlobe}
                                    />
                                    <Link onClick={() => toggleSidebar()}>
                                        English
                                    </Link>
                                </li>
                                <li className="d-block">
                                    <US
                                        title="United States"
                                        className="country-flag"
                                    />
                                    <Link
                                        className="ms-1"
                                        onClick={() => toggleSidebar()}
                                    >
                                        United States
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => toggleSidebar()}>
                                        Customer Services
                                    </Link>
                                </li>
                                <li >
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
                                        <Link to={"/login"} onClick={() => toggleSidebar()}>Sign In</Link>
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
