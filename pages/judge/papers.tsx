import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {JudgePapersInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import {useEffect, useState} from "react";
import JudgeService from "@/services/JudgeService";

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [papers, setPapers] = useState<JudgePapersInfo[]>([]);

    useEffect(() => {
        const fetchPaper = async () => {
            if (userData) {
                const judgePaper = await JudgeService.getJudgePaper(userData.id)
                setPapers(judgePaper)
            }
        }

        fetchPaper()
    }, [userData])

    const columns: ColumnDef<JudgePapersInfo>[] = [
        {
            id: "judgePaper",
            columns: [
                {
                    id: "title",
                    accessorKey: "title",
                    cell: info => info.getValue(),
                },
                {
                    id: "conferenceTitle",
                    accessorKey: "conferenceTitle",
                    cell: info => info.getValue(),
                },
                {
                    id: "authors",
                    accessorKey: "authors",
                    cell: info => info.getValue(),
                },
                {
                    id: "keywords",
                    accessorKey: "keywords",
                    cell: info => info.getValue(),
                },
                {
                    id: "abstract",
                    accessorKey: "abstract",
                    cell: info => info.getValue(),
                },
                {
                    id: "status",
                    accessorKey: "status",
                    cell: info => info.getValue()
                }
            ]
        }
    ];

    return (
        <>
            <Header userType="judge" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType="judge" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16"} >
                    <Table<JudgePapersInfo> data={papers} columns={columns} />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context);
};

export default PapersPage;