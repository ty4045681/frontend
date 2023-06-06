import {API_BASE_URL} from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

export interface GetUserInfoInterface {
    id: string
    username: string
    email: string
    name: string
    address: string
    phoneNumber: string
    bio: string
}


class UserService {
    private readonly token: string | undefined
    private readonly defaultUserInfo: GetUserInfoInterface
    private readonly API_URL = `${API_BASE_URL}/user`
    constructor() {
        this.token = Cookies.get("jwt")
        this.defaultUserInfo = {
            id: '',
            username: '',
            email: '',
            name: '',
            address: '',
            phoneNumber: '',
            bio: ''
        }
    }

    async getUserInfo() {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}`, {
                    // TODO: Add headers in getUser backend
                    headers: {
                        'Authorization': `Bearer ${(this.token)}`,
                        'AllInfo': true
                    }
                })
                return response.data as GetUserInfoInterface
            }
            return this.defaultUserInfo
        } catch (e) {
            console.error('Error fetching user info: ', e)
            throw e
        }
    }

    async updateUserInfo(newUserInfo: GetUserInfoInterface) {
        try {
            if (this.token !== undefined) {
                const response = await axios.put(`${this.API_URL}/id=${newUserInfo.id}`, newUserInfo, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json",
                    },
                });
                return response;
            }
        } catch (e) {
            console.error('Error fetching data: ', e);
            throw e;
        }
    }

    async changePassword(id: string, currentPassword: string, newPassword: string) {
        try {
            const response = await axios.put(`${this.API_URL}/change-password`, {
                id,
                currentPassword,
                newPassword
            }, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            return response;
        } catch (e) {
            console.error('Error updating password: ', e);
            throw e;
        }
    }

}

export default new UserService()