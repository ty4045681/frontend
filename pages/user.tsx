import {useRouter} from 'next/router';
import {GetServerSideProps} from "next";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import AttendanceService from "@/services/AttendanceService";
import PaperService from "@/services/PaperService";
import DashboardCard from "@/components/dashboard/DashboardCard";
import useTranslation from "next-translate/useTranslation";


function UserPage({ userData, isAuthenticated }: AuthenticationProps) {
    const router = useRouter();
    const { t, lang } = useTranslation('user')

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
                <div className="ml-[150px] mt-16 bg-gray-200 dark:bg-gray-900 flex-1 flex flex-col gap-10 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DashboardCard title={t('attended_conferences')} content={attendedConferences} />
    
                        <DashboardCard title={t('upcoming_conferences')} content={upcomingConferences} />
    
                        <DashboardCard title={t('pending_conferences')} content={pendingReviewConferences} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DashboardCard title={t('submitted_papers')} content={submittedPapers} />
    
                        <DashboardCard title={t('passed_papers')} content={passedPapers} />
    
                        <DashboardCard title={t('pending_papers')} content={pendingReviewPapers} />
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