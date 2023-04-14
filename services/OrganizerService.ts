import {GetUserInfoInterface} from "@/services/UserService";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export interface GetOrganizerInfoInterface extends GetUserInfoInterface {}

export interface OrganizerConferenceData {
    id: string
    title: string
}

export interface GetUserByConferenceIdInterface {
    id: string
    username: string
    name: string
    status: ApplyStatus
}

export interface GetPaperByConferenceIdInterface {
    title: string
    authors: string[]
    abstract: string
    keywords: string[]
    status: ApplyStatus
}

class OrganizerService {
    private readonly token: string | undefined
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getOrganizerInfo() {
        let organizerInfo: GetOrganizerInfoInterface | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/organizer`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                organizerInfo = response.data as GetOrganizerInfoInterface
            }
            return organizerInfo
        } catch (e) {
            console.error('Error fetching organizer info: ', e)
            throw e
        }
    }

    async getOrganizerConference() {
        let organizerConference: OrganizerConferenceData[] | null = null
        try {
            const response = await axios.get(`${API_BASE_URL}/conference`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                }
            })
            organizerConference = response.data as OrganizerConferenceData[]
            return organizerConference
        } catch (e) {
            console.error('Error fetching organizer conference: ', e)
            throw e
        }
    }

    async getUserByConferenceId(id: string) {
        let userByConferenceId: GetUserByConferenceIdInterface[] | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/organizer/conference/${id}/user`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                userByConferenceId = response.data as GetUserByConferenceIdInterface[]
            }
            return userByConferenceId
        } catch (e) {
            console.error('Error fetching user by conference id: ', e)
            throw e
        }
    }

    async getPaperByConferenceId(id: string) {
        let paperByConferenceId: GetPaperByConferenceIdInterface[] | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/organizer/conference/${id}/paper`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                paperByConferenceId = response.data as GetPaperByConferenceIdInterface[]
            }
            return paperByConferenceId
        } catch (e) {
            console.error('Error fetching paper by conference id: ', e)
            throw e
        }
    }
}

export default new OrganizerService()