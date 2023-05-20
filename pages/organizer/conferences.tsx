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
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

    const renderHeaderButton = () => (
        <button
            className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none ${selectedRows.size === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            disabled={selectedRows.size === 0}
            onClick={handleDelete}
        >
            Delete Selected
        </button>
    )

    const onRowCheckboxChange = (id: string, checked: boolean) => {
        const updatedSelectedRows = new Set(selectedRows)
        if (checked) {
            updatedSelectedRows.add(id)
        } else {
            updatedSelectedRows.delete(id)
        }
        setSelectedRows(updatedSelectedRows)
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete the selected rows? This action cannot be undone.')) {
            // Delete selected rows from the backend
            await OrganizerService.deleteSelectedConferencesOfOrganizerId(userData?.id ?? "", Array.from(selectedRows))

            // Update the conferences state to remove the deleted rows
            setConferences(conferences.filter(conference => !selectedRows.has(conference.id)))

            // Clear the selected rows state
            setSelectedRows(new Set())
        }
    }

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
                    id: 'checkbox',
                    cell: info => (
                        <input
                            type="checkbox"
                            checked={selectedRows.has(info.row.original.id)}
                            onChange={e => onRowCheckboxChange(info.row.original.id, e.target.checked)}
                        />
                    ),
                },
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
                <Table<OrganizerConferenceInfo> data={conferences} columns={columns} renderHeaderButton={renderHeaderButton} onRowCheckboxChange={onRowCheckboxChange} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage