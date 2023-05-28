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
                <div className="ml-[150px] mt-16 flex-1 flex flex-col gap-10 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Approved Papers</h3>
                            <p className="text-4xl self-end">{approvedPapers}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Pending Review Papers</h3>
                            <p className="text-4xl self-end">{pendingPapers}</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 flex flex-col justify-between">
                            <h3 className="text-xl font-semibold mb-4">Rejected Conferences</h3>
                            <p className="text-4xl self-end">{rejectedPapers}</p>
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