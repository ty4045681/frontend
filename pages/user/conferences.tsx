import {UserConferenceInfo} from "@/interfaces/DashboardTypes";
import Header from "@/components/dashboard/Header";
import {GetServerSideProps} from "next";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {ColumnDef} from "@tanstack/react-table";

const conferences: UserConferenceInfo[] = [
    {
        title: "Conference 1",
        location: "Location 1",
        startDate: "2021-01-01",
        endDate: "2021-01-02",
        status: "accepted"
    },
    {
        title: "Conference 2",
        location: "Location 2",
        startDate: "2021-01-01",
        endDate: "2021-01-02",
        status: "pending"
    },
    {
        title: "Conference 3",
        location: "Location 3",
        startDate: "2021-01-01",
        endDate: "2021-01-02",
        status: "rejected"
    },
]

const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const columns: ColumnDef<UserConferenceInfo>[] = [
        {
            id: 'userConference',
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