import axios from "axios";
import { getToken, destroyToken } from "@services/jwt.service";

/**
 * Service to call HTTP request via Axios
 */

const ApiService = {
    instance: null,
    init() {
        if (!this.instance) {
            this.instance = axios.create({ withCredentials: true });
            this.instance.defaults.baseURL = process.env.API_BASE_URL;
            this.instance.defaults.headers["content-type"] = "Application/JSON";
            if (getToken()) {
                this.setHeader("Authorization", `Bearer ${getToken()}`);
            }
        }
    },

    /**
     * Set the default HTTP request headers
     */

    setHeader(header, val) {
        this.instance.defaults.headers[header] = val;
    },

    query(resource, params) {
        return this.instance.get(resource, params).catch((error) => {
            throw new Error(`ApiService ${error}`);
        });
    },
    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */

    get(resource, slug = "") {
        return new Promise((resolve, reject) => {
            this.instance
                .get(`${resource}/${slug}`)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    const err = {
                        data: {
                            success: 0,
                            message: error.message,
                            url: this.instance.defaults.baseURL + resource,
                        },
                    };
                    if (error.response.status === 401) {
                        destroyToken();
                    }
                    reject(err);
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
                    resolve(res);
                })
                .catch((error) => {
                    // console.log(error.response.data);
                    // console.log(error.response.headers);
                    const err = {
                        data: {
                            success: 0,
                            message: error.message,
                            url: this.instance.defaults.baseURL + resource,
                        },
                    };
                    if (error.response.status === 401) {
                        destroyToken();
                    }
                    reject(err);
                });
        });
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */

    update(resource, slug, params) {
        return this.instance.put(`${resource}/${slug}`, params);
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */

    put(resource, params) {
        return this.instance.put(`${resource}`, params);
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */

    delete(resource) {
        return this.instance.delete(resource).catch((error) => {
            // console.log(error);
            throw new Error(`ApiService ${error}`);
        });
    },
};

ApiService.init();

export default ApiService;
