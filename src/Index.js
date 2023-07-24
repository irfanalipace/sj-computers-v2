import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@store/store";

// import "bootstrap/dist/css/bootstrap.min.css";
const App = React.lazy(() => import("./App.js"));
const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <Suspense>
            <App />
        </Suspense>
    </Provider>
);
