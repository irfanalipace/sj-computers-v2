import { saveUser } from "./jwtService";

// Function sets user latest visit date in cookie
export function setUserTracking() {
    try {
        checkLastVisitDate();
        const lastVisitDate = getCurrentDate();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 365);
        const cookie = `${encodeURIComponent("visited")}=${encodeURIComponent(
            lastVisitDate
        )};expires=${expirationDate.toUTCString()};path=/`;
        document.cookie = cookie;
    } catch (error) {
        console.log(error);
    }
}

const dateToCheck = "2023-05-29";

const actionToPerform = () => {
    window.localStorage.removeItem("cartDetails");
    let userName = window.localStorage.getItem("user_name");
    window.localStorage.removeItem("user_name");
    let userEmail = window.localStorage.getItem("user_email");
    window.localStorage.removeItem("user_email");
    let userImage = window.localStorage.getItem("user_image");
    window.localStorage.removeItem("user_image");
    let user = {
        name: userName,
        email: userEmail,
        profile_pic: userImage,
    };
    saveUser(user);
};

// This Function checks when did user last visited our website
function checkLastVisitDate() {
    try {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i]?.trim();
            if (cookie?.startsWith(`visited=`)) {
                const cookieValue = cookie?.substring("visited".length + 1);

                let decodedDate = decodeURIComponent(cookieValue);

                //  write all the conditions and opeartion to perform on conditions below

                if (
                    new Date(decodedDate).getTime() >=
                    new Date(dateToCheck).getTime()
                ) {
                    actionToPerform();
                }
            }
        }
        return false;
    } catch (error) {
        console.log(error);
    }
    const cookies = document.cookie.split(";");
}

function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${year}-${month}-${day}`;
}
