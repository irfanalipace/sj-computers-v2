export const initLogService = () => {
    // Replace the global console object
    if (process.env.NODE_ENV === "development") {
        // Create a custom console object
        const print = function (...args) {
            console.log(...args);
        };
        window.console.print = print;
    } else window.console.print = () => {};
};
