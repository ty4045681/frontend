import {Conference} from "@/interfaces/conference";
import Cookies from "js-cookie";
import {API_BASE_URL} from "@/config";
import axios from "axios";

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
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getUserConference() {
        let userConference: UserConferenceTableData[] | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/conference`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                userConference = response.data as UserConferenceTableData[]
            }
            return userConference
        } catch (e) {
            console.error('Error fetching user conference: ', e)
            throw e
        }
    }

    async getConferenceById(id: string) {
        let conferenceTitle: string | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference/${id}`)
            conferenceTitle = response.data.title as string
            return conferenceTitle
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