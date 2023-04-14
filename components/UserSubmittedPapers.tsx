import {Box} from "@mui/material";
import PaperService, {UserPaperTableData} from "@/services/PaperService";
import {useEffect, useState} from "react";
import AdminTable from "@/components/AdminTable";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'conferenceTitle', headerName: 'Conference', width: 200 },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'abstract', headerName: 'Abstract', width: 200 },
    { field: 'keywords', headerName: 'Keywords', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
]

const UserSubmittedPapers = () => {
    const [papers, setPapers] = useState<UserPaperTableData[]>([]);

    useEffect(() => {
        const fetchPapers = async () => {
            const papers = await PaperService.getUserPaper()
            setPapers(papers ?? []);
        }
        fetchPapers();
    }, [])

    return (
        <Box>
            <AdminTable columns={columns} rows={papers} />
        </Box>
    )
}

export default UserSubmittedPapers