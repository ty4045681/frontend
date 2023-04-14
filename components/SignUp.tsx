import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from "next/router";
import {useState} from "react";
import axios from "axios";
import {API_BASE_URL, WEBSITE_BASE_URL} from "@/config";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={`${WEBSITE_BASE_URL}`}>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'checking' | 'success' | 'error'>('idle')
    const [passwordError, setPasswordError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const name = firstName + " " + lastName;

        // Check if there are any errors
        if (usernameError || emailError || passwordError) {
            setErrorMessage("Please fix the errors before submitting the form.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/user/register`, {
                username,
                email,
                password,
                name,
                address,
                phoneNumber,
                bio,
            });

            if (response.status !== 201) {
                console.error("User not registered", response.data)
                setFormStatus("error")
            } else {
                console.log("User registered", response.data);
                setSuccessMessage("User registered successfully. Redirecting to login page...")
                setFormStatus("success")
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            }
        } catch (error) {
            console.error("User not registered")
            setFormStatus("error")
            setErrorMessage("User not registered")
        }

    }

    const checkUsername = async () => {
        if (!username) {
            setUsernameError("")
            return;
        }

        setFormStatus("checking")
        const formData = new FormData()
        formData.append("username", username)

        const response = await axios.post(`${API_BASE_URL}/user/check-username`, formData)
        if (response.status !== 200) {
            console.error("Username check failed", response.data)
        }
        if (response.data.exists) {
            setUsernameError("Username is already taken")
        } else {
            setUsernameError("")
        }
        setFormStatus("idle")
    }

    const checkEmail = async () => {
        if (!email) {
            setEmailError("")
            return;
        }

        // Check email format using a regex pattern
        const emailFormatRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailFormatRegex.test(email)) {
            setEmailError("Invalid email format.");
            return;
        }

        setFormStatus("checking")
        const formData = new FormData()
        formData.append("email", email)

        const response = await axios.post(`${API_BASE_URL}/user/check-email`, formData)
        if (response.status !== 200) {
            console.error("Email check failed", response.data)
        }
        if (response.data.exists) {
            setEmailError("Email is already taken")
        } else {
            setEmailError("")
        }
        setFormStatus("idle")
    }

    const checkPasswordStrength = () => {
        // A simple regex pattern to check for password strength
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (strongPasswordRegex.test(password)) {
            setPasswordError("");
        } else {
            setPasswordError("Password is too weak. Use a mix of uppercase, lowercase, numbers, and symbols.");
        }
    }

    const checkPhoneNumber = () => {
        if (!phoneNumber) {
            setPhoneNumberError("")
            return
        }

        // Check phone number format using a regex pattern
        // This pattern allows only digits and optional spaces, dashes, or dots
        const phoneNumberFormatRegex = /^[\d\s-.]+$/
        if (!phoneNumberFormatRegex.test(phoneNumber)) {
            setPhoneNumberError("Invalid phone number format.")
            return
        }

        // Clear the error message if the format is valid
        setPhoneNumberError("")
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={checkUsername}
                                    error={!!usernameError}
                                    helperText={usernameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={checkEmail}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="password"
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={checkPasswordStrength}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="address"
                                    name="address"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="phone-number"
                                    name="phoneNumber"
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="bio"
                                    name="bio"
                                    fullWidth
                                    id="bio"
                                    label="Bio"
                                    onChange={(e) => setBio(e.target.value)}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}