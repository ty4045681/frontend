import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import {useRouter} from "next/router";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import Link from "next/link";

const API_URL = `${API_BASE_URL}/user`

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    username: yup
        .string()
        .required('Username is required')
        .test('isUnique', 'Username is already used', async (value) => {
            const formData = new FormData()
            formData.append("username", value)
            const response = await axios.post(`${API_URL}/check-username`, formData)
            return !response.data.exists
        })
        .matches(
            /^[a-zA-Z0-9]+$/,
            'Username can only contain letters and numbers'
        ),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is invalid')
        .test('isUnique', 'Email is already used', async (value) => {
            const formData = new FormData()
            formData.append("email", value)
            const response = await axios.post(`${API_URL}/check-email`, formData)
            return !response.data.exists
        }),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase char, one lowercase char, one number, and one special char'
        ),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    // TODO: Could add gender option.
    address: yup.string().required('Address is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(
            /^[\d\s-.]+$/,
            'Invalid phone number'
        ),
    bio: yup.string().required('Bio is required'),
}).required()

type FormValues = yup.InferType<typeof schema>

const RegisterPage: React.FC = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: {errors, isValid, isSubmitting} } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const onSubmit = async (data: FormValues) => {
        const { username, email, password, address, phoneNumber, bio } = data
        const name = data.firstName + " " + data.lastName

        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
                name,
                address,
                phoneNumber,
                bio,
            })

            if (response.status === 201) {
                console.log('Register success', response.data)
                setTimeout(() => {
                    // reset()
                    router.push('/login')
                }, 2000)
            } else {
                console.log('Register failed', response.data)
            }
        } catch (e) {
            console.log('Register failed', e)
        }
    }

    const getAllErrorMessages = () => {
        return Object.values(errors).map((error) => error.message)
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-700">
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Sign up
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-1 text-black dark:text-white">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-1 text-black dark:text-white">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('lastName')}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 text-black dark:text-white">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={`w-full border border-gray-300 px-3 py-2 rounded`}
                            {...register('username')}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black dark:text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 text-black dark:text-white">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-1 text-black dark:text-white">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-1 text-black dark:text-white">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('address')}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-1 text-black dark:text-white">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('phoneNumber')}
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{errors.phoneNumber.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bio" className="block mb-1 text-black dark:text-white">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('bio')}
                        />
                        {errors.bio && (
                            <p className="text-red-500 text-sm">{errors.bio.message as string}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={!isValid || isSubmitting}
                        onClick={() => {
                            if (!isValid) {
                                setShowErrorMessage(true)
                                setTimeout(() => setShowErrorMessage(false), 3000)
                            }
                        }}
                    >
                        Sign up
                    </button>
                    <div
                        className={`speech-balloon \${showErrorMessage ? 'show-balloon' : ''}`}
                    >
                        Please fix the error before submitting
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/login">
                        <span className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage
