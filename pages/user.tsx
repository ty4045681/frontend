import {useRouter} from 'next/router';
import {GetServerSideProps} from "next";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import AttendanceService from "@/services/AttendanceService";
import PaperService from "@/services/PaperService";


function UserPage({ userData, isAuthenticated }: AuthenticationProps) {
    const router = useRouter();

    const [attendedConferences, setAttendedConferences] = React.useState(0);
    const [upcomingConferences, setUpcomingConferences] = React.useState(0);
    const [pendingReviewConferences, setPendingReviewConferences] = React.useState(0);
    const [submittedPapers, setSubmittedPapers] = React.useState(0);
    const [passedPapers, setPassedPapers] = React.useState(0);
    const [pendingReviewPapers, setPendingReviewPapers] = React.useState(0);

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const [
                attendedConferences,
                upcomingConferences,
                pendingReviewConferences,
                submittedPapers,
                passedPapers,
                pendingReviewPapers,
            ] = await Promise.all([
                AttendanceService.getCountAttendanceByUserAndConferenceTimeAndStatus(false, 'APPROVED'),
                AttendanceService.getCountAttendanceByUserAndConferenceTimeAndStatus(true, 'APPROVED'),
                AttendanceService.getCountAttendanceByUserAndConferenceTimeAndStatus(true, 'PENDING'),
                PaperService.getCountPaperByUser(),
                PaperService.getCountPaperByUserAndConferenceTimeAndStatus(true, 'APPROVED'),
                PaperService.getCountPaperByUserAndStatus('PENDING'),
            ]);

            setAttendedConferences(attendedConferences);
            setUpcomingConferences(upcomingConferences);
            setPendingReviewConferences(pendingReviewConferences);
            setSubmittedPapers(submittedPapers);
            setPassedPapers(passedPapers);
            setPendingReviewPapers(pendingReviewPapers);
        };

        fetchData();
    }, []);

    return (
        <>
            {/* Header */}
            <Header userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />
    
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />
    
                {/* Content */}
                <div className="flex-1 flex flex-col gap-10 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Attended Conferences</h3>
                            <p className="text-4xl self-end">{attendedConferences}</p>
                        </div>
    
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Upcoming Conferences</h3>
                            <p className="text-4xl self-end">{upcomingConferences}</p>
                        </div>
    
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Pending Review Conferences</h3>
                            <p className="text-4xl self-end">{pendingReviewConferences}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Submitted Papers</h3>
                            <p className="text-4xl self-end">{submittedPapers}</p>
                        </div>
    
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Passed Papers in Upcoming Conferences</h3>
                            <p className="text-4xl self-end">{passedPapers}</p>
                        </div>
    
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Pending Review Papers</h3>
                            <p className="text-4xl self-end">{pendingReviewPapers}</p>
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

export default UserPage;