import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@store/store";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.js";
const root = createRoot(document.getElementById("root"));

var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/5d3165689b94cd38bbe8276d/default";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
})();

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
