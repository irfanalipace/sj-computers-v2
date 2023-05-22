import axios from "axios";
import { toast } from "react-toastify";
import { destroyToken } from "@services/jwtService";

/**
 * Service to call HTTP request via Axios
 */

const ACCEPTED_ERROR_CODES = [400, 401, 403, 422];

const ApiService = {
    instance: null,
    init() {
        if (!this.instance) {
            this.instance = axios.create({ withCredentials: true });
            this.instance.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
            console.log("api url: ", process.env.REACT_APP_API_BASE_URL);
            this.instance.defaults.headers["content-type"] = "application/json";
        }
    },

    /**
     * Set the default HTTP request headers
     */

    setHeader(header, val) {
        this.instance.defaults.headers[header] = val;
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {*}
     */

    get(resource, slug = "", params = {}) {
        console.log("params", params);
        return new Promise((resolve, reject) => {
            const url = `${resource}${slug ? `/${slug}` : ""}`;
            this.instance
                .get(url, { params })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    if (error?.response?.status === 401) {
                        destroyToken();
                    }
                    if (
                        !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                    ) {
                        toast.error("Something Went Wrong");
                    }
                    reject(error.response);
                });
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */

    post(resource, params = {}) {
        return new Promise((resolve, reject) => {
            this.instance
                .post(`${resource}`, params)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.log("error status: ", error.response.status);
                    if (error?.response?.status === 401) {
                        destroyToken();
                    }
                    if (
                        !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                    ) {
                        toast.error("Something Went Wrong");
                    }
                    reject(error.response);
                });
        });
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */

    put(resource, params) {
        return this.instance
            .put(`${resource}`, params)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error, status) => {
                if (error?.response?.status === 401) {
                    destroyToken();
                }
                if (ACCEPTED_ERROR_CODES.includes(error?.response?.status)) {
                    toast.error("Something Went Wrong");
                }
                reject(error.response);
            });
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */

    delete(resource) {
        return this.instance
            .delete(resource)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error, status) => {
                if (error?.response?.status === 401) {
                    destroyToken();
                }
                if (ACCEPTED_ERROR_CODES.includes(error?.response?.status)) {
                    toast.error("Something Went Wrong");
                }
                reject(error.response);
            });
    },
};

ApiService.init();

export default ApiService;
