import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { OrganizerJudgesInfo } from "@/interfaces/DashboardTypes";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { ColumnDef } from "@tanstack/react-table";
import { GetServerSideProps } from "next";

const judges: OrganizerJudgesInfo[] = [
    {
        name: "Tom Harris",
        username: "JUDGE1",
        email: "JUDGE1@gmail.com",
        conferenceTitle: "conference 1",
    },
    {
        name: "John Harris",
        username: "JUDGE2",
        email: "JUDGE2@gmail.com",
        conferenceTitle: "conference 1",
    },
    {
        name: "Jane Harris",
        username: "JUDGE3",
        email: "JUDGE3@gmail.com",
        conferenceTitle: "conference 1",
    }
]

const JudgesPage: React.FC<AuthenticationProps> = ( { isAuthenticated, userData } ) => {
    const columns: ColumnDef<OrganizerJudgesInfo>[] = [
        {
            id: "organizerJudge",
            columns: [
                {
                    id: "name",
                    accessorKey: "name",
                    cell: info => info.getValue(),
                },
                {
                    id: "username",
                    accessorKey: "username",
                    cell: info => info.getValue(),
                },
                {
                    id: "email",
                    accessorKey: "email",
                    cell: info => info.getValue(),
                },
                {
                    id: "conferenceTitle",
                    accessorKey: "conferenceTitle",
                    cell: info => info.getValue(),
                }
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
                <Table<OrganizerJudgesInfo> data={judges} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default JudgesPage
