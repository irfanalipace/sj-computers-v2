import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@components/Sidebar/Sidebar";

import "./TopBar.css";

export default function TopBar() {
    const [isSideMenu, setSideMenu] = useState(false);
    const toggleSidebar = () => {
        return setSideMenu((state) => !state);
    };

    return (
        <>
            <header className="topBar">
                <div className="menuBar">
                    <span
                        className="navIcon"
                        onClick={() => {
                            toggleSidebar();
                        }}
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

                    <ul className="menu-sidebar text-decoration-none ullist">
                        <li className="listitem">
                            <a
                                href="default.asp"
                                className="text-decoration-none text-color"
                            >
                                Today's Deal
                            </a>
                        </li>
                        <li className="listitem">
                            <a
                                href="news.asp"
                                className="text-decoration-none text-color"
                            >
                                Laptop
                            </a>
                        </li>
                        <li className="listitem">
                            <a
                                href="contact.asp"
                                className="text-decoration-none text-color"
                            >
                                Desktop
                            </a>
                        </li>
                        <li className="listitem">
                            <a
                                href="about.asp"
                                className="text-decoration-none text-color"
                            >
                                Monitors
                            </a>
                        </li>
                        <li className="listitem">
                            <a
                                href="about.asp"
                                className="text-decoration-none text-color"
                            >
                                BTO
                            </a>
                        </li>
                    </ul>
                    {/* <span style={{ textAlign: "end" }}>Get Top Deals Now</span> */}
                </div>
            </header>

            <Sidebar openState={isSideMenu} toggleSidebar={toggleSidebar} />
        </>
    );
}
