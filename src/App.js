import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getToken } from "@services/jwtService";
import Router from "@src/Routes";
import { alreadyLoggedIn } from "@store/auth/authThunks";
import { useInitDataFetching } from "@hooks/useInitDataFetching";
import TawkTo from "@components/Tawk.To/Messenger";
import initServices from "@services/initServices";

// import Header from "@components/Header/Header";
import Header from "@components/Header/Header";
import Loader from "@common/LoaderComponent/LoaderComponent";

const Footer = React.lazy(() => import("@components/Footer/Footer"));

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./App.css";

import ScrollToTop from "./ScrollToTop";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn(token));
    initServices.init(); //initialize services
    useInitDataFetching();

    // const location = useLocation();
    // ${process.env.REACT_APP_URL}
    // const hideHeaderFooter = window.location.pathname === `/thank-you`;

    // console.print(hideHeaderFooter, "header and footer")

    return (
        <div>
            <TawkTo />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className={"notification-toast"}
            />
            <BrowserRouter>
                {/* scroller set for scroll bottom to top  */}
                <ScrollToTop />
                <Suspense>
                    <Header />
                </Suspense>
                <div className="inner-body">
                    <Router />
                </div>
                <Suspense>
                    <Footer />
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
