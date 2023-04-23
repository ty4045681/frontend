import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {AuthenticationProps} from "@/services/auth";
import {UserType} from "@/interfaces/UserType";
import React from "react";

const schema = yup.object({
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

const fields: {label: string, name: keyof FormValues, type: string}[] = [
    { label: 'Current Password', name: 'currentPassword', type: 'password' },
    { label: 'New Password', name: 'newPassword', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
]

interface ChangePasswordProps extends AuthenticationProps {
    userType: UserType
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ userType, isAuthenticated, userData }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <div className={"container mx-auto px-4"}>
            <h2 className={"text-2xl font-bold mb-6"}>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"bg-white shadow-md rounded p-6"}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className={"block text-xl font-semibold mb-2"}>{field.label}</label>
                        <input {...register(field.name)} type={field.type} className={"border rounded p-2 w-full mb-4"} />
                        {errors[field.name] && <p className={"text-red-600"}>{errors[field.name]?.message}</p>}
                    </div>
                ))}
                <button type="submit" disabled={!isValid || isSubmitting} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword