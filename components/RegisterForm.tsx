import React, { useState } from "react";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import {useRouter} from "next/router";

const RegisterForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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
        <>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                {/* Render input fields and buttons */}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={checkUsername}
                        required
                    />
                    {usernameError && <div className="error-message">{usernameError}</div>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={checkEmail}
                        required
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            checkPasswordStrength()
                        }}
                        required
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={checkPhoneNumber}
                    />
                    {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={formStatus === "submitting" || formStatus === "checking"}>Register</button>
                {formStatus === 'success' && <p>Success!</p>}
                {formStatus === 'error' && <p>Error!</p>}
            </form>
        </>
    );
};

export default RegisterForm;
