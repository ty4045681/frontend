import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import withAuth from "@/hoc/withAuth";
import Cookies from "js-cookie";
import axios from "axios";

interface UserData {
    id: string;
    username: string;
}

function UserPage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>();
    const token = Cookies.get("jwt");
    const API_BASE_URL = "http://localhost:8081/api/user"

    // useEffect(() => {
    //
    //     if (typeof userId === 'string') {
    //         fetch('http://localhost:8081/api/user?id=' + userId)
    //             .then(response => {
    //                 if (response.ok) {
    //                     return response.json() as Promise<UserData>;
    //                 }
    //                 throw new Error('Network response was not ok');
    //             })
    //             .then(data => {
    //                 setUserData(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching user data: ', error);
    //             });
    //     }
    // }, [router.query.id]);

    const requestUserData = async () => {
        const response = await axios.get(`${API_BASE_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        } else {
            setUserData(response.data);
        }
    }

    useEffect(() => {
        requestUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {userData.username}!</h1>
            <p>Your user ID is: {userData.id}</p>
        </div>
    );
}

export default withAuth(UserPage);