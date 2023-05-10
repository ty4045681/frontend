import { UserConferenceInfo } from "@/interfaces/DashboardTypes";
import Header from "@/components/dashboard/Header";
import { GetServerSideProps } from "next";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConferenceService from "@/services/ConferenceService";
import AttendanceService from "@/services/AttendanceService";


const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated,userData }) => {
    const [conferences, setConferences] = useState<UserConferenceInfo[]>([])

    useEffect(() => {
        const fetchConferences = async () => {
            if (userData) {
                const userConferences = await AttendanceService.getConferencesByUserId(userData.id);
                setConferences(userConferences);
            }
        };

        fetchConferences();
    }, [userData]);

    const columns: ColumnDef<UserConferenceInfo>[] = [
        {
            id: 'userConference',
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
                    id: 'status',
                    accessorKey: 'status',
                    cell: info => info.getValue(),
                }
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
                <Table<UserConferenceInfo> data={conferences} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage