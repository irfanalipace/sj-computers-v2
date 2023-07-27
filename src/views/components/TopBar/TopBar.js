import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = lazy(() => import("@components/Sidebar/Sidebar"));

import "./TopBar.css";

export default function TopBar() {
    const [isSideMenu, setSideMenu] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();

    const toggleSidebar = () => {
        setSideMenu((state) => !state);
    };

    const categories = [
        {
            id: 1,
            name: "BTO",
            slug: "bto",
        },
        {
            id: 2,
            name: "Laptops",
            slug: "laptops",
        },
        {
            id: 3,
            name: "Desktop",
            slug: "desktop",
        },
        {
            id: 4,
            name: "Monitor",
            slug: "monitor",
        },
    ];

    return (
        <>
            <header className="topBar px-3">
                <div className="topBar-inner">
                    <div className="menuBar">
                        <div className="all-menu">
                            <span
                                className="navIcon  hover-effect-sets"
                                onClick={toggleSidebar}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    {isSideMenu ? (
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                                    ) : (
                                        <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                                    )}
                                </svg>
                                <small className="small-text-size">All</small>
                            </span>
                        </div>

                        <ul className="text-decoration-none ullist">
                            {categories.map((category) => (
                                <li key={category.id} className="listitem">
                                    <Link
                                        to={`category/${category.slug}`}
                                        className={`text-decoration-none text-color hover-effect-sets-topbar ${
                                            selectedCategory === category.id &&
                                            location.pathname ===
                                                `/category/${category.slug}`
                                                ? "active-classfor-dev"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>

            <Sidebar openState={isSideMenu} toggleSidebar={toggleSidebar} />
        </>
    );
}
