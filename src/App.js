import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getToken } from "@services/jwtService";
import { Router } from "@src/Routes";
import { ALREADY_LOGGED_IN } from "@store/auth/authSlice";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(ALREADY_LOGGED_IN());

    return (
        <div>
            <ToastContainer className={"notification-toast"} />
            <BrowserRouter>
                <Header />
                <Router />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
