import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerJudgesInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import {useEffect, useState} from "react";
import user from "@/pages/user";
import OrganizerService from "@/services/OrganizerService";

const JudgesPage: React.FC<AuthenticationProps> = ( { isAuthenticated, userData } ) => {
    const [judges, setJudges] = useState<OrganizerJudgesInfo[]>([])

    useEffect(() => {
        const fetchJudges = async () => {
            if (userData) {
                const organizerJudge = await OrganizerService.getOrganizerJudge(userData.id)
                setJudges(organizerJudge)
            }
        }

        fetchJudges()
    }, [userData])

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
