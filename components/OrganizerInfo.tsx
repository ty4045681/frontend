import { Box, Typography, Button } from '@mui/material';
import {useCallback, useEffect, useState} from "react";
import OrganizerService, {GetOrganizerInfoInterface} from "@/services/OrganizerService";

const OrganizerInfo = () => {
    const [organizerInfo, setOrganizerInfo] = useState<GetOrganizerInfoInterface | null>(null)

    const fetchOrganizerInfo = useCallback(async () => {
        try {
            const data = await OrganizerService.getOrganizerInfo()
            setOrganizerInfo(data)
        } catch (e) {
            console.error('Error fetching user info: ', e)
        }
    }, [])

    useEffect(() => {
        fetchOrganizerInfo()
    }, [fetchOrganizerInfo]);

    return (
        <Box>
            {organizerInfo ? (
                <>
                    <Typography variant="h5">User Information</Typography>
                    <Typography variant="body1">Username: {organizerInfo.username}</Typography>
                    <Typography variant="body1">Email: {organizerInfo.email}</Typography>
                    <Button variant="contained" color="primary">
                        Change Password
                    </Button>
                    <Typography variant="body1">Name: {organizerInfo.name}</Typography>
                    <Typography variant="body1">Phone: {organizerInfo.phoneNumber}</Typography>
                    <Typography variant="body1">Address: {organizerInfo.address}</Typography>
                    <Typography variant="body1">Bio: {organizerInfo.bio}</Typography>
                </>
            ) : (
                <Typography variant="body1">Loading user information...</Typography>
            )}
        </Box>
    );
};

export default OrganizerInfo;
