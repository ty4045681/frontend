import React from 'react';
import {ConferenceInfo} from '@/interfaces/DashboardTypes';
import {ColumnDef} from '@tanstack/react-table';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import Table from '@/components/dashboard/Table';
import {GetServerSideProps} from 'next';


const conferences: ConferenceInfo[] = [
    {
        title: "Conference 1",
        startDate: "2021-10-10",
        endDate: "2021-10-12",
        location: "Location 1",
    },
    {
        title: "Conference 2",
        startDate: "2021-10-10",
        endDate: "2021-10-12",
        location: "Location 2",
    }
]

const ConferencesPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const columns: ColumnDef<ConferenceInfo>[] = [
        {
            id: 'adminConference',
            columns: [
                {
                    id: 'title',
                    accessorKey: 'title',
                    cell: info => info.getValue(),
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
                }
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
