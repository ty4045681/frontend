import React, {useEffect, useState} from "react";
import axios from "axios";
import {GetServerSideProps} from "next";

interface Paper {
    id: string
    conferenceId: string
    title: string
    authors: string[]
    abstract: string
    keywords: string[]
}

interface PaperDownloadProps {
    conferenceId: string
}

const PaperDownload: React.FC<PaperDownloadProps> = ( {conferenceId} ) => {
    const [papers, setPapers] = useState<Paper[]>([])

    const API_BASE_URL = "http://localhost:8081/api/paper"

    useEffect(() => {
        const requestPaperData = async () => {
            const response = await axios.get(`${API_BASE_URL}`, {params: {conferenceId: conferenceId}})
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }
            return response
        }
        requestPaperData().then(response => {
            setPapers(response.data)
        });
    }, [])

    return (
        <div>
            <h1>Papers</h1>
            <ul>
                {papers.map((paper) => (
                    <li key={paper.id}>
                        {paper.title}{" "}
                        <a href={`${API_BASE_URL}/${paper.id}/download`} download>
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

export default PaperDownload;