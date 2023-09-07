const cookiesService = {
    setCookie: (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },
    getCookie: (name) => {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    },
    deleteCookie: (name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    },
    setUserTracking: function () {
        // Function sets the user's latest visit date in a cookie

        try {
            this.checkLastVisitDate();
            const lastVisitDate = getCurrentDate();
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 365);
            const cookie = `${encodeURIComponent(
                "visited"
            )}=${encodeURIComponent(
                lastVisitDate
            )};expires=${expirationDate.toUTCString()};path=/`;
            document.cookie = cookie;
        } catch (error) {
            console.error(error); // Changed from console.print to console.error
        }
    },
    checkLastVisitDate: function () {
        // This Function checks when the user last visited our website
        try {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i]?.trim();
                if (cookie?.startsWith(`visited=`)) {
                    const cookieValue = cookie?.substring("visited".length + 1);
                    let decodedDate = decodeURIComponent(cookieValue);

                    if (
                        new Date(decodedDate).getTime() <=
                        new Date(dateToCheck).getTime()
                    ) {
                        this.actionToPerform();
                    }
                }
            }
            return false;
        } catch (error) {
            console.error(error); // Changed from console.print to console.error
        }
    },
    actionToPerform: function () {
        // Define the action to perform here
    },
    init: function () {
        this.setUserTracking();
    },
};

const dateToCheck = "2023-06-07";

function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${year}-${month}-${day}`;
}

export default cookiesService;
