import {useRouter} from 'next/router';
import {GetServerSideProps} from "next";
import {getServerSideAuthProps, UserData} from "@/services/auth";
import { Avatar, Box, Typography } from '@mui/material'
import UserProfileSideBar from "@/components/UserProfileSideBar";
import React, {useState} from "react";
import UserInfo from "@/components/UserInfo";
import UserConferences from "@/components/UserConferences";
import UserSubmittedPapers from "@/components/UserSubmittedPapers";
import {HeaderNav} from "@/components/HeaderNav";

interface UserPageProps {
    userData: UserData
    isAuthenticated: boolean
}

function UserPage({ userData, isAuthenticated }: UserPageProps) {
    const router = useRouter();

    const [selectedPage, setSelectedPage] = useState(0)

    if (!isAuthenticated) {
        router.replace('/login')
        return null
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Header */}
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">Conference Management System</div>
                    <HeaderNav isAuthenticated={isAuthenticated} userData={userData} />
                </div>
            </header>

            <div className="min-h-screen flex">
                <UserProfileSideBar setSelectedPage={setSelectedPage} />
                <Box className="bg-gray-100 w-3/4 p-8">
                    {selectedPage === 0 && <UserInfo />}
                    {selectedPage === 1 && <UserConferences />}
                    {selectedPage === 2 && <UserSubmittedPapers />}
                </Box>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default UserPage;