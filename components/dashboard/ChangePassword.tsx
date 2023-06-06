import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {AuthenticationProps} from "@/services/auth";
import UserType from "@/interfaces/UserType";
import React from "react";
import UserService from '@/services/UserService';
import useTranslation from "next-translate/useTranslation";

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
        )
        .test('notSameAsCurrent', 'New password must be different from the current password', function(value) {
            const { currentPassword } = this.parent;
            return currentPassword !== value;
        }),
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
    const { t, lang } = useTranslation('info_change')
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })

    const onSubmit = async (data: FormValues) => {
        if (!window.confirm(t('confirm_message'))) {
            return
        }
        try {
            const response = await UserService.changePassword(
                userData?.id ?? "",
                data.currentPassword,
                data.newPassword
            )
            if (response?.status === 200) {
                window.alert("Password updated")
                reset()
                console.log("User password updated", response.data)
            } else {
                window.alert("Password update failed")
                reset()
                console.log("User password update failed")
            }
        } catch (e) {
            console.error("Error changing password: ", e)
        }
    }

    return (
        <div className={"container mx-auto px-4"}>
            <h2 className={"text-black dark:text-white text-2xl font-bold m-6"}>{t('change_password')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"bg-white dark:bg-gray-800 shadow-md rounded p-6"}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className={"text-black dark:text-white block text-xl font-semibold mb-2"}>{t(field.name)}</label>
                        <input {...register(field.name)} type={field.type} className={"border rounded p-2 w-full mb-4"} />
                        {errors[field.name] && <p className={"text-red-600"}>{errors[field.name]?.message}</p>}
                    </div>
                ))}
                <button type="submit" className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>{t('change_password_button')}</button>
            </form>
        </div>
    )
}

export default ChangePassword