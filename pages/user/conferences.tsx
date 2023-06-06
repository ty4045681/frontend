import {UserConferenceInfo} from "@/interfaces/DashboardTypes";
import Header from "@/components/dashboard/Header";
import {GetServerSideProps} from "next";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {ColumnDef} from "@tanstack/react-table";
import Link from "next/link";
import {useEffect, useState} from "react";
import AttendanceService from "@/services/AttendanceService";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";
import user from "@/pages/user";


const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')
    const [conferences, setConferences] = useState<UserConferenceInfo[]>([])
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const renderHeaderButton = () => {
        const handleDelete = async () => {
            if (window.confirm(t('confirm_message'))) {
                // Delete selected rows from the backend
                await AttendanceService.deleteSelectedAttendancesOfUserId(userData?.id ?? "", Array.from(selectedRows));

                // Update the conferences state to remove the deleted rows
                setConferences(conferences.filter(conference => !selectedRows.has(conference.attendanceId)));

                // Clear the selected rows state
                setSelectedRows(new Set());
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

    const renderActionButton = (id: string) => {
        const handleDelete = async () => {
            if (window.confirm(t('confirm_message'))) {
                await AttendanceService.deleteSelectedAttendancesOfUserId(userData?.id ?? "", [id])

                setConferences(conferences.filter(conference => conference.attendanceId !== id))

                setSelectedRows(new Set())
            }
        }

        return (
            <Modal type={'warning'}
                   triggerTitle={t('delete_selected')}
                   title={"Warning"}
                   description={t('confirm_message')}
                   confirmTitle={t('delete_selected')}
                   onClickConfirm={handleDelete}
           />
        )
    }

    const onHeaderCheckboxChange = (checked: boolean) => {
        setHeaderCheckboxSelected(checked);
        if (checked) {
            const newSelectedRows = new Set(selectedRows);
            conferences.forEach((row) => newSelectedRows.add(row.attendanceId));
            setSelectedRows(newSelectedRows);
        } else {
            setSelectedRows(new Set());
        }
    };

    const onRowCheckboxChange = (id: string, checked: boolean) => {
        const updatedSelectedRows = new Set(selectedRows);
        if (checked) {
            updatedSelectedRows.add(id);
        } else {
            updatedSelectedRows.delete(id);
        }
        setSelectedRows(updatedSelectedRows);
    };



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
                    id: 'title',
                    accessorKey: 'title',
                    header: t('title'),
                    cell: info => (
                        <Link href={`/conference/${info.row.original.id}`}>
                            <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">{info.getValue()}</span>
                        </Link>
                    ),
                },
                {
                    id: 'location',
                    accessorKey: 'location',
                    header: t('location'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'startDate',
                    accessorKey: 'startDate',
                    header: t('start_date'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'endDate',
                    accessorKey: 'endDate',
                    header: t('end_date'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'status',
                    accessorKey: 'status',
                    header: t('status'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'actions',
                    header: t('actions'),
                    cell: info => (
                        <div>
                            {renderActionButton(info.row.original.attendanceId)}
                        </div>
                    )
                }
            ]
        }
    ]

    return (
        <>
            <Header userType="user" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"}>
                    <Table<UserConferenceInfo> data={conferences} columns={columns} renderHeaderButton={renderHeaderButton}/>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage