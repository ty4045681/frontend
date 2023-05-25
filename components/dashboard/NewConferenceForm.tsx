import React from 'react';
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"


const schema = yup.object(
    {
        title: yup
            .string()
            .required("Title is required"),
        location: yup
            .string()
            .required("Location is required"),
        startDate: yup
            .date()
            .required("Start Date is required"),
        endDate: yup
            .date()
            .required("End Date is required")
            .min(yup.ref('startDate'), "End Date should be later than Start Date")
        // ... Add more fields as needed
    }
).required()

type FormValues = yup.InferType<typeof schema>

const NewConferenceForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    })

    const onSubmit = async (data: FormValues) => {
        try {
            // const response = await Organ.createConference(data)  // assuming that your service has a `createConference` method
            console.log('Create conference succeeded', data)
            // Add code here to redirect or update the UI
        } catch (e) {
            console.log('Create conference failed', e)
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 my-4">
            <div className="bg-white p-8 rounded shadow-md w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    New Conference
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="sr-only">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            placeholder="Title"
                            {...register('title')}
                        />
                        {errors.title && (
                            <p className={"text-red-500 text-sm"}>{errors.title.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="sr-only">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            placeholder="Location"
                            {...register('location')}
                        />
                        {errors.location && (
                            <p className={"text-red-500 text-sm"}>{errors.location.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="sr-only">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            {...register('startDate')}
                        />
                        {errors.startDate && (
                            <p className={"text-red-500 text-sm"}>{errors.startDate.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="sr-only">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            {...register('endDate')}
                        />
                        {errors.endDate && (
                            <p className={"text-red-500 text-sm"}>{errors.endDate.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={!isValid || isSubmitting}
                    >
                        Create Conference
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewConferenceForm;
