import {API_BASE_URL} from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

export interface GetUserInfoInterface {
    id: string
    username: string
    email: string
    role: 'USER' | 'ORGANIZER' | 'ADMIN'
    name: string
    address: string
    phoneNumber: string
    bio: string
}


class UserService {
    private readonly token: string | undefined
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getUserInfo() {
        let userInfo: GetUserInfoInterface | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/user`, {
                    // TODO: Add headers in getUser backend
                    headers: {
                        'Authorization': `Bearer ${(this.token)}`,
                        'AllInfo': true
                    }
                })
                userInfo = response.data as GetUserInfoInterface
            }
            return userInfo
        } catch (e) {
            console.error('Error fetching user info: ', e)
            throw e
        }
    }
}

export default new UserService()