import React, {useEffect, useState} from "react";
import axios from "axios";
import {GetServerSideProps} from "next";
import {API_BASE_URL} from "@/config";

import {PaperInfo, UserPaperInfo} from "@/interfaces/DashboardTypes";
import {ColumnDef} from "@tanstack/react-table";
import useTranslation from "next-translate/useTranslation";
import PaperService from "@/services/PaperService";
import Modal from "@/components/dashboard/Modal";
import Navbar from "@/components/Navbar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";


interface PaperDownloadProps extends AuthenticationProps {
    conferenceId: string
}

const PaperDownload: React.FC<PaperDownloadProps> = ( {conferenceId, userData, isAuthenticated} ) => {
    const { t, lang } = useTranslation('table')

    const [papers, setPapers] = useState<PaperInfo[]>([])

    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false)

    const API_URL = `${API_BASE_URL}/paper`

    useEffect(() => {
        const requestPaperData = async () => {
            const response = await axios.get(`${API_URL}`, {params: {conferenceId: conferenceId}})
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }
            return response
        }
        requestPaperData().then(response => {
            setPapers(response.data)
        });
    }, [])

    const renderActionButton = (id: string) => {
        const handleDownload = async () => {
            await PaperService.downloadPaper(id)
        }

        return (
            <>
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
        const updatedSelectedRows = new Set(selectedRows);
        if (checked) {
            updatedSelectedRows.add(id);
        } else {
            updatedSelectedRows.delete(id);
        }
        setSelectedRows(updatedSelectedRows);
    };

    const columns: ColumnDef<PaperInfo>[] = [
        {
            id: 'paperDownload',
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
            <Navbar isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">

                {/* Content */}
                <div className={"mt-1 overflow-x-hidden"}>
                    <h2 className={"text-black dark:text-white text-2xl font-semibold m-6"}>Paper Download</h2>
                    <Table<PaperInfo> data={papers} columns={columns}/>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const conferenceId = context.query.conferenceId || ""

    const authenticatedProps = await getServerSideAuthProps(context).then((props) => {
        if ("props" in props) {
            return props.props
        } else {
            return props
        }
    })

    return {
        props: {
            conferenceId,
            ...authenticatedProps
        }
    }
}

export default PaperDownload;