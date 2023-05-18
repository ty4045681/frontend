import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {AdminUsersInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import AdminService from "@/services/AdminService";
import React from "react";

const AdminUsersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const [users, setUsers] = React.useState<AdminUsersInfo[]>([])

    React.useEffect(() => {
        const fetchUsers = async () => {
            if (userData) {
                const adminUsers = await AdminService.getUsersByAdminId(userData.id)
                setUsers(adminUsers)
            }
        }

        fetchUsers()
    }, [userData])

    const columns: ColumnDef<AdminUsersInfo>[] = [
        {
            id: 'adminUsers',
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
                    id: 'userType',
                    accessorKey: 'userType',
                    cell: info => info.getValue(),
                }
            ]
        }
    ]

    return (
        <>
            <Header userType="admin" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType="admin" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<AdminUsersInfo> data={users} columns={columns} />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default AdminUsersPage;