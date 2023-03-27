import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8081/api/auth";

const register = async (username: string, password: string, email: string) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {
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
    const response = await axios.post(`${API_BASE_URL}/login`, {
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
    return token;
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