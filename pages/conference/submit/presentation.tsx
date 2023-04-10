import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {useRouter} from "next/router";
import {API_BASE_URL} from "@/config";
import Head from "next/head";

interface ConferenceFromServer {
    id: string[]
    title: string[]
}

interface Conference {
    id: string;
    title: string;
}

interface Paper {
    id: string;
    title: string;
    conferenceId: string;
}

interface PresentationSubmitProps extends AuthenticationProps {
    defaultConferenceId: string
}

const PresentationSubmit: React.FC<PresentationSubmitProps> = ( { isAuthenticated, userData, defaultConferenceId} ) => {
    const router = useRouter()

    const [conferences, setConferences] = React.useState<Conference[]>([])
    const [papers, setPapers] = React.useState<Paper[]>([])
    const [selectedConferenceId, setSelectedConferenceId] = React.useState<string | null>(defaultConferenceId)
    const [selectedPaperId, setSelectedPaperId] = React.useState<string | null>(null)
    const [title, setTitle] = React.useState<string>("")
    const [file, setFile] = React.useState<File | null>(null)
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const token = Cookies.get("jwt");

    if (!isAuthenticated) {
        router.replace("/login")
        return null
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const requestConferenceData = async () => {
            const response = await axios.get(`${API_BASE_URL}/conference`)
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            } else {
                // data will be an array of id and an array of title
                const data: ConferenceFromServer = response.data

                // Convert the array of id and array of title into an array of Conference
                const conferences: Conference[] = data.id.map((id: string, index: number) => {
                    return {
                        id,
                        title: data.title[index]
                    }
                })

                setConferences(conferences)
            }
        }
        requestConferenceData()
    }, [])

    useEffect(() => {
        const requestPaperData = async () => {
            const response = await axios.get(`${API_BASE_URL}/paper`, {params: {conferenceId: selectedConferenceId}})
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            } else {
                const data: Paper[] = response.data

                setPapers(data)
            }
        }
        requestPaperData()
    }, [selectedConferenceId])

    const handleConferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const conferenceId = event.target.value
        setSelectedConferenceId(conferenceId)
        setSelectedPaperId(null)
    }

    const handlePaperChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const paperId = event.target.value
        setSelectedPaperId(paperId)
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!selectedConferenceId || !selectedPaperId || !title || !file) {
            return
        }

        if (file.size > 10000000) {
            alert("File size exceeds the maximum allowed size of 10 MB")
            return
        }

        setFormStatus('submitting')
        const formData = new FormData()
        formData.append('conferenceId', selectedConferenceId)
        formData.append('paperId', selectedPaperId)
        formData.append('title', title)
        formData.append('file', file)

        try {
            const response = await axios.post(`${API_BASE_URL}/presentation/submission`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (response.status !== 201) {
                setFormStatus('error')
            } else {
                setFormStatus('success')
            }
        } catch (error) {
            setFormStatus('error')
        }
    }

    return (
        <>
            <Head>
                <title>Presentation Submission</title>
            </Head>

            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <h1 className="text-4xl font-bold mb-4">Presentation Submission</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1 className="text-4xl font-bold mb-4">Choose a conference to submit to</h1>
                                <label htmlFor="conference" className="font-semibold">Conference:</label>
                                <select
                                    id="conference"
                                    value={selectedConferenceId ?? ''}
                                    onChange={handleConferenceChange}
                                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                                >
                                    <option value="">Select...</option>
                                    {conferences.map((conference, index) => (
                                        <option key={index} value={conference.id} selected={selectedConferenceId === conference.id}>
                                            {conference.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-8">
                                <h1 className="text-4xl font-bold mb-4">Choose a paper to submit</h1>
                                <label htmlFor="paper" className="font-semibold">Paper:</label>
                                <select
                                    id="paper"
                                    value={selectedPaperId ?? ''}
                                    onChange={handlePaperChange}
                                    disabled={selectedConferenceId === null}
                                    className={`block w-full p-2 border mt-1 ${selectedConferenceId === null ? 'border-gray-200 bg-gray-100' : 'border-gray-300'} rounded`}
                                >
                                    <option value="">Select...</option>
                                    {papers.map((paper, index) => (
                                        <option key={index} value={paper.id}>
                                            {paper.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="font-semibold">Title</label>
                                    <input id="title" className="block w-full p-2 border border-gray-300 rounded mt-1" type="text" value={title} onChange={handleTitleChange} required />
                                </div>

                                <div>
                                    <label htmlFor="file-upload" className="font-semibold">Upload Presentation</label>
                                    <input id="file-upload" className="block w-full p-2 border border-gray-300 rounded mt-1" type="file" onChange={(e) => {
                                        if (e.target.files) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                           required
                                           accept=".pdf,.ppt"
                                           size={10485760} />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="submit" className="bg-gradient-to-r from-cyan-400 to-light-blue-500 text-white font-semibold px-6 py-2 rounded-md" disabled={formStatus === 'submitting'}>
                                    Submit
                                </button>
                                {formStatus === 'success' && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-4 rounded relative" role="alert">
                                        <strong className="font-bold">Success!</strong>
                                        <span className="block sm:inline"> Your submission has been received.</span>
                                    </div>
                                )}
                                {formStatus === 'error' && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                                        <strong className="font-bold">Error!</strong>
                                        <span className="block sm:inline"> There was a problem with your submission.</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const defaultConferenceId = context.query.defaultConferenceId || ""
    const authenticatedProps = await getServerSideAuthProps(context).then((props) => {
        if ("props" in props) {
            return props.props
        } else if ("redirect" in props) {
            return props
        } else if ("notFound" in props) {
            return props
        }
    })

    return {
        props: {
            ...authenticatedProps,
            defaultConferenceId,
        },
    }
}

export default PresentationSubmit