import {useRouter} from 'next/router';
import {GetServerSideProps} from "next";
import {getServerSideAuthProps, UserData} from "@/services/auth";

interface UserPageProps {
    userData: UserData
    isAuthenticated: boolean
}

function UserPage({ userData, isAuthenticated }: UserPageProps) {
    const router = useRouter();

    if (!isAuthenticated) {
        router.replace('/login')
        return null
    }

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default UserPage;