import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerAttendeesInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";

const attendees: OrganizerAttendeesInfo[] = [
    {
        name: "Tom Smith",
        username: "USER11",
        email: "USER11@gmail.com",
        conferenceTitle: "Conference 1",
        status: 'accepted',
    },
    {
        name: "John Smith",
        username: "USER12",
        email: "USER12@gmail.com",
        conferenceTitle: "Conference 1",
        status: 'pending',
    },
    {
        name: "Jane Smith",
        username: "USER13",
        email: "USER13@gmail.com",
        conferenceTitle: "Conference 1",
        status: 'rejected',
    },
    {
        name: "Tom Smith",
        username: "USER11",
        email: "USER11@gmail.com",
        conferenceTitle: "Conference 2",
        status: 'accepted',
    },
    {
        name: "John Smith",
        username: "USER12",
        email: "USER12@gmail.com",
        conferenceTitle: "Conference 2",
        status: 'pending',
    },
    {
        name: "Jane Smith",
        username: "USER13",
        email: "USER13@gmail.com",
        conferenceTitle: "Conference 2",
        status: 'rejected',
    }
]

const AttendeesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const columns: ColumnDef<OrganizerAttendeesInfo>[] = [
        {
            id: 'organizerAttendee',
            columns: [
                {
                    id: 'name',
                    accessorKey: 'name',
                    cell: info => info.getValue(),
                },
                {
                    id: 'username',
                    accessorKey: 'username',
                    cell: info => info.getValue(),
                },
                {
                    id: 'email',
                    accessorKey: 'email',
                    cell: info => info.getValue(),
                },
                {
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
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
            <Header userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<OrganizerAttendeesInfo> data={attendees} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default AttendeesPage