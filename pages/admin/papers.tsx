import React from 'react';
import {AdminPapersInfo} from '@/interfaces/DashboardTypes';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import {ColumnDef} from '@tanstack/react-table';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import {GetServerSideProps} from 'next';
import Table from '@/components/dashboard/Table';
import AdminService from "@/services/AdminService";

const PapersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const [papers, setPapers] = React.useState<AdminPapersInfo[]>([])

    React.useEffect(() => {
        const fetchPapers = async () => {
            if (userData) {
                const adminPapers = await AdminService.getPapersByAdminId(userData.id)
                setPapers(adminPapers)
            }
        }

        fetchPapers()
    }, [userData])

    const columns: ColumnDef<AdminPapersInfo>[] = [
        {
            id: 'adminPaper',
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
                {
                    id: 'status',
                    accessorKey: 'status',
                    cell: info => info.getValue(),
                },
            ]
        }
    ]

    return (
        <>
            <Header userType='admin' isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"admin"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<AdminPapersInfo> data={papers} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage