import {GetServerSideProps} from "next";
import exp from "constants";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface Presentation {
    id: string
    conferenceId: string
    paperId: string
    title: string
}

interface PresentationDownloadProps {
    conferenceId: string
}

const PresentationDownload: React.FC<PresentationDownloadProps> = ( {conferenceId } ) => {
    const [presentations, setPresentations] = useState<Presentation[]>([])

    const API_BASE_URL = "http://localhost:8081/api/presentation"

    useEffect(() => {
        const requestPresentationData = async () => {
            const response = await axios.get(`${API_BASE_URL}`, {params: {conferenceId: conferenceId}})
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }
            return response
        }
        requestPresentationData().then(response => {
            setPresentations(response.data)
        });
    }, [])

    return (
        <div>
            <h1>Presentations</h1>
            <ul>
                {presentations.map((presentation) => (
                    <li key={presentation.id}>
                        {presentation.title}{" "}
                        <a href={`${API_BASE_URL}/${presentation.id}/download`} download>
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const conferenceId = context.query.conferenceId || ""

    return {
        props: {
            conferenceId
        }
    }
}

export default PresentationDownload