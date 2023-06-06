import React, {useState} from 'react';
import {AdminConferencesInfo, ConferenceInfo} from '@/interfaces/DashboardTypes';
import {ColumnDef} from '@tanstack/react-table';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import Table from '@/components/dashboard/Table';
import {GetServerSideProps} from 'next';
import AdminService from "@/services/AdminService";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";

const ConferencesPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const { t, lang } = useTranslation('table')
    const [conferences, setConferences] = React.useState<AdminConferencesInfo[]>([])
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const renderHeaderButton = () => {
        const handleDelete = async () => {
            if (window.confirm(t('confirm_message'))) {
                // Delete selected rows from the backend
                await AdminService.deleteSelectedConferencesOfAdminId(userData?.id ?? "", Array.from(selectedRows))

                // Update the conferences state to remove the deleted rows
                setConferences(conferences.filter(conference => !selectedRows.has(conference.id)))

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

    const renderActionButton = (id: string) => {
        const handleDelete = async () => {
            if (window.confirm(t('confirm_message'))) {
                await AdminService.deleteSelectedConferencesOfAdminId(userData?.id ?? "", [id])

                setConferences(conferences.filter(conference => conference.id !== id))

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
        const updatedSelectedRows = new Set<string>()
        if (checked) {
            conferences.forEach(conference => updatedSelectedRows.add(conference.id))
        }
        setSelectedRows(updatedSelectedRows)
        setHeaderCheckboxSelected(checked)
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
        const fetchConferences = async () => {
            if (userData) {
                const adminConference = await AdminService.getConferencesByAdminId(userData.id)
                setConferences(adminConference)
            }
        }

        fetchConferences()
    }, [userData])

    const columns: ColumnDef<ConferenceInfo>[] = [
        {
            id: 'adminConference',
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
                            type="checkbox"
                            checked={selectedRows.has(info.row.original.id)}
                            onChange={e => onRowCheckboxChange(info.row.original.id, e.target.checked)}
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
                    id: 'location',
                    accessorKey: 'location',
                    header: t('location'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'organizer',
                    accessorKey: 'organizer',
                    header: t('organizer'),
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
                            {renderActionButton(info.row.original.id)}
                        </div>
                    )
                }
            ]
        }
    ]

    return (
        <>
            <Header userType='admin' isAuthenticated={isAuthenticated} userData={userData} />

            <div className='flex min-h-screen bg-gray-200 dark:bg-gray-900'>
                {/* Sidebar */}
                <Sidebar userType='admin' isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"}>
                    <Table<ConferenceInfo> data={conferences} columns={columns} renderHeaderButton={renderHeaderButton}/>
                </div>
            </div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage;
