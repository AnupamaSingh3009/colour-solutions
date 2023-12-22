import React, { createContext, useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import { URLs } from "../urls";
import axios from 'axios'
import {setAuthCookie} from "../utils";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState();
    
    const login = async (authDetails) => {
        try {
            const response = await axios.post(URLs.LOGIN_URL, authDetails);
            setAuth(response.data);
            setAuthCookie(response.data)
            return response.data.accessToken;
        } catch(error) {
            window.sessionStorage.removeItem('account');
            throw error;
        }
    };

    const logout = () => {
        window.sessionStorage.removeItem('account');
        setAuth({});
    };

    return (
        <authContext.Provider value={{auth, login, logout}}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
};
  