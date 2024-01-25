import axios from "axios";
import { toast } from "react-toastify";
import { destroyToken } from "@services/authService";
import { getToken } from "./authService";

/**
 * Service to call HTTP request via Axios
 */

const ACCEPTED_ERROR_CODES = [400, 401, 403, 404, 422, 429];

const ApiService = {
    instance: null,
    logout: null,
    init(logout) {
        this.logout = logout;
        if (!this.instance) {
            this.instance = axios.create({ withCredentials: true });
            this.instance.defaults.baseURL =
                import.meta.env.VITE_APP_API_BASE_URL;
            console.log("api url: ", import.meta.env.VITE_APP_API_BASE_URL);
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
     * Set the Authorization header for each request
     */

    setAuthorization(token) {
        this.instance.defaults.headers.Authorization = `Bearer ${
            token || getToken()
        }`;
    },

    /**
     * Set the default Base URL of api requests
     */

    setDefaultBaseUrl(url = import.meta.env.VITE_APP_API_BASE_URL) {
        this.instance.defaults.baseURL = url;
    },

    /**
     * Set the default Base URL of api requests =  OTO BAse URL
     */

    setOTOBaseUrl() {
        this.instance.defaults.baseUrl = import.meta.env.VITE_APP_OTO_BASE_URL;
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {*}
     */

    get(resource, slug = "", params = {}, baseURL) {
        this.setAuthorization();
        return new Promise((resolve, reject) => {
            const url = `${resource}${slug ? `/${slug}` : ""}`;
            if (baseURL) this.setDefaultBaseUrl(baseURL);
            this.instance
                .get(url, { params })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    if (error?.response?.status === 401) {
                        destroyToken();
                        toast.error(
                            "User not authorized. Please login to perform this action"
                        );
                        typeof this.logout === "function" && this.logout();
                    } else if (
                        !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                    ) {
                        toast.error("Something Went Wrong");
                    } else if (error?.response?.status === 429)
                        toast.error("Too Many Requests");
                    reject(error?.response);
                    console.log(error?.response, "abcd ");
                });
            if (baseURL) this.setDefaultBaseUrl();
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */

    post(resource, params = {}, baseURL, token) {
        this.setAuthorization(token);
        return new Promise((resolve, reject) => {
            if (baseURL) this.setDefaultBaseUrl(baseURL);

            this.instance
                .post(`${resource}`, params)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.print("error status: ", error?.response?.status);
                    if (error?.response?.status === 401) {
                        destroyToken();
                        toast.error(
                            "User not authorized. Please login to perform this action"
                        );
                        typeof this.logout === "function" && this.logout();
                    } else if (
                        !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                    ) {
                        toast.error("Something Went Wrong");
                    } else if (error?.response?.status === 429)
                        toast.error("Too Many Requests");
                    reject(error?.response);
                });
            if (baseURL) this.setDefaultBaseUrl();
        });
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */

    put(resource, params) {
        this.setAuthorization();
        return this.instance
            .put(`${resource}`, params)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error, status) => {
                if (error?.response?.status === 401) {
                    destroyToken();
                    toast.error(
                        "User not authorized. Please login to perform this action"
                    );
                    typeof this.logout === "function" && this.logout();
                } else if (
                    !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                ) {
                    toast.error("Something Went Wrong");
                } else if (error?.response?.status === 429)
                    toast.error("Too Many Requests");
                reject(error?.response);
            });
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */

    delete(resource) {
        this.setAuthorization();
        return this.instance
            .delete(resource)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error, status) => {
                if (error?.response?.status === 401) {
                    destroyToken();
                    typeof this.logout === "function" && this.logout();
                    toast.error(
                        "User not authorized. Please login to perform this action"
                    );
                } else if (
                    !ACCEPTED_ERROR_CODES.includes(error?.response?.status)
                ) {
                    toast.error("Something Went Wrong");
                } else if (error?.response?.status === 429)
                    toast.error("Too Many Requests");
                reject(error?.response);
            });
    },
};

ApiService.init();

export default ApiService;
