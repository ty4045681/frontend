import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import JudgeService from "@/services/JudgeService";

function JudgePage({ userData, isAuthenticated }: AuthenticationProps) {
    const router = useRouter();

    const [approvedPapers, setApprovedPapers] = React.useState(0);
    const [pendingPapers, setPendingPapers] = React.useState(0);
    const [rejectedPapers, setRejectedPapers] = React.useState(0);

    React.useEffect(() => {
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
                approvedPapers,
                pendingPapers,
                rejectedPapers,
            ] = await Promise.all([
                JudgeService.getCountPapersByJudgeIdAndStatus(userData.id, 'APPROVED'),
                JudgeService.getCountPapersByJudgeIdAndStatus(userData.id, 'PENDING'),
                JudgeService.getCountPapersByJudgeIdAndStatus(userData.id, 'REJECTED'),
            ]);

            setApprovedPapers(approvedPapers);
            setPendingPapers(pendingPapers);
            setRejectedPapers(rejectedPapers);
        };

        fetchData();
    }, []);

    return (
        <>
            {/* Header */}
            <Header userType="judge" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"judge"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="flex-1 flex flex-col m-10">
                    <div className="flex justify-between">
                        <div className="bg-white shadow-md rounded p-6 w-1/3">
                            <h3 className="text-xl font-semibold mb-4">Approved Papers</h3>
                            <p className="text-4xl">{approvedPapers}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 w-1/3">
                            <h3 className="text-xl font-semibold mb-4">Pending Review Papers</h3>
                            <p className="text-4xl">{pendingPapers}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 w-1/3">
                            <h3 className="text-xl font-semibold mb-4">Rejected Conferences</h3>
                            <p className="text-4xl">{rejectedPapers}</p>
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

export default JudgePage;