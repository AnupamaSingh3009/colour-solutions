import Cookies from "universal-cookie/es6";
import {Toast, ToastContainer} from "react-bootstrap";

export const getAxiosError = (error) => {
    if(typeof error === 'object' && error.name === 'AxiosError') {
        return error.response ?
            {
                status: error.response.status,
                message: error.response.data.message || error.message || ''
            } : undefined;
    }
}

const cookie = new Cookies()
export const setAuthCookie = (data) => {
    const expiresIn = data.expiresIn.substring(0, data.expiresIn.length - 1);
    const unit = data.expiresIn.substring(data.expiresIn.length - 1, data.expiresIn.length);
    let expires= 1000;
    if(unit === 'm') {
        expires*=60;
    }else if(unit === 'h') {
        expires*=3600;
    }else if(unit === 'd') {
        expires*=24*3600;
    }
    const accessToken = data.accessToken;
    expires*=expiresIn;
    expires+= (new Date()).getTime();
    cookie.set('account', accessToken, {expires: new Date(expires)})
}

export const getAuthCookie = () => {
    return cookie.get('account')
}

export const removeAuthCookie = () => {
    cookie.remove('account');
}

