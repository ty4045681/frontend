import OrganizerService, {GetUserByConferenceIdInterface, OrganizerConferenceData} from "@/services/OrganizerService";
import React, {useEffect, useState} from "react";
import AdminTable from "@/components/AdminTable";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
]

const OrganizerConference = () => {
    const [conferenceId, setConferenceId] = useState<string>("");
    const [conferences, setConferences] = useState<OrganizerConferenceData[]>([])
    const [registeredUsers, setRegisteredUsers] = useState<GetUserByConferenceIdInterface[]>([]);

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
        const fetchRegisteredUsers = async () => {
            const users = await OrganizerService.getUserByConferenceId(conferenceId)
            setRegisteredUsers(users ?? []);
        }
        fetchRegisteredUsers();
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
            <AdminTable columns={columns} rows={registeredUsers} />
        </Box>
    )
}

export default OrganizerConference