import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerConferenceInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import NewConferenceForm from "@/components/dashboard/NewConferenceForm";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";
import OrganizerService from "@/services/OrganizerService";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import AttendanceService from "@/services/AttendanceService";

const ConferencesPage: React.FC<AuthenticationProps> = ({
    isAuthenticated,
    userData,
}) => {
    const {t, lang} = useTranslation("table");
    const [conferences, setConferences] = useState<OrganizerConferenceInfo[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const renderHeaderButton = () => {
        const handleDelete = async () => {
            if (
                window.confirm(
                    t("confirm_message")
                )
            ) {
                // Delete selected rows from the backend
                await OrganizerService.deleteSelectedConferencesOfOrganizerId(
                    userData?.id ?? "",
                    Array.from(selectedRows)
                );

                // Update the conferences state to remove the deleted rows
                setConferences(
                    conferences.filter((conference) => !selectedRows.has(conference.id))
                );

                // Clear the selected rows state
                setSelectedRows(new Set());
            }
        };
        return (
            <>
                <Modal
                    type={"primary"}
                    triggerTitle={"Add conference"}
                    title={"Add conference"}
                    content={<NewConferenceForm/>}
                />
                <Modal type={'warning'}
                       disabled={selectedRows.size === 0}
                       triggerTitle={t('delete_selected')}
                       title={"Warning"}
                       description={t('confirm_message')}
                       confirmTitle={t('delete_selected')}
                       onClickConfirm={handleDelete}
                />
            </>
        )
    }

    const renderActionButton = (id: string) => {
        const handleDelete = async () => {
            if (window.confirm(t('confirm_message'))) {
                await OrganizerService.deleteSelectedConferencesOfOrganizerId(userData?.id ?? "", [id])

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
        setHeaderCheckboxSelected(checked);
        if (checked) {
            const newSelectedRows = new Set(selectedRows);
            conferences.forEach((row) => newSelectedRows.add(row.id));
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
        const fetchConference = async () => {
            if (userData) {
                const organizerConference =
                    await OrganizerService.getOrganizerConference(userData.id);
                setConferences(organizerConference);
            }
        };

        fetchConference();
    }, [userData]);

    const columns: ColumnDef<OrganizerConferenceInfo>[] = [
        {
            id: "organizerConference",
            columns: [
                {
                    id: "checkbox",
                    header: () => (
                        <input
                            type="checkbox"
                            checked={headerCheckboxSelected}
                            onChange={(e) => onHeaderCheckboxChange(e.target.checked)}
                        />
                    ),
                    cell: (info) => (
                        <input
                            type="checkbox"
                            checked={selectedRows.has(info.row.original.id)}
                            onChange={(e) =>
                                onRowCheckboxChange(info.row.original.id, e.target.checked)
                            }
                        />
                    ),
                },
                {
                    id: "title",
                    accessorKey: "title",
                    header: t("title"),
                    cell: (info) => (
                        <Link href={`/conference/${info.row.original.id}`}>
                            <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">
                                {info.getValue()}
                            </span>
                        </Link>
                    ),
                },
                {
                    id: "location",
                    accessorKey: "location",
                    header: t("location"),
                    cell: (info) => info.getValue(),
                },
                {
                    id: "startDate",
                    accessorKey: "startDate",
                    header: t("start_date"),
                    cell: (info) => info.getValue(),
                },
                {
                    id: "endDate",
                    accessorKey: "endDate",
                    header: t("end_date"),
                    cell: (info) => info.getValue(),
                },
                {
                    id: "acceptedUsersNumber",
                    accessorKey: "acceptedUsersNumber",
                    header: t("accepted_users"),
                    cell: (info) => info.getValue(),
                },
                {
                    id: "pendingUsersNumber",
                    accessorKey: "pendingUsersNumber",
                    header: t("pending_users"),
                    cell: (info) => info.getValue(),
                },
                {
                    id: "rejectedUsersNumber",
                    accessorKey: "rejectedUsersNumber",
                    header: t("rejected_users"),
                    cell: (info) => info.getValue(),
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
            ],
        },
    ];

    return (
        <>
            <Header
                userType="organizer"
                isAuthenticated={isAuthenticated}
                userData={userData}
            />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar
                    userType={"organizer"}
                    isAuthenticated={isAuthenticated}
                    userData={userData}
                />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"}>
                    <Table<OrganizerConferenceInfo>
                        data={conferences}
                        columns={columns}
                        renderHeaderButton={renderHeaderButton}
                    />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context);
};

export default ConferencesPage;
