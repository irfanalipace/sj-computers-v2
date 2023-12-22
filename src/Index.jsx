import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@store/store";

// import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<<< HEAD:src/main.jsx
import App from "./App";
========
import App from "./App.jsx";
>>>>>>>> react-development:src/Index.jsx
const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
