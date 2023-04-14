import {getServerSideAuthProps, UserData} from "@/services/auth";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {HeaderNav} from "@/components/HeaderNav";
import UserProfileSideBar from "@/components/UserProfileSideBar";
import {Box} from "@mui/material";
import UserInfo from "@/components/UserInfo";
import UserConferences from "@/components/UserConferences";
import UserSubmittedPapers from "@/components/UserSubmittedPapers";
import OrganizerProfileSideBar from "@/components/OrganizerProfileSideBar";
import OrganizerInfo from "@/components/OrganizerInfo";
import OrganizerConference from "@/components/OrganizerConference";
import OrganizerPaper from "@/components/OrganizerPaper";

interface OrganizerPageProps {
    userData: UserData
    isAuthenticated: boolean
}

function OrganizerPage({ userData, isAuthenticated }: OrganizerPageProps) {
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
                <OrganizerProfileSideBar setSelectedPage={setSelectedPage} />
                <Box className="bg-gray-100 w-3/4 p-8">
                    {selectedPage === 0 && <OrganizerInfo />}
                    {selectedPage === 1 && <OrganizerConference />}
                    {selectedPage === 2 && <OrganizerPaper />}
                </Box>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default OrganizerPage