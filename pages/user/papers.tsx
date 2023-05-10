import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {UserPaperInfo} from "@/interfaces/DashboardTypes";
import PaperService from "@/services/PaperService";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import { useEffect, useState } from "react";

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [papers, setPapers] = useState<UserPaperInfo[]>([])

    useEffect(() => {
        const fetchPapers = async () => {
            if (userData) {
                const papersOfUser = await PaperService.getPapersByUserId(userData.id)
                setPapers(papersOfUser)
            }
        }

        fetchPapers()
    }, [userData])

    const columns: ColumnDef<UserPaperInfo>[] = [
        {
            id: 'userPaper',
            columns: [
                {
                    id: 'title',
                    accessorKey: 'title',
                    cell: info => info.getValue(),
                },
                {
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
                    cell: info => info.getValue(),
                },
                {
                    id: 'authors',
                    accessorKey: 'authors',
                    cell: info => {
                        const authors = info.getValue();
                        return Array.isArray(authors) ? authors.join(', ') : authors;
                    },
                },
                {
                    id: 'keywords',
                    accessorKey: 'keywords',
                    cell: info => {
                        const keywords = info.getValue();
                        return Array.isArray(keywords) ? keywords.join(', ') : keywords;
                    },
                },
                {
                    id: 'abstract',
                    accessorKey: 'abstract',
                    cell: info => info.getValue(),
                },
            ]
        }
    ]

    return (
        <>
            <Header userType="user" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<UserPaperInfo> data={papers} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage