import axios from "axios";
import {getAuthCookie, removeAuthCookie} from "./utils";

//Add request interceptor
axios.interceptors.request.use(config => {
    const accessToken = getAuthCookie() || undefined;
    if(!!accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    if(!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, error => Promise.reject(error));


axios.interceptors.response.use(response => {
    return response;
}, error => {
    const response = error.response;
    if(response && (response.status === 401 || response.status === 403)) {
        removeAuthCookie();
        window.location.href='/login';
    }
    return Promise.reject(error);
});