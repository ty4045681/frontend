import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {API_BASE_URL} from "@/config";
import Head from "next/head";
import {ConferenceInfo} from "@/interfaces/DashboardTypes";

interface Conference {
    // List of conference ids
    id: string[]
    // List of conference titles
    title: string[]
}

interface PaperSubmitProps extends AuthenticationProps{
    defaultConferenceId: string
}

const PaperSubmit = ( { isAuthenticated, userData, defaultConferenceId}: PaperSubmitProps ) => {
    const router = useRouter()

    const [conferenceId, setConferenceId] = useState<string>(defaultConferenceId);
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([""]);
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState([""]);
    const [file, setFile] = useState<File | null>();
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const [conference, setConference] = useState<ConferenceInfo[]>()

    const token = Cookies.get("jwt");

    if (!isAuthenticated) {
        router.replace("/login")
        return null
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setConferenceId(event.target.value);
    }

    const handleAuthorChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAuthors = [...authors];
        newAuthors[index] = event.target.value;
        setAuthors(newAuthors);
    }

    const handleKeywordChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newKeywords = [...keywords];
        newKeywords[index] = event.target.value;
        setKeywords(newKeywords);
    }

    const addAuthor = () => setAuthors([...authors, '']);
    const removeAuthor = (index: number) => setAuthors(authors.filter((_, i) => i !== index));

    const addKeyword = () => setKeywords([...keywords, '']);
    const removeKeyword = (index: number) => setKeywords(keywords.filter((_, i) => i !== index));

    const requestConferenceData = async () => {
        const response = await axios.get(`${API_BASE_URL}/conference`, {
            headers: {
                "Upcoming": "true"
            }
        })
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        } else {
            setConference(response.data)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        // Check if the file size exceeds the maximum allowed size
        if (file.size > 10000000) { // 10 MB in bytes
            alert("File size exceeds the maximum allowed size of 10 MB")
            return;
        }

        setFormStatus('submitting')
        const formData = new FormData();
        formData.append("conferenceId", conferenceId);
        formData.append("title", title);
        formData.append("authors", authors.map((author) => author.trim()).join(","));
        formData.append("abstract", abstract);
        formData.append("keywords", keywords.map((keyword) => keyword.trim()).join(","));
        formData.append("file", file);

        try {
            const response = await axios.post(`${API_BASE_URL}/paper/submission`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.status !== 201) {
                setFormStatus('error')
            } else {
                setFormStatus('success')
            }
        } catch (error) {
            console.error(error);
            setFormStatus('error')
        }
    }

    useEffect(() => {
        requestConferenceData()
    }, [])

    return (
        <>
            <Head>
                <title>Paper Submission</title>
            </Head>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <h1 className="text-4xl font-bold mb-4">Paper Submission</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <h1 className="text-4xl font-bold mb-4">Choose a conference to submit to</h1>
                            <select
                                value={conferenceId}
                                onChange={handleSelectChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select...</option>
                                {conference?.map((conference, index) => (
                                    <option key={index} value={conference.id} selected={conferenceId === conference.id}>
                                        {conference.title}
                                    </option>
                                ))}
                            </select>
                            {conferenceId && (
                                <p className="mt-4 text-lg">
                                    You selected:{" "}
                                    {conference?.map((conference, index) => {
                                        if (conference.id === conferenceId) {
                                            return conference.title;
                                        }
                                    })}
                                </p>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="font-semibold">Title</label>
                                    <input id="title" className="block w-full p-2 border border-gray-300 rounded mt-1" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="abstract" className="font-semibold">Abstract</label>
                                    <textarea id="abstract" className="block w-full p-2 border border-gray-300 rounded mt-1" rows={5} value={abstract} onChange={(e) => setAbstract(e.target.value)} required ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="authors" className="font-semibold">Authors</label>
                                    {authors.map((author, index) => (
                                        <div key={`author-${index}`} className="flex items-center mt-1">
                                            <input
                                                id={`author-${index}`}
                                                className="block flex-grow p-2 border border-gray-300 rounded"
                                                type="text"
                                                value={author}
                                                onChange={(event) => handleAuthorChange(index, event)}
                                            />
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white ml-2 px-2 py-1 rounded"
                                                onClick={() => removeAuthor(index)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white mt-2 px-2 py-1 rounded"
                                        onClick={addAuthor}
                                    >
                                        Add Author
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="keywords" className="font-semibold">Keywords</label>
                                    {keywords.map((keyword, index) => (
                                        <div key={`keyword-${index}`} className="flex items-center mt-1">
                                            <input
                                                id={`keyword-${index}`}
                                                className="block flex-grow p-2 border border-gray-300 rounded"
                                                type="text"
                                                value={keyword}
                                                onChange={(event) => handleKeywordChange(index, event)}
                                            />
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white ml-2 px-2 py-1 rounded"
                                                onClick={() => removeKeyword(index)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white mt-2 px-2 py-1 rounded"
                                        onClick={addKeyword}
                                    >
                                        Add Keyword
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="file-upload" className="font-semibold">Upload Paper</label>
                                    <input id="file-upload" className="block w-full p-2 border border-gray-300 rounded mt-1" type="file" onChange={(e) => {
                                        if (e.target.files) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                           required
                                           accept=".pdf,.doc,.docx,.odt,.txt"
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
    );
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
            defaultConferenceId
        }
    }
}

export default PaperSubmit;