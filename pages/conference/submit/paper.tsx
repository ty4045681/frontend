import React, {useEffect, useState} from "react";
import axios from "axios";
import withAuth from "@/hoc/withAuth";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";

interface Conference {
    // List of conference ids
    id: string[]
    // List of conference titles
    title: string[]
}

interface PaperSubmitProps {
    defaultConferenceId: string;
}

const PaperSubmit: React.FC<PaperSubmitProps> = ( {defaultConferenceId} ) => {
    const [conferenceId, setConferenceId] = useState<string>(defaultConferenceId);
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string>("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState<string>("");
    const [file, setFile] = useState<File | null>();
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const [conference, setConference] = useState<Conference>()

    const API_BASE_URL = "http://localhost:8081/api"
    const token = Cookies.get("jwt");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setConferenceId(event.target.value);
    }
    const requestConferenceData = async () => {
        const response = await axios.get(`${API_BASE_URL}/conference`)
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
        formData.append("authors", authors);
        formData.append("abstract", abstract);
        formData.append("keywords", keywords);
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
        // Choose a conference to submit to
        <div>
            <h1>Choose a conference to submit to</h1>
            <select value={conferenceId} onChange={handleSelectChange}>
                <option value={""}>Select...</option>
                {conference?.id.map((id, index) => (
                    <option key={index} value={id} selected={conferenceId === id}>
                        {conference.title[index]}
                    </option>
                ))}
            </select>
            {conferenceId && <p>You selected: {conference?.id.map((id, index) => {
                if (id === conferenceId) {
                    return conference.title[index];
                }
            })}</p>}
            <h1>Submit a paper</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Author:
                    <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
                </label>
                <label>
                    Abstract:
                    <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required />
                </label>
                <label>
                    Keywords:
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
                </label>
                <label>
                    Paper File:
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }}
                        required
                        // file max size is 10MB
                        accept=".pdf,.doc,.docx,.odt,.txt"
                        size={10485760}
                    />
                </label>
                <button type="submit" disabled={formStatus === 'submitting'}>Submit</button>
                {formStatus === 'success' && <p>Success!</p>}
                {formStatus === 'error' && <p>Error!</p>}
            </form>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const defaultConferenceId = context.query.defaultConferenceId || ""

    return {
        props: {
            defaultConferenceId
        }
    }
}

export default withAuth(PaperSubmit);