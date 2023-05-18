import React from 'react';
import {AdminConferencesInfo, ConferenceInfo} from '@/interfaces/DashboardTypes';
import {ColumnDef} from '@tanstack/react-table';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import Table from '@/components/dashboard/Table';
import {GetServerSideProps} from 'next';
import AdminService from "@/services/AdminService";
import Link from "next/link";

const ConferencesPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const [conferences, setConferences] = React.useState<AdminConferencesInfo[]>([])

    React.useEffect(() => {
        const fetchConferences = async () => {
            if (userData) {
                const adminConference = await AdminService.getConferencesByAdminId(userData.id)
                setConferences(adminConference)
            }
        }

        fetchConferences()
    }, [userData])

    const columns: ColumnDef<ConferenceInfo>[] = [
        {
            id: 'adminConference',
            columns: [
                {
                    id: 'title',
                    accessorKey: 'title',
                    cell: info => (
                        <Link href={`/conference/${info.row.original.id}`}>
                            <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">{info.getValue()}</span>
                        </Link>
                    ),
                },
                {
                    id: 'startDate',
                    accessorKey: 'startDate',
                    cell: info => info.getValue(),
                },
                {
                    id: 'endDate',
                    accessorKey: 'endDate',
                    cell: info => info.getValue(),
                },
                {
                    id: 'location',
                    accessorKey: 'location',
                    cell: info => info.getValue(),
                },
                {
                    id: 'organizer',
                    accessorKey: 'organizer',
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

            <div className='flex min-h-screen'>
                {/* Sidebar */}
                <Sidebar userType='admin' isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<ConferenceInfo> data={conferences} columns={columns} />
            </div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage;
