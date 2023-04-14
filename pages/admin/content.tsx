import { Box, Typography } from '@mui/material';
import React from "react";
import AdminTable from "@/components/AdminTable";
import AdminSideBar from "@/components/AdminSideBar";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'created', headerName: 'Created', width: 150 },
    { field: 'updated', headerName: 'Updated', width: 150 },
];

const sampleContent = [
    {
        id: 1,
        title: 'Conference Registration Guidelines',
        type: 'Article',
        created: '2023-01-15',
        updated: '2023-02-20',
    },
    {
        id: 2,
        title: 'How to Prepare and Submit a Paper',
        type: 'Tutorial',
        created: '2023-02-10',
        updated: '2023-02-28',
    },
    {
        id: 3,
        title: 'Keynote Speaker Announcement',
        type: 'News',
        created: '2023-03-05',
        updated: '2023-03-05',
    },
];


const ContentPage = () => {
    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="bg-gray-100 w-3/4 p-8">
                <Box mb={4}>
                    <Typography variant="h4">Content Management</Typography>
                </Box>
                <AdminTable columns={columns} rows={sampleContent} />
            </div>
        </div>
    );
};

export default ContentPage;