import {GetUserInfoInterface} from "@/services/UserService";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import Cookies from "js-cookie";
import {
    OrganizerAttendeesInfo,
    OrganizerConferenceInfo,
    OrganizerJudgesInfo,
    OrganizerPaperInfo
} from "@/interfaces/DashboardTypes";

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
    private readonly API_URL = `${API_BASE_URL}/organizer`
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

    async getOrganizerConference(id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/organizerId=${id}/conference`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                }
            })
            return response.data as OrganizerConferenceInfo[]
        } catch (e) {
            console.error('Error fetching organizer conference: ', e)
            throw e
        }
    }

    async getOrganizerAttendee(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/organizerId=${id}/attendee`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                return  response.data as OrganizerAttendeesInfo[]
            }
            return []
        } catch (e) {
            console.error('Error fetching user by organizer id: ', e)
            throw e
        }
    }

    async getOrganizerPaper(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/organizerId=${id}/paper`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                return response.data as OrganizerPaperInfo[]
            }
            return []
        } catch (e) {
            console.error('Error fetching paper by organizer id: ', e)
            throw e
        }
    }

    async getOrganizerJudge(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/organizerId=${id}/judge`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                return response.data as OrganizerJudgesInfo[]
            }
            return []
        } catch (e) {
            console.error("Error fetching judge by organizer id", e)
            throw e
        }
    }

    async getCountConferencesByOrganizer(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/id=${id}/conference/count`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                return response.data as number
            }
            return -1
        } catch (e) {
            console.error("Error fetching count of conferences by organizer: ", e)
            throw e
        }
    }

    async getCountPapersByOrganizer(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/id=${id}/paper/count`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                return response.data as number
            }
            return -1
        } catch (e) {
            console.error("Error fetching count of papers by organizer: ", e)
            throw e
        }
    }

    async getCountAllAttendeesByOrganizer(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/id=${id}/attendees/count=all`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                return response.data as number
            }
            return -1
        } catch (e) {
            console.error("Error fetching count of all attendees by organizer: ", e)
            throw e
        }
    }

    async getCountAllReviewersByOrganizer(id: string) {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/id=${id}/reviewers/count=all`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                return response.data as number
            }
            return -1
        } catch (e) {
            console.error("Error fetching count of all reviewers by organizer: ", e)
            throw e
        }
    }

    async deleteSelectedConferencesOfOrganizerId(id: string, conferenceIds: string[]) {
        try {
            if (this.token !== undefined) {
                const response = await axios.delete(`${this.API_URL}/organizerId=${id}/conference`, {
                    data: {ids: conferenceIds},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })

                if (response.status !== 200) {
                    console.error("Error deleting selected conferences of organizer id: ", response)
                    throw new Error("Error deleting selected conferences of organizer id")
                }
            }
        } catch (e) {
            console.error("Error deleting selected conferences of organizer id: ", e)
            throw e
        }
    }
}

export default new OrganizerService()