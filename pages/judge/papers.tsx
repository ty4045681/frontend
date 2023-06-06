import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {JudgePapersInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";
import React, {useEffect, useState} from "react";
import JudgeService from "@/services/JudgeService";
import useTranslation from "next-translate/useTranslation";
import ReviewButton from "@/components/dashboard/ReviewButton";
import PaperService from "@/services/PaperService";
import Modal from "@/components/dashboard/Modal";

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('table')
    const [papers, setPapers] = useState<JudgePapersInfo[]>([]);

    const renderActionButton = (paperId: string, status: ApplyStatus, paperTitle: string) => {
        const handleChangeStatus = async (newStatus: ApplyStatus) => {
            await JudgeService.changePaperStatusByJudgeId(userData?.id ?? "", paperId, newStatus)
            setPapers(papers.map(paper => {
                if (paper.id === paperId) {
                    paper.status = newStatus
                }
                return paper
            }))
        }

        const handleDownload = async () => {
            await PaperService.downloadPaper(paperId)
        }

        return (
            <>
                <ReviewButton status={status} handleStatusChange={handleChangeStatus} />
                <Modal type={'primary'}
                       triggerTitle={"Download"}
                       title={"Download"}
                       description={"Download paper: " + paperTitle + " ?"}
                       confirmTitle={"Download"}
                       onClickConfirm={handleDownload}
                />
            </>
        )
    }

    useEffect(() => {
        const fetchPaper = async () => {
            if (userData) {
                const judgePaper = await JudgeService.getJudgePaper(userData.id)
                setPapers(judgePaper)
            }
        }

        fetchPaper()
    }, [userData])

    const columns: ColumnDef<JudgePapersInfo>[] = [
        {
            id: "judgePaper",
            columns: [
                {
                    id: "title",
                    accessorKey: "title",
                    header: t('title'),
                    cell: info => info.getValue(),
                },
                {
                    id: "conferenceTitle",
                    accessorKey: "conferenceTitle",
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
                    id: "abstract",
                    accessorKey: "abstract",
                    header: t('abstract'),
                    cell: info => info.getValue(),
                },
                {
                    id: "status",
                    accessorKey: "status",
                    header: t('status'),
                    cell: info => info.getValue()
                },
                {
                    id: 'actions',
                    header: t('actions'),
                    cell: info => (
                        renderActionButton(info.row.original.id, info.row.original.status, info.row.original.title)
                    )
                }
            ]
        }
    ];

    return (
        <>
            <Header userType="judge" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar userType="judge" isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className={"ml-[150px] mt-16 overflow-x-hidden"} >
                    <Table<JudgePapersInfo> data={papers} columns={columns} />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context);
};

export default PapersPage;