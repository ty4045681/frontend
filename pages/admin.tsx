import Link from 'next/link';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    LinearProgress,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {Description, Edit, People, Event} from "@mui/icons-material";
import React from "react";
import {Box} from "@mui/system";
import AdminSideBar from "@/components/AdminSideBar";

interface SummaryCardProps {
    Icon: React.ElementType;
    title: string;
    value: number | string;
}


const AdminPage = () => {
    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="bg-gray-100 w-3/4 p-8">
                <h2 className="text-xl mb-4">Dashboard</h2>
                <Grid container spacing={4}>
                    {/* Summary Cards */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Users</Typography>
                                <Typography variant="h3">1,253</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Conferences</Typography>
                                <Typography variant="h3">47</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Submissions</Typography>
                                <Typography variant="h3">3,122</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Example Button */}
                    {/*<Grid item xs={12}>*/}
                    {/*    <Box mb={2}>*/}
                    {/*        <Typography variant="h6">Example Button:</Typography>*/}
                    {/*    </Box>*/}
                    {/*    <Button variant="contained">Click me!</Button>*/}
                    {/*</Grid>*/}

                    {/*/!* Example Text Field *!/*/}
                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Box mb={2}>*/}
                    {/*        <Typography variant="h6">Example Text Field:</Typography>*/}
                    {/*    </Box>*/}
                    {/*    <TextField label="Name" variant="outlined" fullWidth />*/}
                    {/*</Grid>*/}

                    {/*/!* Example CircularProgress *!/*/}
                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Box mb={2}>*/}
                    {/*        <Typography variant="h6">Example CircularProgress:</Typography>*/}
                    {/*    </Box>*/}
                    {/*    <CircularProgress />*/}
                    {/*</Grid>*/}

                    {/*/!* Example LinearProgress *!/*/}
                    {/*<Grid item xs={12}>*/}
                    {/*    <Box mb={2}>*/}
                    {/*        <Typography variant="h6">Example LinearProgress:</Typography>*/}
                    {/*    </Box>*/}
                    {/*    <LinearProgress variant="determinate" value={75} />*/}
                    {/*</Grid>*/}
                </Grid>
            </div>
        </div>
    );
};

export default AdminPage;
