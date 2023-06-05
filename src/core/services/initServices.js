import { setUserTracking } from "./cookiesService";
import { initLogService } from "./logServices";

const initServices = {
    init() {
        setUserTracking(); // sets user visit data in cookies
        initLogService();
    },
};

initServices.init();

export default initServices;
