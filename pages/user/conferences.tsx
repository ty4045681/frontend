import {ConferenceCardInfo} from "@/interfaces/DashboardTypes";
import Card from "@/components/dashboard/Card";
import Header from "@/components/dashboard/Header";
import { GetServerSideProps } from "next";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";

const conferences: ConferenceCardInfo[] = [
    {
        title: "Conference 1",
        location: "Location 1",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
    {
        title: "Conference 2",
        location: "Location 2",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
    {
        title: "Conference 3",
        location: "Location 3",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
]

const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    return (
        <>
            <Header userType="user" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10">
                    {conferences.map((conference, index) => (
                        <Card key={index} conference={conference} />
                    ))}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage