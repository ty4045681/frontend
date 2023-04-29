import React from 'react';
import {AdminPapersInfo} from '@/interfaces/DashboardTypes';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import {ColumnDef} from '@tanstack/react-table';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import {GetServerSideProps} from 'next';
import Table from '@/components/dashboard/Table';

const papers: AdminPapersInfo[] = [
    {
        title: "Paper 1",
        conferenceTitle: "Conference 1",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 1",
        status: "accepted"
    },
    {
        title: "Paper 2",
        conferenceTitle: "Conference 2",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 2",
        status: "pending"
    },
    {
        title: "Paper 3",
        conferenceTitle: "Conference 3",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 3",
        status: "rejected"
    },
]


const PapersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
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
                    cell: info => info.getValue(),
                },
                {
                    id: 'keywords',
                    accessorKey: 'keywords',
                    cell: info => info.getValue(),
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