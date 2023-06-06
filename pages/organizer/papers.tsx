import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerPaperInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import React, {useEffect, useState} from "react";
import OrganizerService from "@/services/OrganizerService";
import PaperService from "@/services/PaperService";
import useTranslation from "next-translate/useTranslation";
import Modal from "@/components/dashboard/Modal";

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')
    const [papers, setPapers] = useState<OrganizerPaperInfo[]>([])
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const renderHeaderButton = () => {
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
            if (window.confirm('Are you sure you want to delete the selected rows? This action cannot be undone.')) {
                await PaperService.deleteSelectedPapersOfUserId(userData?.id ?? "", [id])

                setPapers(papers.filter(paper => paper.id !== id))

                setSelectedRows(new Set())
            }
        }

        const handleDownload = async () => {
            await PaperService.downloadPaper(id)
        }

        return (
            <>
                <Modal type={'warning'}
                       triggerTitle={t('delete_selected')}
                       title={"Warning"}
                       description={t('confirm_message')}
                       confirmTitle={t('delete_selected')}
                       onClickConfirm={handleDelete}
                />
                <Modal type={'primary'}
                    triggerTitle={t('download')}
                    title={"Download"}
                    description={t('download_message')}
                    confirmTitle={t('download')}
                    onClickConfirm={handleDownload}
                />
            </>
        )
    }

    const onHeaderCheckboxChange = (checked: boolean) => {
        setHeaderCheckboxSelected(checked);
        if (checked) {
            const newSelectedRows = new Set(selectedRows);
            papers.forEach((row) => newSelectedRows.add(row.id));
            setSelectedRows(newSelectedRows);
        } else {
            setSelectedRows(new Set());
        }
    };

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
        const fetchPaper = async () =>{
            if (userData) {
                const organizerPaper = await OrganizerService.getOrganizerPaper(userData.id)
                setPapers(organizerPaper)
            }
        }

        fetchPaper()
    }, [userData])

    const columns: ColumnDef<OrganizerPaperInfo>[] = [
        {
            id: 'organizerPaper',
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
            <Header userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar userType="organizer" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={'ml-[150px] mt-16 overflow-x-hidden'}>
                    <Table<OrganizerPaperInfo> data={papers} columns={columns} renderHeaderButton={renderHeaderButton}/>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage