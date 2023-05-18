import { Conference } from "@/interfaces/conference";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import {OrganizerConferenceInfo, UserConferenceInfo} from "@/interfaces/DashboardTypes";

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

export interface AllConferencesByDateInfo {
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
        let allUpcomingConference: AllConferencesByDateInfo[] | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference`, {
                headers: {
                    "Upcoming": "true"
                }
            })
            allUpcomingConference = response.data as
                AllConferencesByDateInfo[]
            allUpcomingConference = allUpcomingConference.map(conference => ({
                ...conference,
                startDate: this.formatDate(conference.startDate),
                endDate: this.formatDate(conference.endDate),
            }))
            return allUpcomingConference
        } catch (e) {
            console.error('Error fetching all upcoming conference: ', e)
            throw e
        }
    }

    async getAllPastConference() {
        let allPastConference: AllConferencesByDateInfo[] | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference`, {
                headers: {
                    "Past": "true"
                }
            })
            allPastConference = response.data as
                AllConferencesByDateInfo[]
            allPastConference = allPastConference.map(conference => ({
                ...conference,
                startDate: this.formatDate(conference.startDate),
                endDate: this.formatDate(conference.endDate),
            }))
            return allPastConference
        } catch (e) {
            console.error('Error fetching all past conference: ', e)
            throw e
        }
    }

    async getAllOngoingConference() {
        let allOngoingConference: AllConferencesByDateInfo[] | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference`, {
                headers: {
                    "Ongoing": "true"
                }
            })
            allOngoingConference = response.data as
                AllConferencesByDateInfo[]
            allOngoingConference = allOngoingConference.map(conference => ({
                ...conference,
                startDate: this.formatDate(conference.startDate),
                endDate: this.formatDate(conference.endDate),
            }))
            return allOngoingConference
        } catch (e) {
            console.error('Error fetching all ongoing conference: ', e)
            throw e
        }
    }

    formatDate(isoDateString: string): string {
        const date = new Date(isoDateString);
        const options: Intl.DateTimeFormatOptions = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        };
        
        return date.toLocaleString(undefined, options);
      }
      
}

export default new ConferenceService()