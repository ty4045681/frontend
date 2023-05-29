import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { OrganizerConferenceInfo } from "@/interfaces/DashboardTypes";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { ColumnDef } from "@tanstack/react-table";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import OrganizerService from "@/services/OrganizerService";
import NewConferenceForm from "@/components/dashboard/NewConferenceForm";
import Modal from "react-modal";
import useTranslation from "next-translate/useTranslation";

Modal.setAppElement("#__next");

const ConferencesPage: React.FC<AuthenticationProps> = ({
    isAuthenticated,
    userData,
}) => {
    const { t, lang } = useTranslation("table");
    const [conferences, setConferences] = useState<OrganizerConferenceInfo[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    

    const renderHeaderButton = () => (
        <div>
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
                onClick={openModal}
            >
                {t("add_conference")}
            </button>

            <button
                className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none ${selectedRows.size === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                    }`}
                disabled={selectedRows.size === 0}
                onClick={handleDelete}
            >
                {t("delete_selected")}
            </button>
        </div>
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

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar
                    userType={"organizer"}
                    isAuthenticated={isAuthenticated}
                    userData={userData}
                />

                {/* Content */}
                <div className={"ml-[150px] mt-16"}>
                    <Table<OrganizerConferenceInfo>
                        data={conferences}
                        columns={columns}
                        renderHeaderButton={renderHeaderButton}
                        onRowCheckboxChange={onRowCheckboxChange}
                    />
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="New Conference Modal"
                className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
                // overlayClassName="fixed inset-0 bg-black opacity-100"
            >
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-md sm:w-full sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex justify-between">
                        New Conference
                        <button
                            onClick={closeModal}
                            className="bg-transparent border-none cursor-pointer text-gray-500 text-2xl leading-none px-2 py-1"
                        >
                            &times;
                        </button>
                    </h2>
                    <NewConferenceForm />
                </div>
            </Modal>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context);
};

export default ConferencesPage;
