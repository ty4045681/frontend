import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authService from "@/services/authService";
import SignIn from "@/components/SignIn";

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
        <SignIn />
    );
}

export default LoginPage;