import {Box} from "@mui/material";
import ConferenceService, {UserConferenceTableData} from "@/services/ConferenceService";
import {useEffect, useState} from "react";
import AdminTable from "@/components/AdminTable";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
]

const UserConferences = () => {
    const [conferences, setConferences] = useState<UserConferenceTableData[]>([]);

    useEffect(() => {
        const fetchConferences = async () => {
            const conferences = await ConferenceService.getUserConference()
            setConferences(conferences ?? []);
        }
        fetchConferences();
    }, [])

    return (
        <Box>
            <AdminTable columns={columns} rows={conferences} />
        </Box>
    )
}

export default UserConferences