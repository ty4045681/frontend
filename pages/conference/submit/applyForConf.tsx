import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import {useRouter} from "next/router";
import axios from "axios";
import {API_BASE_URL} from "@/config";

const API_URL = `${API_BASE_URL}/conference`

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    phoneNumber: yup.string().required('Phone number is required').matches(/^[\d\s-.]+$/, 'Invalid phone number'),
    reason: yup.string().required('Please provide a reason for attending the conference'),
}).required()

type FormValues = yup.InferType<typeof schema>

const ApplyForConferencePage: React.FC = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: {errors, isValid, isSubmitting} } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const onSubmit = async (data: FormValues) => {
        const { reason } = data
        const name = data.firstName + " " + data.lastName

        try {
            const response = await axios.post(`${API_URL}/apply`, {
                reason,
            })

            if (response.status === 201) {
                console.log('Application success', response.data)
                setTimeout(() => {
                    // reset()
                    router.push('/success')
                }, 2000)
            } else {
                console.log('Application failed', response.data)
            }
        } catch (e) {
            console.log('Application failed', e)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    Apply for Conference
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="firstName" className="block mb-1">*/}
                    {/*        First Name*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        id="firstName"*/}
                    {/*        type="text"*/}
                    {/*        className="w-full border border-gray-300 px-3 py-2 rounded"*/}
                    {/*        {...register('firstName')}*/}
                    {/*    />*/}
                    {/*    {errors.firstName && (*/}
                    {/*        <p className="text-red-500 text-sm">{errors.firstName.message}</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="lastName" className="block mb-1">*/}
                    {/*        Last Name*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        id="lastName"*/}
                    {/*        type="text"*/}
                    {/*        className="w-full border border-gray-300 px-3 py-2 rounded"*/}
                    {/*        {...register('lastName')}*/}
                    {/*    />*/}
                    {/*    {errors.lastName && (*/}
                    {/*        <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="email" className="block mb-1">*/}
                    {/*        Email*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        id="email"*/}
                    {/*        type="email"*/}
                    {/*        className="w-full border border-gray-300 px-3 py-2 rounded"*/}
                    {/*        {...register('email')}*/}
                    {/*    />*/}
                    {/*    {errors.email && (*/}
                    {/*        <p className="text-red-500 text-sm">{errors.email.message as string}</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="phoneNumber" className="block mb-1">*/}
                    {/*        Phone Number*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        id="phoneNumber"*/}
                    {/*        type="text"*/}
                    {/*        className="w-full border border-gray-300 px-3 py-2 rounded"*/}
                    {/*        {...register('phoneNumber')}*/}
                    {/*    />*/}
                    {/*    {errors.phoneNumber && (*/}
                    {/*        <p className="text-red-500 text-sm">{errors.phoneNumber.message as string}</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <div className="mb-4">
                        <label htmlFor="bio" className="block mb-1">
                            Reason for attending
                        </label>
                        <textarea
                            id="reason"
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            {...register('reason')}
                        />
                        {errors.reason && (
                            <p className="text-red-500 text-sm">{errors.reason.message as string}</p>
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
                        Apply
                    </button>
                    <div
                        className={`speech-balloon \${showErrorMessage ? 'show-balloon' : ''}`}
                    >
                        Please fix the error before submitting
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyForConferencePage
