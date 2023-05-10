import { Conference } from "@/interfaces/conference";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { UserConferenceInfo } from "@/interfaces/DashboardTypes";

interface UserConference extends Conference {
    // TODO: Add this functionality in backend
    status: ApplyStatus
}

export interface UserConferenceTableData {
    id: string
    title: string
    startDate: string
    endDate: string
    status: ApplyStatus
}

export interface AllUpcomingConferences {
    id: string
    title: string
    startDate: string
    endDate: string
    location: string
    theme: string
    focus: string
}

class ConferenceService {
    private readonly token: string | undefined
    private readonly API_URL = `${API_BASE_URL}/conference`
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getConferenceById(id: string) {
        let conferenceTitle: string | null = null
        try {
            const response = await axios.get(`${this.API_URL}/id=${id}`)
            return response
        } catch (e) {
            console.error('Error fetching conference info: ', e)
            throw e
        }
    }

    async getAllUpcomingConference() {
        let allUpcomingConference: AllUpcomingConferences[] | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference`, {
                headers: {
                    "Upcoming": "true"
                }
            })
            allUpcomingConference = response.data as
                AllUpcomingConferences[]
            return allUpcomingConference
        } catch (e) {
            console.error('Error fetching all upcoming conference: ', e)
            throw e
        }
    }


}

export default new ConferenceService()