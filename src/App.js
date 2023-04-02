import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "@core/store/store";
import { Router } from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
