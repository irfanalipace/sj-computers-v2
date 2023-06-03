import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@store/store";
import { initServices } from "@services/initServices";

// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.js";
const root = createRoot(document.getElementById("root"));
console.log("11 index");
initServices(); //initialize services

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
