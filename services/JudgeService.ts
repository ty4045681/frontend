import {API_BASE_URL} from "@/config";
import Cookies from "js-cookie";
import axios from "axios";
import {JudgePapersInfo} from "@/interfaces/DashboardTypes";

class JudgeService {
    private readonly token: string | undefined
    private readonly API_URL = `${API_BASE_URL}/judge`
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getJudgePaper(id: string) {
        try {
            const response = await axios.get(`${this.API_URL}/judgeId=${id}/paper`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as JudgePapersInfo[]
        } catch (e) {
            console.error("Error fetching papers by judge id", e)
            throw e
        }
    }

    async getCountPapersByJudgeIdAndStatus(id: string, status: ApplyStatus) {
        try {
            const response = await axios.get(`${this.API_URL}/judgeId=${id}/count/paper/status=${status.toUpperCase()}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })
            return response.data as number
        } catch (e) {
            console.error("Error counting papers by judge id and status", e)
            throw e
        }
    }
}

export default new JudgeService()