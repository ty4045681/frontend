import { UserConferenceInfo } from "@/interfaces/DashboardTypes";
import Header from "@/components/dashboard/Header";
import { GetServerSideProps } from "next";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import AttendanceService from "@/services/AttendanceService";
import useTranslation from "next-translate/useTranslation";


const ConferencesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')
    const [conferences, setConferences] = useState<UserConferenceInfo[]>([])
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

    const renderHeaderButton = () => (
        <button
            className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none ${selectedRows.size === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            disabled={selectedRows.size === 0}
            onClick={handleDelete}
        >
            {t('delete_selected')}
        </button>
    );

    const onRowCheckboxChange = (id: string, checked: boolean) => {
        const updatedSelectedRows = new Set(selectedRows);
        if (checked) {
            updatedSelectedRows.add(id);
        } else {
            updatedSelectedRows.delete(id);
        }
        setSelectedRows(updatedSelectedRows);
    };

    const handleDelete = async () => {
        if (window.confirm(t('confirm_message'))) {
            // Delete selected rows from the backend
            await AttendanceService.deleteSelectedAttendancesOfUserId(userData?.id ?? "", Array.from(selectedRows));

            // Update the conferences state to remove the deleted rows
            setConferences(conferences.filter(conference => !selectedRows.has(conference.attendanceId)));

            // Clear the selected rows state
            setSelectedRows(new Set());
        }
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
                <div className={"ml-[150px] mt-16"}>
                    <Table<UserConferenceInfo> data={conferences} columns={columns} renderHeaderButton={renderHeaderButton} onRowCheckboxChange={onRowCheckboxChange} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage