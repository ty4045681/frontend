import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authService from "@/services/authService";

interface UserData {
    // id: string;
    username: string;
}

function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await authService.login(username, password);
            // Redirect to the protected page
            router.push("/user")
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;