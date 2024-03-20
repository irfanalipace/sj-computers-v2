import axios from 'axios';
import { toast } from 'react-toastify';
import { destroyToken } from '@services/authService';
import { getToken } from './authService';
import config from './configService';
/**
 * Service to call HTTP request via Axios
 */

const ACCEPTED_ERROR_CODES = [400, 401, 403, 404, 422, 429];

const ApiService = {
  instance: null,

  init() {
    if (!this.instance) {
      this.instance = axios.create({ withCredentials: true });
      this.instance.defaults.baseURL = config.VITE_APP_API_BASE_URL;
      console.log('api url: ', config.VITE_APP_API_BASE_URL);
      this.instance.defaults.headers['content-type'] = 'application/json';

      this.setupResponseInterceptor(); // Setup response interceptor
      this.setupRequestInterceptor(); // Setup request interceptor
    }
  },
  // Setup request interceptor
  setupRequestInterceptor() {
    this.instance.interceptors.request.use(
      request => {
        const token = getToken();
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      error => {
        return Promise.reject(error);
      },
    );
  },
  // Setup response interceptor
  setupResponseInterceptor() {
    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          toast.error(
            'User not authorized. Please login to perform this action',
          );
          destroyToken();
          window.location.href = '/login';
        } else if (!ACCEPTED_ERROR_CODES.includes(error?.response?.status)) {
          toast.error('Something Went Wrong');
        } else if (error?.response?.status === 429) {
          toast.error('Too Many Requests');
        }
        return Promise.reject(error);
      },
    );
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

  setDefaultBaseUrl(url = config.VITE_APP_API_BASE_URL) {
    this.instance.defaults.baseURL = url;
  },

  /**
   * Set the default Base URL of api requests =  OTO BAse URL
   */

  setOTOBaseUrl() {
    this.instance.defaults.baseUrl = config.VITE_APP_OTO_BASE_URL;
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {*}
   */

  get(resource, slug = '', params = {}, baseURL) {
    this.setAuthorization();
    return new Promise((resolve, reject) => {
      const url = `${resource}${slug ? `/${slug}` : ''}`;
      if (baseURL) this.setDefaultBaseUrl(baseURL);
      this.instance
        .get(url, { params })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error?.response);
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

  post(resource, params = {}, baseURL, token, isFormData = false) {
    this.setAuthorization(token);
    return new Promise((resolve, reject) => {
      if (baseURL) this.setDefaultBaseUrl(baseURL);
      const headers = isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };
      this.instance
        .post(`${resource}`, params, { headers })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
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
    return this.instance
      .put(`${resource}`, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error?.response);
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
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error?.response);
      });
  },
};

// ApiService.init();

export default ApiService;
