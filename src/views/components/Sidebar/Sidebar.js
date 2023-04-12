import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
export default function Sidebar({ openState }) {
    return (
        <div className="sideMenu" style={{ left: isSideMenu ? "0" : "-265px" }}>
            <a href="#">Menu 01</a>
            <a href="#">Menu 02</a>
            <a href="#">Menu 03</a>
            <a href="#">Menu 04</a>
            <a href="#">Menu 05</a>
            <a href="#">Menu 06</a>
            <a href="#">Menu 07</a>
            <a href="#">Menu 08</a>
            <a href="#">Menu 09</a>
        </div>
    );
}
