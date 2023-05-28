import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import AdminService from "@/services/AdminService";

function AdminPage({ isAuthenticated, userData }: AuthenticationProps) {
    const router = useRouter();

    const [approvedConferences, setApprovedConferences] = useState(0);
    const [pendingConferences, setPendingConferences] = useState(0);
    const [rejectedConferences, setRejectedConferences] = useState(0);
    const [organizersCount, setOrganizersCount] = useState(0);
    const [judgesCount, setJudgesCount] = useState(0);
    const [attendeesCount, setAttendeesCount] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const fetchData = async () => {
            const [
                approvedConferences,
                pendingConferences,
                rejectedConferences,
                organizersCount,
                judgesCount,
                attendeesCount,
            ] = await Promise.all([
                AdminService.getCountConferencesByStatus(userData.id, 'APPROVED'),
                AdminService.getCountConferencesByStatus(userData.id, 'PENDING'),
                AdminService.getCountConferencesByStatus(userData.id, 'REJECTED'),
                AdminService.getCountUsersByType(userData.id, 'organizer'),
                AdminService.getCountUsersByType(userData.id, 'judge'),
                AdminService.getCountUsersByType(userData.id, 'user'),
            ])

            setApprovedConferences(approvedConferences);
            setPendingConferences(pendingConferences);
            setRejectedConferences(rejectedConferences);
            setOrganizersCount(organizersCount);
            setJudgesCount(judgesCount);
            setAttendeesCount(attendeesCount);
        }

        fetchData()
    }, []);

    return (
        <>
            {/* Header */}
            <Header userType="admin" userData={userData} isAuthenticated={isAuthenticated} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType="admin" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="ml-[150px] mt-16 flex-1 flex flex-col gap-10 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Approved Conferences</h3>
                            <p className="text-4xl self-end">{approvedConferences}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Pending Review Conferences</h3>
                            <p className="text-4xl self-end">{pendingConferences}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Rejected Conferences</h3>
                            <p className="text-4xl self-end">{rejectedConferences}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Organizer</h3>
                            <p className="text-4xl self-end">{organizersCount}</p>
                        </div>
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Judge</h3>
                            <p className="text-4xl self-end">{judgesCount}</p>
                        </div>
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Attendee</h3>
                            <p className="text-4xl self-end">{attendeesCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context);
};

export default AdminPage;