import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getToken } from "@services/jwtService";
import { Router } from "./routes";
import { alreadyLoggedIn } from "@store/auth/authSlice";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn());
    return (
        <div>
            <ToastContainer />
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
}

export default App;
