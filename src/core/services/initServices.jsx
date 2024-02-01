import ApiService from "./apiService";
import cookiesService from "./cookiesService";
import { initLogService } from "./logServices";

const initServices = {
    init() {
        cookiesService.init(); // sets user visit data in cookies
        initLogService(); // service to remove logs in production
        ApiService.init(); //initializes api service
    },
};

initServices.init();

export default initServices;
