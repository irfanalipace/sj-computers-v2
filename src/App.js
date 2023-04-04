import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import {getToken} from '@services/jwtService'
import { Router } from "./routes";
import {alreadyLoggedIn} from '@store/auth/authSlice'
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn());
    return (
        <BrowserRouter>
             <Router /> 
        </BrowserRouter>
    );
}

export default App;
