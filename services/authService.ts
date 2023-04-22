import axios from "axios";
import Cookies from "js-cookie";
import {API_BASE_URL} from "@/config";

const API_URL = `${API_BASE_URL}/auth`;

const register = async (username: string, password: string, email: string) => {
    const response = await axios.post(`${API_URL}/register`, {
        username: username,
        password: password,
        email: email,
    },
    {
        headers: {
            'Content-Type': "application/json",
        }
    });
    return response.data;
};

const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password,
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const { token } = response.data;
    if (token) {
        Cookies.set("jwt", token);
    }
    return response;
};

const logout = () => {
    Cookies.remove("jwt");
};

const isAuthenticated = () => {
    const token = Cookies.get("jwt");
    return token !== undefined;
};

export default {
    register,
    login,
    logout,
    isAuthenticated,
};