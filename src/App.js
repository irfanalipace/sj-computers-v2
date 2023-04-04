import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Router } from "./routes";
import { alreadyLoggedIn } from "@store/auth/authSlice";
import { getToken } from "@services/jwtService";

function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) {
        dispatch(alreadyLoggedIn());
    }

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;
