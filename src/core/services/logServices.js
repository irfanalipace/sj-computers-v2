export const initLogService = () => {
    // Replace the global console object to disable logging on production
    console.log("11 env: ", process.env.REACT_APP_ENVIRONMENT);
    if (process.env.NODE_ENV === "development") {
        // Create a custom console object
        const print = function (...args) {
            console.log(...args);
        };
        window.console.print = print;
    } else {
        console.log("11 else running");
        window.console.print = () => {};
    }
};
