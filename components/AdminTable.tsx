import React, {useState} from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridToolbar,
    GridRenderCellParams, GridValidRowModel,
} from '@mui/x-data-grid';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent, TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {Delete, Edit} from "@mui/icons-material";

interface AdminTableProps {
    columns: GridColDef[];
    rows: GridRowsProp;
}

const AdminTable: React.FC<AdminTableProps> = ({ columns, rows }) => {
    const theme = useTheme();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<GridValidRowModel>();
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [filteredUsers, setFilteredUsers] = useState([...rows]);

    const finalColumns = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <IconButton onClick={() => handleEditRow(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRow(params.row)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ]

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleRowsPerPageChange = (
        event: SelectChangeEvent<number>
    ) => {
        setRowsPerPage(event.target.value as number)
        setPage(1)
    }

    const handleEditRow = (row: GridValidRowModel) => {
        setSelectedRow(row)
        setOpenEditDialog(true)
    }

    const handleDeleteRow = (row: GridValidRowModel) => {
        setSelectedRow(row)
        setOpenDeleteDialog(true)
    }

    return (
        <>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={finalColumns}
                    components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                                sx={{ fontSize: theme.typography.h6.fontSize }}
                            >
                                <Typography>No records found.</Typography>
                            </Box>
                        ),
                    }}
                    rowCount={rows.length}
                    paginationMode="client"
                />
            </div>
            <Box mt={2} display="flex" justifyContent="center">
                <FormControl>
                    <InputLabel htmlFor="rows-per-page">Rows per page</InputLabel>
                    <Select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        label="Rows per page"
                        inputProps={{
                            name: 'rows-per-page',
                            id: 'rows-per-page'
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    color="primary"
                />
            </Box>
            {/* Edit Row Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Row</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <>
                            {Object.keys(selectedRow).map((key, index) => (
                                index === 0 ? null :
                                <TextField
                                    margin={'dense'}
                                    key={key}
                                    label={key}
                                    value={selectedRow[key]}
                                    fullWidth
                                    autoFocus={index === 1}
                                />
                            ))}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={() => setOpenEditDialog(false)}>Save</Button>
                </DialogActions>
            </Dialog>
            {/* Delete Row Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Delete Row</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <Typography>
                            Are you sure you want to delete this row?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminTable;
