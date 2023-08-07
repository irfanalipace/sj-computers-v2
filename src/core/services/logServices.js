export const initLogService = () => {
    // Replace the global console object
    if (import.meta.env.REACT_APP_ENVIRONMENT === "development") {
        // Create a custom console object
        const print = function (...args) {
            console.log(...args);
        };
        window.console.print = print;
    } else {
        console.log(
            "%cIMPORTANT MESSAGE: For security reasons, please refrain from pasting or typing any code into the console!",
            "font-weight: bold; font-size: 20px; color: #FF0000;background-color: yellow"
        );
        console.log(
            "%cPasting code into the console can pose significant security risks and may expose sensitive information, such as personal data, login credentials, or API keys.Malicious actors can potentially exploit this information to compromise your accounts or gain unauthorized access to your data.To ensure the safety of your information, we strongly advise against pasting any code into the console or sharing sensitive data in this environment. Thank you for your understanding and cooperation!",
            "font-weight: bold; font-size: 16px; color: black;background-color: yellow"
        );
        window.console.print = () => {};
    }
};
