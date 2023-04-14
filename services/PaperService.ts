import {PaperData} from "@/interfaces/Paper";
import Cookies from "js-cookie";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import ConferenceService from "@/services/ConferenceService";

interface UserPaper extends PaperData {
    status: ApplyStatus
}

export interface UserPaperTableData {
    id: string
    title: string
    conferenceTitle: string
    authors: string[]
    abstract: string
    keywords: string[]
    status: ApplyStatus
}

class PaperService {
    private readonly token: string | undefined
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getUserPaper() {
        let userPaper: UserPaperTableData[] | null = null
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${API_BASE_URL}/paper`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })

                userPaper = await Promise.all(response.data.map(async (paper: UserPaper) => {
                    const conferenceTitle = paper.conferenceTitle
                    return {
                        ...paper,
                        conferenceTitle: conferenceTitle
                    }
                }))
            }
            return userPaper
        } catch (e) {
            console.error('Error fetching user paper: ', e)
            throw e
        }
    }
}

export default new PaperService()