import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/dashboard/Table";
import {OrganizerPaperInfo} from "@/interfaces/DashboardTypes";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {ColumnDef} from "@tanstack/react-table";
import {GetServerSideProps} from "next";

const papers: OrganizerPaperInfo[] = [
    {
        title: "Paper 1",
        conferenceTitle: "Conference 1",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 1",
        acceptedPapersNumber: 10,
        pendingPapersNumber: 10,
        rejectedPapersNumber: 10,
    },
    {
        title: "Paper 2",
        conferenceTitle: "Conference 2",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 2",
        acceptedPapersNumber: 10,
        pendingPapersNumber: 10,
        rejectedPapersNumber: 10,
    },
    {
        title: "Paper 3",
        conferenceTitle: "Conference 3",
        authors: ["Author 1", "Author 2"],
        keywords: ["Keyword 1", "Keyword 2"],
        abstract: "Abstract 3",
        acceptedPapersNumber: 10,
        pendingPapersNumber: 10,
        rejectedPapersNumber: 10,
    }
]

const PapersPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const columns: ColumnDef<OrganizerPaperInfo>[] = [
        {
            id: 'organizerPaper',
            columns: [
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
                    cell: info => info.getValue(),
                },
                {
                    id: 'keywords',
                    accessorKey: 'keywords',
                    cell: info => info.getValue(),
                },
                {
                    id: 'abstract',
                    accessorKey: 'abstract',
                    cell: info => info.getValue(),
                },
                {
                    id: 'acceptedPapersNumber',
                    accessorKey: 'acceptedPapersNumber',
                    cell: info => info.getValue(),
                },
                {
                    id: 'pendingPapersNumber',
                    accessorKey: 'pendingPapersNumber',
                    cell: info => info.getValue(),
                },
                {
                    id: 'rejectedPapersNumber',
                    accessorKey: 'rejectedPapersNumber',
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
                <Table<OrganizerPaperInfo> data={papers} columns={columns} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default PapersPage