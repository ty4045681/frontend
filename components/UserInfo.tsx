import { Box, Typography, Button } from '@mui/material';
import {useCallback, useEffect, useState} from "react";
import UserService, {GetUserInfoInterface} from "@/services/UserService";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState<GetUserInfoInterface | null>(null)

    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await UserService.getUserInfo()
            setUserInfo(data)
        } catch (e) {
            console.error('Error fetching user info: ', e)
        }
    }, [])

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo]);

    return (
        <Box>
            {userInfo ? (
                <>
                    <Typography variant="h5">User Information</Typography>
                    <Typography variant="body1">Username: {userInfo.username}</Typography>
                    <Typography variant="body1">Email: {userInfo.email}</Typography>
                    <Button variant="contained" color="primary">
                        Change Password
                    </Button>
                    <Typography variant="body1">Name: {userInfo.name}</Typography>
                    <Typography variant="body1">Phone: {userInfo.phoneNumber}</Typography>
                    <Typography variant="body1">Address: {userInfo.address}</Typography>
                    <Typography variant="body1">Bio: {userInfo.bio}</Typography>
                </>
            ) : (
                <Typography variant="body1">Loading user information...</Typography>
            )}
        </Box>
    );
};

export default UserInfo;
