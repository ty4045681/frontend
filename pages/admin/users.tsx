import AdminSideBar from "@/components/AdminSideBar";
import {Box} from "@mui/system";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
    IconButton, InputLabel, MenuItem, Pagination,
    Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    Typography
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {DataGrid, GridRenderCellParams, GridToolbar} from "@mui/x-data-grid";
import AdminTable from "@/components/AdminTable";

interface User {
    id: string
    name: string
    email: string
    role: 'Admin' | 'Organizer' | 'Speaker' | 'Attendee' | 'User'
}

const sampleUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Attendee' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Speaker' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin' },
    // ... more users
];

const AdminUsersPage = () => {
    const [filteredUsers, setFilteredUsers] = useState([...sampleUsers]);

    // useEffect(() => {
    //     setFilteredUsers([...sampleUsers].slice((page - 1) * rowsPerPage, page * rowsPerPage));
    // }, [page, rowsPerPage]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            {/* ... */}

            {/* User Management */}
            <div className="bg-gray-100 w-3/4 p-8">
                <Box mb={4}>
                    <Typography variant="h4">User Management</Typography>
                </Box>
                <AdminTable columns={columns} rows={sampleUsers} />
            </div>
        </div>
    );
};

export default AdminUsersPage;