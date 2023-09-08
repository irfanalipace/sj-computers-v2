import cookiesService from "./cookiesService";
import { initLogService } from "./logServices";

const initServices = {
    init() {
        cookiesService.init(); // sets user visit data in cookies
        initLogService();
    },
};

initServices.init();

export default initServices;
