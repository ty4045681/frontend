import {ParsedUrlQuery} from "querystring";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {API_BASE_URL} from "@/config";
import axios from "axios";

export interface UserData {
    id: string
    username: string
    // token: string
}

export interface AuthenticationProps {
    isAuthenticated: boolean
    userData: UserData | null
}

export async function getServerSideAuthProps<P extends ParsedUrlQuery>(context: GetServerSidePropsContext<P>): Promise<GetServerSidePropsResult<AuthenticationProps>> {
    const token = context.req.cookies.jwt;
    const isAuthenticated = !!token
    const API_URL = `${API_BASE_URL}/user`

    if (!isAuthenticated) {
        return {
            props: {
                isAuthenticated,
                userData: null,
            },
        }
    }

    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        return {
            props: {
                isAuthenticated,
                userData: response.data,
            },
        }
    } catch (error) {
        return {
            props: {
                isAuthenticated,
                userData: null,
            },
        }
    }
}