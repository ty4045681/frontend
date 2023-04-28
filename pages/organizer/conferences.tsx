import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { OrganizerConferenceInfo } from "@/interfaces/DashboardTypes";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { ColumnDef } from "@tanstack/react-table";
import { GetServerSideProps } from "next";

const conferences: OrganizerConferenceInfo[] = [
    {
        title: "Conference 1",
        location: "Location 1",
        startDate: "2021-01-01",
        endDate: "2021-01-02",
        acceptedUsersNumber: 10,
        pendingUsersNumber: 10,
        rejectedUsersNumber: 10,    
    },
    {
        title: "Conference 2",
        location: "Location 2",
        startDate: "2022-01-01",
        endDate: "2022-01-02",
        acceptedUsersNumber: 10,
        pendingUsersNumber: 10,
        rejectedUsersNumber: 10,
    },
    {
        title: "Conference 3",
        location: "Location 3",
        startDate: "2023-01-01",
        endDate: "2023-01-02",
        acceptedUsersNumber: 10,
        pendingUsersNumber: 10,
        rejectedUsersNumber: 10,
    }
]

const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const columns: ColumnDef<OrganizerConferenceInfo>[] = [
        {
            id: 'organizerConference',
            columns: [
                {
                    id: 'title',
                    accessorKey: 'title',
                    cell: info => info.getValue(),
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