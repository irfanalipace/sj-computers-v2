import { setUserTracking } from "./cookiesService";
import { initLogService } from "./logServices";

export const initServices = () => {
    console.log("11 initServices");
    setUserTracking(); // sets user visit data in cookies
    initLogService();
};
