import React from 'react';
import AdminSideBar from "@/components/AdminSideBar";
import AdminTable from "@/components/AdminTable";
import { Box, Typography } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    { field: 'location', headerName: 'Location', width: 200 },
];

const sampleConferences = [
    {
        id: 1,
        name: 'International Conference on AI & ML',
        startDate: '2023-07-12',
        endDate: '2023-07-14',
        location: 'New York, USA',
    },
    {
        id: 2,
        name: 'Global Summit on Data Science',
        startDate: '2023-08-24',
        endDate: '2023-08-26',
        location: 'London, UK',
    },
    {
        id: 3,
        name: 'Cybersecurity & Privacy Forum',
        startDate: '2023-09-10',
        endDate: '2023-09-12',
        location: 'Sydney, Australia',
    },
    {
        id: 4,
        name: 'International Conference on AI & ML',
        startDate: '2023-07-12',
        endDate: '2023-07-14',
        location: 'New York, USA',
    },
    {
        id: 5,
        name: 'Global Summit on Data Science',
        startDate: '2023-08-24',
        endDate: '2023-08-26',
        location: 'London, UK',
    },
    {
        id: 6,
        name: 'Cybersecurity & Privacy Forum',
        startDate: '2023-09-10',
        endDate: '2023-09-12',
        location: 'Sydney, Australia',
    },
];

const ConferencesPage = () => {
    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="bg-gray-100 w-3/4 p-8">
                <Box mb={4}>
                    <Typography variant="h4">Conference Management</Typography>
                </Box>
                <AdminTable columns={columns} rows={sampleConferences} />
            </div>
        </div>
    );
};

export default ConferencesPage;
