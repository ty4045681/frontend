import OrganizerService, {GetPaperByConferenceIdInterface, OrganizerConferenceData} from "@/services/OrganizerService";
import React, {useEffect, useState} from "react";
import AdminTable from "@/components/AdminTable";
import {Box} from "@mui/system";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'abstract', headerName: 'Abstract', width: 200 },
    { field: 'keywords', headerName: 'Keywords', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
]

const OrganizerPaper = () => {
    const [conferenceId, setConferenceId] = useState<string>("");
    const [conferences, setConferences] = useState<OrganizerConferenceData[]>([])
    const [papers, setPapers] = useState<GetPaperByConferenceIdInterface[]>([]);

    const handleSelectChange = (event: SelectChangeEvent) => {
        setConferenceId(event.target.value);
    }

    useEffect(() => {
        const requestConferenceData = async () => {
            const conferences = await OrganizerService.getOrganizerConference()
            setConferences(conferences ?? [])
        }
    }, [])

    useEffect(() => {
        const fetchPapers = async () => {
            const papers = await OrganizerService.getPaperByConferenceId(conferenceId)
            setPapers(papers ?? []);
        }
        fetchPapers();
    }, [conferenceId])

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id={"conference-select-label"}>Conference</InputLabel>
                <Select
                    labelId={"conference-select-label"}
                    id={"conference-select"}
                    value={conferenceId}
                    label={"Conference"}
                    onChange={handleSelectChange}
                >
                    {conferences.map((conference) => (
                        <MenuItem key={conference.id} value={conference.id}>{conference.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <AdminTable columns={columns} rows={papers} />
        </Box>
    )
}

export default OrganizerPaper