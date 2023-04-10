import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getToken } from "@services/jwtService";
import { Router } from "@src/routes";
import { ALREADY_LOGGED_IN } from "@store/auth/authSlice";
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
                <Router />
            </BrowserRouter>
        </div>
    );
}

export default App;
