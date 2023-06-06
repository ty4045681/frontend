import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerAttendeesInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import {useEffect, useState} from "react";
import OrganizerService from "@/services/OrganizerService";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";
import * as Tooltip from "@radix-ui/react-tooltip";
import {HiX, HiCheck} from "react-icons/hi";
import ReviewButton from "@/components/dashboard/ReviewButton";

const AttendeesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')
    const [attendees, setAttendees] = useState<OrganizerAttendeesInfo[]>([])

    const renderActionButton = (id: string, status: ApplyStatus) => {
        const handleChangeStatus = async (newStatus: ApplyStatus) => {
            await OrganizerService.changeAttendanceStatusByOrganizerId(userData?.id ?? "", id, newStatus)
            setAttendees(attendees.map(attendee => {
                if (attendee.attendanceId === id) {
                    attendee.status = newStatus
                }
                return attendee
            }))
        }

        return (
            <ReviewButton status={status} handleStatusChange={handleChangeStatus} />
        )
    }

    useEffect(() => {
        const fetchAttendee = async () => {
            if (userData) {
                const organizerAttendee = await OrganizerService.getOrganizerAttendee(userData.id)
                setAttendees(organizerAttendee)
            }
        }

        fetchAttendee()
    }, [userData])

    const columns: ColumnDef<OrganizerAttendeesInfo>[] = [
        {
            id: 'organizerAttendee',
            columns: [
                // {
                //     id: "checkbox",
                //     cell: (info) => (
                //         <input
                //             type="checkbox"
                //             checked={selectedRows.has(info.row.original.id)}
                //             onChange={(e) =>
                //                 onRowCheckboxChange(info.row.original.id, e.target.checked)
                //             }
                //         />
                //     ),
                // },
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
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
                    header: t('conference_title'),
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
                        renderActionButton(info.row.original.attendanceId, info.row.original.status)
                    )
                }
            ]
        }
    ]

    return (
        <>
            <Header userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"}>
                    <Table<OrganizerAttendeesInfo> data={attendees} columns={columns}/>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default AttendeesPage