import * as yup from "yup";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {AuthenticationProps} from "@/services/auth";
import {useRouter} from "next/router";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import UserType from "@/interfaces/UserType";
import {API_BASE_URL} from "@/config";
import UserService, {GetUserInfoInterface} from "@/services/UserService";
import useTranslation from "next-translate/useTranslation";

const API_URL = `${API_BASE_URL}/user`

const schema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
    username: yup
        .string()
        .required(),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is invalid')
        .test('isUnique', 'Email is already used', async function (value) {
            const { originalUser } = this.options.context as FormContext;
            if (value === originalUser.email) {
                return true;
            }
            const formData = new FormData();
            formData.append("email", value);
            const response = await axios.post(`${API_URL}/check-email`, formData);
            return !response.data.exists;
        }),
    address: yup.string().default("").nullable(),
    phoneNumber: yup
        .string()
        .default("")
        .matches(
            /^[\d\s-.]*$/,
            'Invalid phone number'
        ).nullable(),
    bio: yup.string().default("").nullable(),
}).required();


type FormValues = yup.InferType<typeof schema>
type FormContext = {
    originalUser: FormValues;
};

const fields: {label: string, name: keyof FormValues, type: string}[] = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
    { label: 'Bio', name: 'bio', type: 'text' },
]

interface InfoProps extends AuthenticationProps {
    userType: UserType
}

const Info: React.FC<InfoProps> = ({ userType, isAuthenticated, userData }) => {
    const router = useRouter()
    const { t, lang } = useTranslation('info_change')

    const [user, setUser] = useState<FormValues>({
        name: '',
        username: '',
        email: '',
        address: '',
        phoneNumber: '',
        bio: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const [
                user
            ] = await Promise.all([
                UserService.getUserInfo()
            ])

            setUser(user)
        }

        fetchData()
    }, [])

    const { control, register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<FormValues, FormContext>({
        defaultValues: user,
        resolver: yupResolver(schema),
        mode: "onBlur",
        context: { originalUser: user },
    })

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing(!isEditing)

    const UserInfoDisplay = () => {
        return (
            <div className={"container mx-auto px-4"}>
                <h2 className={"text-black dark:text-white text-2xl font-semibold mb-6"}>{t('user_info')}</h2>
                <div className={"bg-white dark:bg-gray-800 shadow-md rounded p-6"}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="text-black dark:text-white block text-xl font-semibold mb-2" htmlFor={field.name}>
                                {t(field.name)}
                            </label>
                            <p className="border rounded p-2 w-full mb-4">
                                {user[field.name] ? (
                                    <p className={"text-black dark:text-white"}>{user[field.name]}</p>
                                ) : (
                                    <span className="text-gray-400">{t('blank')}</span>
                                )}
                            </p>
                        </div>
                    ))}
                    <button
                        onClick={toggleEditing}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        {t('edit_button')}
                    </button>
                </div>
            </div>
        );
    };


    const UserInfoForm = () => {
        return (
            <div className={"container mx-auto px-4"}>
                <h2 className={"text-black dark:text-white text-2xl font-semibold mb-6"}>User Information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={"bg-white dark:bg-gray-800 shadow-md rounded p-6"}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="text-black dark:text-white block text-xl font-semibold mb-2" htmlFor={field.name}>
                                {t(field.name)}
                            </label>
                            {field.name === "bio" ? (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    render={({ field: inputField }) => (
                                        <textarea {...inputField}  value={inputField.value ?? ''} className="text-black dark:text-white border rounded p-2 w-full mb-4" />
                                    )}
                                />
                            ) : (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    render={({ field: inputField }) => (
                                        <input {...inputField} type={field.type} value={inputField.value ?? ''} disabled={field.name === "username"} className="text-black dark:text-white border rounded p-2 w-full mb-4" />
                                    )}
                                />
                            )}
                            {errors[field.name] && <p className="text-red-600">{errors[field.name]?.message}</p>}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={toggleEditing}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 mt-4"
                    >
                        {t('cancel')}
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        {t('save_changes')}
                    </button>
                </form>
            </div>
        )
    }

    const isDataChanged = (original: FormValues, newData: FormValues) => {
        return fields.some((field) => original[field.name] !== newData[field.name]);
    };


    const onSubmit = async (data: FormValues) => {
        if (isDataChanged(user, data)) {
            if (!window.confirm(t('confirm_message'))) {
                return;
            }
            try {
                const response = await UserService.updateUserInfo({
                    id: userData?.id ?? "",
                    ...data
                } as GetUserInfoInterface)
                if (response?.status === 200) {
                    console.log("User data updated", response.data)
                    setUser(response?.data)
                } else {
                    console.log("Register failed")
                }
            } catch (e) {
                console.error("Error changing info: ", e)
            }
            toggleEditing()
        } else {
            window.alert("You didn't make any changes.");
            toggleEditing();
        }
    }

    return (
        <div>
            {isEditing ? <UserInfoForm /> : <UserInfoDisplay />}
        </div>
    )
}

export default Info