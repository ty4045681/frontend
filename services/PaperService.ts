import {PaperData} from "@/interfaces/Paper";
import Cookies from "js-cookie";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import {UserPaperInfo} from "@/interfaces/DashboardTypes";

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
    private readonly API_URL = `${API_BASE_URL}/paper`
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async getPapersByUserId(userId: string): Promise<UserPaperInfo[]> {
        try {
            if (this.token !== undefined) {
                const response = await axios.get(`${this.API_URL}/userId=${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    }
                })
                return response.data as UserPaperInfo[]
            }
            return []
        } catch (e) {
            console.error('Error fetching papers by user id: ', e)
            throw e
        }
    }

    async deleteSelectedPapersOfUserId(userId: string, paperIds: string[]) {
        try {
            if (this.token !== undefined) {
                const response = await axios.delete(`${this.API_URL}/userId=${userId}`, {
                    data: {ids: paperIds},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })

                if (response.status !== 200) {
                    console.error("Error deleting selected papers of user id: ", response)
                    throw new Error("Error deleting selected papers of user id")
                }
            }
        } catch (e) {
            console.error("Error deleting selected papers of user id: ", e)
            throw e
        }
    }

    async getCountPaperByUser(): Promise<number> {
        const isConferenceUpcomings: boolean[] = [true, false];
        let count: number = 0;

        for (const isConferenceUpcoming of isConferenceUpcomings) {
            count += await this.getCountPaperByUserAndConferenceTime(isConferenceUpcoming);
        }

        return count;
    }

    async getCountPaperByUserAndConferenceTime(isConferenceUpcoming: boolean): Promise<number> {
        const statusArray: ApplyStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];
        let count: number = 0;

        for (const status of statusArray) {
            count += await this.fetchInfo(isConferenceUpcoming, status);
        }

        return count;
    }

    async getCountPaperByUserAndStatus(status: ApplyStatus): Promise<number> {
        const isConferenceUpcomings: boolean[] = [true, false];
        let count: number = 0;

        for (const isConferenceUpcoming of isConferenceUpcomings) {
            count += await this.fetchInfo(isConferenceUpcoming, status);
        }

        return count;
    }

    async getCountPaperByUserAndConferenceTimeAndStatus(
        isConferenceUpcoming: boolean | null = null,
        status: ApplyStatus | null = null
    ): Promise<number> {
        if (isConferenceUpcoming === null && status === null) {
            return await this.getCountPaperByUser();
        } else if (isConferenceUpcoming !== null && status === null) {
            return await this.getCountPaperByUserAndConferenceTime(isConferenceUpcoming);
        } else if (isConferenceUpcoming === null && status !== null) {
            return await this.getCountPaperByUserAndStatus(status);
        } else {
            return await this.fetchInfo(isConferenceUpcoming as boolean, status as ApplyStatus);
        }
    }

    private async fetchInfo(isConferenceUpcoming: boolean, status: ApplyStatus): Promise<number> {
        const formData = new FormData();
        formData.append("isConferenceUpcoming", String(isConferenceUpcoming));
        formData.append("status", String(status));

        try {
            if (this.token) {
                const response = await axios.post(`${this.API_URL}/info`, formData, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                    },
                });
                return response.data as number;
            }
        } catch (e) {
            console.error('Error fetching info: ', e);
            throw e;
        }
        return 0;
    }

    async downloadPaper(paperId: string) {
        try {
            const response = await fetch(`${this.API_URL}/${paperId}/download`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/octet-stream',
                },
            });

            if (!response.ok) {
                throw new Error(`Error downloading paper: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', response.headers.get('Content-Disposition')?.split('filename=')[1] || 'paper.pdf');

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading paper:', error);
        }
    }
}

export default new PaperService()