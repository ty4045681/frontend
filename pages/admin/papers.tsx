import React from 'react';
import {AdminPapersInfo} from '@/interfaces/DashboardTypes';
import {AuthenticationProps, getServerSideAuthProps} from '@/services/auth';
import {ColumnDef} from '@tanstack/react-table';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import {GetServerSideProps} from 'next';
import Table from '@/components/dashboard/Table';
import AdminService from "@/services/AdminService";
import PaperService from '@/services/PaperService';

const PapersPage = ({isAuthenticated, userData}: AuthenticationProps) => {
    const [papers, setPapers] = React.useState<AdminPapersInfo[]>([])
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())

    const renderHeaderButton = () => (
        <button
            className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none ${selectedRows.size === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            disabled={selectedRows.size === 0}
            onClick={handleDelete}
        >
            Delete Selected
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
        if (window.confirm('Are you sure you want to delete the selected rows? This action cannot be undone.')) {
            // Delete selected rows from the backend
            await PaperService.deleteSelectedPapersOfUserId(userData?.id ?? "", Array.from(selectedRows))

            // Update the papers state to remove the deleted rows
            setPapers(papers.filter(paper => !selectedRows.has(paper.id)))

            // Clear the selected rows state
            setSelectedRows(new Set())
        }
    }


    React.useEffect(() => {
        const fetchPapers = async () => {
            if (userData) {
                const adminPapers = await AdminService.getPapersByAdminId(userData.id)
                setPapers(adminPapers)
            }
        }

        fetchPapers()
    }, [userData])

    const columns: ColumnDef<AdminPapersInfo>[] = [
        {
            id: 'adminPaper',
            columns: [
                {
                    id: 'checkbox',
                    cell: info => (
                        <input
                            type="checkbox"
                            checked={selectedRows.has(info.row.id)}
                            onChange={e => onRowCheckboxChange(info.row.id, e.target.checked)}
                        />
                    ),
                },
                {
                    id: 'title',
                    accessorKey: 'title',
                    cell: info => info.getValue(),
                },
                {
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
                    cell: info => info.getValue(),
                },
                {
                    id: 'authors',
                    accessorKey: 'authors',
                    cell: info => {
                        const authors = info.getValue();
                        return Array.isArray(authors) ? authors.join(', ') : authors;
                    },
                },
                {
                    id: 'keywords',
                    accessorKey: 'keywords',
                    cell: info => {
                        const keywords = info.getValue();
                        return Array.isArray(keywords) ? keywords.join(', ') : keywords;
                    },
                },
                {
                    id: 'abstract',
                    accessorKey: 'abstract',
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
            <Header userType='admin' isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"admin"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <Table<AdminPapersInfo> data={papers} columns={columns} renderHeaderButton={renderHeaderButton} onRowCheckboxChange={onRowCheckboxChange} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage