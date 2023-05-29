import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {AdminUsersInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import AdminService from "@/services/AdminService";
import React from "react";
import useTranslation from "next-translate/useTranslation";

const AdminUsersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const { t, lang } = useTranslation('table')
    const [users, setUsers] = React.useState<AdminUsersInfo[]>([])
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())

    const renderHeaderButton = () => (
        <button
            className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none ${selectedRows.size === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            disabled={selectedRows.size === 0}
            onClick={handleDelete}
        >
            {t('delete_selected')}
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
        if (window.confirm(t('confirm_message'))) {
            // Delete selected rows from the backend
            await AdminService.deleteSelectedUsersOfAdminId(userData?.id ?? "", Array.from(selectedRows))

            // Update the users state to remove the deleted rows
            setUsers(users.filter(user => !selectedRows.has(user.id)))
            
            // Clear the selected rows state
            setSelectedRows(new Set())
        }
    }


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
                    header: t('name'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'username',
                    accessorKey: 'username',
                    header: t('username'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'email',
                    accessorKey: 'email',
                    header: t('email'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'userType',
                    accessorKey: 'userType',
                    header: t('user_type'),
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
                <div className={"ml-[150px] mt-16"}>
                    <Table<AdminUsersInfo> data={users} columns={columns} />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default AdminUsersPage;