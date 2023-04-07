import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import withAuth from "@/hoc/withAuth";

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

interface PresentationSubmitProps {
    defaultConferenceId: string
}

const PresentationSubmit: React.FC<PresentationSubmitProps> = ( {defaultConferenceId} ) => {
    const [conferences, setConferences] = React.useState<Conference[]>([])
    const [papers, setPapers] = React.useState<Paper[]>([])
    const [selectedConferenceId, setSelectedConferenceId] = React.useState<string | null>(defaultConferenceId)
    const [selectedPaperId, setSelectedPaperId] = React.useState<string | null>(null)
    const [title, setTitle] = React.useState<string>("")
    const [file, setFile] = React.useState<File | null>(null)
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const API_BASE_URL = "http://localhost:8081/api"
    const token = Cookies.get("jwt");

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
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Choose a conference to submit to</h1>
                <label htmlFor={"conference"}>Conference:</label>
                <select id={"conference"} value={selectedConferenceId ?? ''} onChange={handleConferenceChange}>
                    <option value={""}>Select...</option>
                    {conferences.map((conference, index) => (
                        <option key={index} value={conference.id} selected={selectedConferenceId === conference.id}>
                            {conference.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h1>Choose a paper to submit</h1>
                <label htmlFor={"paper"}>Paper:</label>
                <select id={"paper"} value={selectedPaperId ?? ''} onChange={handlePaperChange} disabled={selectedConferenceId === null}>
                    <option value={""}>Select...</option>
                    {papers.map((paper, index) => (
                        <option key={index} value={paper.id}>
                            {paper.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h1>Enter the title of your presentation</h1>
                <label htmlFor={"title"}>Title:</label>
                <input id={"title"} type={"text"} value={title} onChange={handleTitleChange} />
            </div>
            <div>
                <h1>Upload your presentation</h1>
                <label htmlFor={"file"}>File:</label>
                <input id={"file"} type={"file"} accept={".pdf,.ppt"} onChange={handleFileChange} />
            </div>
            <div>
                <button type={"submit"} disabled={formStatus === 'submitting'}>Submit</button>
            </div>
            {formStatus === 'success' && <div>Submission successful</div>}
            {formStatus === 'error' && <div>Submission failed</div>}
        </form>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const defaultConferenceId = context.query.defaultConferenceId || ""

    return {
        props: {
            defaultConferenceId
        }
    }
}

export default withAuth(PresentationSubmit)