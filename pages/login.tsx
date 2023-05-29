import React from 'react';
import { useRouter } from 'next/router';
import authService from "@/services/authService";
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from 'next/link';
import {useTheme} from "next-themes";

const schema = yup.object(
    {
        username: yup
            .string()
            .required("Username is required"),
        password: yup
            .string()
            .required("Password is required")
    }
).required()

type FormValues = yup.InferType<typeof schema>

const LoginPage: React.FC = () => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await authService.login(data.username, data.password)

            if (response.status === 200) {
                console.log('log in succeed', response.data)
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else {
                console.log('log in failed', response.data)
            }
        } catch (e) {
            console.log('register failed', e)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full sm:max-w-md">
                <h2 className="dark:text-mauve5 text-center text-3xl font-extrabold text-gray-900 mb-6">
                    Sign in
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            placeholder="Username"
                            {...register('username')}
                        />
                        {errors.username && (
                            <p className={"text-red-500 text-sm"}>{errors.username.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            placeholder="Password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className={"text-red-500 text-sm"}>{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={!isValid || isSubmitting}
                    >
                        Sign in
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/register">
                        <span className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;