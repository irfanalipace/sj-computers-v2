import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getToken } from "@services/jwtService";
import { Router } from "@src/Routes";
import { alreadyLoggedIn } from "@store/auth/authThunks";
import { useInitDataFetching } from "@hooks/useInitDataFetching";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useEffect } from "react";
function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn(token));
    useInitDataFetching();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    return (
        <div>
            <ToastContainer className={"notification-toast"} />
            <BrowserRouter>
                <Header />
                <div className="inner-body">
                    <Router />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
