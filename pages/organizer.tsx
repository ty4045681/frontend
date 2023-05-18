import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import OrganizerService from "@/services/OrganizerService";


function OrganizerPage({ userData, isAuthenticated }: AuthenticationProps) {
    const router = useRouter();

    const [conferenceCount, setConferenceCount] = React.useState(0)
    const [paperCount, setPaperCount] = React.useState(0)
    const [attendeeCount, setAttendeeCount] = React.useState(0)
    const [reviewerCount, setReviewerCount] = React.useState(0)

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
        }
    }, [isAuthenticated, router])

    if (!userData) {
        return <div>Loading...</div>;
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const [
                conferenceCount,
                paperCount,
                attendeeCount,
                reviewerCount,
            ] = await Promise.all([
                OrganizerService.getCountConferencesByOrganizer(userData.id),
                OrganizerService.getCountPapersByOrganizer(userData.id),
                OrganizerService.getCountAllAttendeesByOrganizer(userData.id),
                OrganizerService.getCountAllReviewersByOrganizer(userData.id),
            ])
            
            setConferenceCount(conferenceCount)
            setPaperCount(paperCount)
            setAttendeeCount(attendeeCount)
            setReviewerCount(reviewerCount)
        }

        fetchData()
    }, [])


    return (
        <>
            {/* Header */}
            <Header userType={"organizer"} isAuthenticated={isAuthenticated} userData={userData} />

            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar userType={"organizer"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="flex-1 flex flex-col gap-10 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Conferences</h3>
                            <p className="text-4xl self-end">{conferenceCount}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Papers</h3>
                            <p className="text-4xl self-end">{paperCount}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Attendees</h3>
                            <p className="text-4xl self-end">{attendeeCount}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Reviewers</h3>
                            <p className="text-4xl self-end">{reviewerCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default OrganizerPage