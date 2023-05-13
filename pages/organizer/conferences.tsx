import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerConferenceInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import React, {useEffect, useState} from "react";
import ConferenceService from "@/services/ConferenceService";
import Link from "next/link";
import OrganizerService from "@/services/OrganizerService";

const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [conferences, setConferences] = useState<OrganizerConferenceInfo[]>([])

    useEffect(() => {
        const fetchConference = async () => {
            if (userData) {
                const organizerConference = await OrganizerService.getOrganizerConference(userData.id)
                setConferences(organizerConference)
            }
        }

        fetchConference()
    }, [userData])

    const columns: ColumnDef<OrganizerConferenceInfo>[] = [
        {
            id: 'organizerConference',
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
                    id: 'location',
                    accessorKey: 'location',
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
                    id: 'acceptedUsersNumber',
                    accessorKey: 'acceptedUsersNumber',
                    cell: info => info.getValue(),
                },
                {
                    id: 'pendingUsersNumber',
                    accessorKey: 'pendingUsersNumber',
                    cell: info => info.getValue(),
                },
                {
                    id: 'rejectedUsersNumber',
                    accessorKey: 'rejectedUsersNumber',
                    cell: info => info.getValue(),
                },
            ]
        }
    ]

    return (
        <>
            <Header userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"organizer"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<OrganizerConferenceInfo> data={conferences} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage