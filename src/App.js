import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, useLocation } from "react-router-dom";
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
import "./App.css";
// import "./assets/bootstrap/bootstrap.css";

import ScrollToTop from "./ScrollToTop";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn(token));

    // to clear the cart and cart Details keys from local storage
    if (window.localStorage.getItem("clearCartKeys")) {
        window.localStorage.removeItem("clearCartKeys");
    }
    useInitDataFetching();

    // const location = useLocation();
    // ${process.env.REACT_APP_URL}
    const hideHeaderFooter = window.location.pathname === `/thank-you`;

    // console.log(hideHeaderFooter, "header and footer")

    return (
        <div>
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
