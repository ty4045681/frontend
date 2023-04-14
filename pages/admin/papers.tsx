import React from 'react';
import AdminSideBar from "@/components/AdminSideBar";
import AdminTable from "@/components/AdminTable";
import { Box, Typography } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'conference', headerName: 'Conference', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
];

const samplePapers = [
    {
        id: 1,
        title: 'Deep Learning Techniques for Image Recognition',
        author: 'John Doe',
        conference: 'International Conference on AI & ML',
        status: 'Accepted',
    },
    {
        id: 2,
        title: 'Data Visualization in Modern Web Applications',
        author: 'Jane Smith',
        conference: 'Global Summit on Data Science',
        status: 'Under Review',
    },
    {
        id: 3,
        title: 'Securing IoT Devices with Advanced Encryption',
        author: 'Alice Brown',
        conference: 'Cybersecurity & Privacy Forum',
        status: 'Rejected',
    },
];


const PapersPage = () => {
    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="bg-gray-100 w-3/4 p-8">
                <Box mb={4}>
                    <Typography variant="h4">Paper Management</Typography>
                </Box>
                <AdminTable columns={columns} rows={samplePapers}
                />
            </div>
        </div>
    )
}

export default PapersPage