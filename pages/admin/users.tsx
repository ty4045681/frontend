import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {AdminUsersInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import AdminService from "@/services/AdminService";
import React, {useState} from "react";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";
import ReviewButton from "@/components/dashboard/ReviewButton";
import {boolean} from "yup";

const AdminUsersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const { t, lang } = useTranslation('table')
    const [users, setUsers] = React.useState<AdminUsersInfo[]>([])
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const renderHeaderButton = () => {
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

        return (
            <Modal type={'warning'}
                   disabled={selectedRows.size === 0}
                   triggerTitle={t('delete_selected')}
                   title={"Warning"}
                   description={t('confirm_message')}
                   confirmTitle={t('delete_selected')}
                   onClickConfirm={handleDelete}
            />
        )
    }

    const renderActionButton = (attendanceId: string, status: ApplyStatus) => {
        const handleStateChange = async (newStatus: ApplyStatus) => {
            await AdminService.changeUserStatus(userData?.id ?? "", attendanceId, newStatus)
            const updatedUsers = users.map(user => {
                if (user.attendanceId === attendanceId) {
                    user.status = newStatus
                }
                return user
            })
            setUsers(updatedUsers)
        }

        return (
            <>
                {attendanceId !== '' ? (
                    <ReviewButton status={status} handleStatusChange={handleStateChange} />
                ) : (
                    <></>
                )}
            </>
        )
    }

    const onHeaderCheckboxChange = (checked: boolean) => {
        setHeaderCheckboxSelected(checked)
        if (checked) {
            const allIds = users.map(user => user.id)
            setSelectedRows(new Set(allIds))
        } else {
            setSelectedRows(new Set())
        }
    }

    const onRowCheckboxChange = (id: string, checked: boolean) => {
        const updatedSelectedRows = new Set(selectedRows)
        if (checked) {
            updatedSelectedRows.add(id)
        } else {
            updatedSelectedRows.delete(id)
        }
        setSelectedRows(updatedSelectedRows)
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
                    id: 'checkbox',
                    header: () => (
                        <input
                            type="checkbox"
                            checked={headerCheckboxSelected}
                            onChange={(e) => onHeaderCheckboxChange(e.target.checked)}
                        />
                    ),
                    cell: info => (
                        <input
                            type='checkbox'
                            checked={selectedRows.has(info.row.original.attendanceId)}
                            onChange={e => onRowCheckboxChange(info.row.original.attendanceId, e.target.checked)}
                        />
                    ),
                },
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
                },
                {
                    id: 'actions',
                    header: t('actions'),
                    cell: info => (
                        <div>
                            {renderActionButton(info.row.original.attendanceId, info.row.original.status)}
                        </div>
                    )
                }
            ]
        }
    ]

    return (
        <>
            <Header userType="admin" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar userType="admin" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"}>
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