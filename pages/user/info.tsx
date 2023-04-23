import * as yup from 'yup'
import axios from "axios";
import {API_BASE_URL} from "@/config";
import {AuthenticationProps} from "@/services/auth";
import React from "react";
import {useRouter} from "next/router";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const API_URL = `${API_BASE_URL}/user`

const schema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
    username: yup
        .string()
        .required('Username is required')
        .test('isUnique', 'Username is already used', async (value) => {
            const formData = new FormData()
            formData.append('username', value)
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

const passwordSchema = yup.object({
    currentPassword: yup
        .string()
        .required('Current password is required'),
    newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase char, one lowercase char, one number, and one special char'
        ),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
}).required()

type FormValues = yup.InferType<typeof schema>
type PasswordFormValues = yup.InferType<typeof passwordSchema>

const fields: {label: string, name: keyof FormValues, type: string}[] = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
    { label: 'Bio', name: 'bio', type: 'text' },
]

const passwordFields: {label: string, name: keyof PasswordFormValues, type: string}[] = [
    { label: 'Current Password', name: 'currentPassword', type: 'password' },
    { label: 'New Password', name: 'newPassword', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
]

const UserInfoPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const router = useRouter()
    const user: FormValues = {
        name: 'Tom Smith',
        username: 'USER11',
        email: '112233@gmail.com',
        address: '123 Main St',
        phoneNumber: '1234567890',
        bio: 'I am a software engineer',
    }

    const { control, register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
        defaultValues: user,
        resolver: yupResolver(schema),
        mode: "onBlur",
    })


    const onSubmit = async (data: FormValues) => {
        console.log("Updated data: ", data)
    }

    return (
        <div className={"container mx-auto px-4"}>
            <h2 className={"text-2xl font-semibold mb-6"}>User Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"bg-white shadow-md rounded p-6"}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-xl font-semibold mb-2" htmlFor={field.name}>
                            {field.label}
                        </label>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: inputField }) => (
                                <input {...inputField} type={field.type} className="border rounded p-2 w-full mb-4" />
                            )}
                        />
                        {errors[field.name] && <p className="text-red-600">{errors[field.name]?.message}</p>}
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default UserInfoPage