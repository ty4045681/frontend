import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {UserPaperInfo} from "@/interfaces/DashboardTypes";
import PaperService from "@/services/PaperService";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')

    const [papers, setPapers] = useState<UserPaperInfo[]>([])
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
            await PaperService.deleteSelectedPapersOfUserId(userData?.id ?? "", Array.from(selectedRows));

            // Update the papers state to remove the deleted rows
            setPapers(papers.filter(paper => !selectedRows.has(paper.id)));

            // Clear the selected rows state
            setSelectedRows(new Set());
        }
    };

    useEffect(() => {
        const fetchPapers = async () => {
            if (userData) {
                const papersOfUser = await PaperService.getPapersByUserId(userData.id)
                setPapers(papersOfUser)
            }
        }

        fetchPapers()
    }, [userData])

    const columns: ColumnDef<UserPaperInfo>[] = [
        {
            id: 'userPaper',
            columns: [
                {
                    id: 'checkbox',
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
                    cell: info => info.getValue(),
                },
                {
                    id: 'conferenceTitle',
                    accessorKey: 'conferenceTitle',
                    header: t('conference_title'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'authors',
                    accessorKey: 'authors',
                    header: t('authors'),
                    cell: info => {
                        const authors = info.getValue();
                        return Array.isArray(authors) ? authors.join(', ') : authors;
                    },
                },
                {
                    id: 'keywords',
                    accessorKey: 'keywords',
                    header: t('keywords'),
                    cell: info => {
                        const keywords = info.getValue();
                        return Array.isArray(keywords) ? keywords.join(', ') : keywords;
                    },
                },
                {
                    id: 'abstract',
                    accessorKey: 'abstract',
                    header: t('abstract'),
                    cell: info => info.getValue(),
                },
                {
                    id: 'status',
                    accessorKey: 'status',
                    header: t('status'),
                    cell: info => info.getValue(),
                },
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
                    <Table<UserPaperInfo> data={papers} columns={columns} renderHeaderButton={renderHeaderButton} onRowCheckboxChange={onRowCheckboxChange} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage