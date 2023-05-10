import Cookies from "js-cookie";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import { UserConferenceInfo } from "@/interfaces/DashboardTypes";

class AttendanceService {
    private readonly token: string | undefined
    private readonly API_URL = `${API_BASE_URL}/attendance`

    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getCountAttendanceByUserAndConferenceTimeAndStatus(isConferenceUpcoming: boolean, status: ApplyStatus) {
        const formData = new FormData()
        formData.append("isConferenceUpcoming", String(isConferenceUpcoming))
        formData.append("status", String(status))

        try {
            if (this.token !== undefined) {
                const response = await axios.post(`${this.API_URL}/info`, formData, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                return response.data as number
            }
            return -1
        } catch (e) {
            console.error('Error fetching info: ', e)
            throw e
        }
    }

    async getConferencesByUserId(userId: string): Promise<UserConferenceInfo[]> {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/userId=${userId}`)
                return response.data as UserConferenceInfo[]
            }
            return []
        } catch (error) {
            console.error('Error fetching user conferences:', error);
            throw error;
        }
    }
}

export default new AttendanceService()