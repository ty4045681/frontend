import {API_BASE_URL} from "@/config";
import Cookies from "js-cookie";
import axios from "axios";
import UserType from "@/interfaces/UserType";
import {AdminConferencesInfo, AdminPapersInfo, AdminUsersInfo} from "@/interfaces/DashboardTypes";

class AdminService {
    private readonly token: string | undefined
    private readonly API_URL = `${API_BASE_URL}/admin`
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getCountConferencesByStatus(id: string, status: ApplyStatus) {
        try {
            const response = await axios.get(`${this.API_URL}/adminId=${id}/count/conference/status=${status}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as number
        } catch (e) {
            console.error("Error counting conferences by status", e)
            throw e
        }
    }

    async getCountUsersByType(id: string, type: UserType) {
        try {
            const response = await axios.get(`${this.API_URL}/adminId=${id}/count/user/type=${type}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as number
        } catch (e) {
            console.error("Error counting users by type", e)
            throw e
        }
    }

    async getConferencesByAdminId(id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/adminId=${id}/conference`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as AdminConferencesInfo[]
        } catch (e) {
            console.error("Error getting conferences by admin id", e)
            throw e
        }
    }

    async getPapersByAdminId(id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/adminId=${id}/paper`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as AdminPapersInfo[]
        } catch (e) {
            console.error("Error getting papers by admin id", e)
            throw e
        }
    }

    async getUsersByAdminId(id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/adminId=${id}/user`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as AdminUsersInfo[]
        } catch (e) {
            console.error("Error getting users by admin id", e)
            throw e
        }
    }

    async deleteSelectedConferencesOfAdminId(id: string, conferenceIds: string[]) {
        try {
            if(this.token !== undefined) {
                const response = await axios.delete(`${this.API_URL}/adminId=${id}/conference`, {
                    data: {ids: conferenceIds},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })

                if (response.status !== 200) {
                    console.error("Error deleting selected conferences of admin id: ", response)
                    throw new Error("Error deleting selected conferences of admin id")
                }
            }
        } catch (e) {
            console.error("Error deleting selected conferences of admin id: ", e)
            throw e
        }
    }

    async deleteSelectedUsersOfAdminId(id: string, userIds: string[]) {
        try {
            if (this.token !== undefined) {
                const response = await axios.delete(`${this.API_URL}/adminId=${id}/user`, {
                    data: {ids: userIds},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })

                if (response.status !== 200) {
                    console.error("Error deleting selected users of admin id: ", response)
                    throw new Error("Error deleting selected users of admin id")
                }
            }
        } catch (e) {
            console.error("Error deleting selected users of admin id: ", e)
            throw e
        }
    }

    async changeUserStatus(id: string, attendanceId: string, newStatus: ApplyStatus) {
         try {
             if (this.token !== undefined) {
                 const response = await axios.post(`${this.API_URL}/adminId=${id}/attendanceId=${attendanceId}/status=${newStatus}`, {}, {
                     headers: {
                         'Authorization': `Bearer ${this.token}`,
                     }
                 })

                 if (response.status !== 200) {
                     console.error("Error changing user status: ", response)
                     throw new Error("Error changing user status")
                 }
             }
         } catch (e) {
             console.error("Error changing user status: ", e)
             throw e
         }
    }
}

export default new AdminService()