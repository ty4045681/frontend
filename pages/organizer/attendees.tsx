import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import { OrganizerAttendeesInfo } from "@/interfaces/DashboardTypes";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { ColumnDef } from "@tanstack/react-table";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import OrganizerService from "@/services/OrganizerService";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const AttendeesPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [attendees, setAttendees] = useState<OrganizerAttendeesInfo[]>([])
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [selectedStatuses, setSelectedStatuses] = useState<Record<string, ApplyStatus>>({})
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleStatusChange = () => {
        if (window.confirm('Are you sure you want to change the status of the selected rows? This action cannot be undone.')) {
            // Change the status of the selected rows in the backend
            const updatedAttendees = attendees.map(attendee => {
                if (selectedRows.has(attendee.id)) {
                    attendee.status = selectedStatuses[attendee.id]
                }
                return attendee
            })
            setAttendees(updatedAttendees)

            // Clear the selected rows state
            setSelectedRows(new Set())
        }

        closeModal()
        setSelectedStatuses({})
    }

    const handleStatusSelectChange = (id: string, newStatus: string) => {
        setSelectedStatuses({
            ...selectedStatuses,
            [id]: newStatus as ApplyStatus
        });
    }

    const renderHeaderButton = () => (
        <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
            onClick={openModal}
        >
            Change Status
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
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
                    cell: info => info.getValue(),
                },
                {
                    id: 'status',
                    accessorKey: 'status',
                    cell: info => info.getValue(),
                },
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
                <div className={"ml-[150px] mt-16"}>
                    <Table<OrganizerAttendeesInfo> data={attendees} columns={columns} renderHeaderButton={renderHeaderButton} onRowCheckboxChange={onRowCheckboxChange} />
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Change Status"
                className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
            >
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-md sm:w-full sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex justify-between">Change Status</h2>

                    {/* Display a line for each selected row */}
                    {Array.from(selectedRows).map(id => {
                        const attendee = attendees.find(attendee => attendee.id === id);

                        return (
                            <div key={id} className="flex justify-between items-center mb-2">
                                <div className="text-lg">{attendee?.name}</div>
                                <div>
                                    <select
                                        className="p-2 border rounded-lg"
                                        value={selectedStatuses[id] || ''}
                                        onChange={e => handleStatusSelectChange(id, e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="status1">{'APPROVED'}</option>
                                        <option value="status2">{'REJECTED'}</option>
                                        {/* <option value="status3">Status 3</option> */}
                                        {/* Add options as per your needs */}
                                    </select>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleStatusChange}
                            className="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default AttendeesPage