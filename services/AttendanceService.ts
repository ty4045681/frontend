import { API_BASE_URL } from "@/config";
import { UserConferenceInfo } from "@/interfaces/DashboardTypes";
import axios from "axios";
import Cookies from "js-cookie";

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

  async deleteSelectedAttendancesOfUserId(userId: string, attendanceIds: string[]) {
    try {
      if (this.token !== undefined) {
        const response = await axios.delete(`${this.API_URL}/userId=${userId}/delete/attendance`, {
          data: { ids: attendanceIds },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })

        if (response.status !== 200) {
          console.error("Error deleting selected attendances of user id: ", response)
        }
      }
    } catch (error) {
      console.error('Error deleting selected attendances of user id: ', error)
      throw error
    }
  }
}



export default new AttendanceService()
