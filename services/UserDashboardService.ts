import Cookies from "js-cookie";

class UserDashboardService {
    private readonly token: string | undefined
    constructor() {
        this.token = Cookies.get("jwt")
    }

    async updateUserInfo() {

    }

}

export default new UserDashboardService()