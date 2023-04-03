import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "@store/store";
import { Router } from "./routes";
import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./views/pages/User/Profile";
import Register from "./views/pages/Auth/Register";
import ResetPassWord from "./views/pages/Auth/ResetPassword";

function App() {
    return (
        <Provider store={store}>
            <div>
                {/* <BrowserRouter>
                    <Router />
                </BrowserRouter> */}
                {/* <Profile /> */}
                {/* <Register /> */}
                <ResetPassWord />
            </div>
        </Provider>
    );
}

export default App;
