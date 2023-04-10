import React, {useEffect, useState} from "react";
import axios from "axios";
import {GetServerSideProps} from "next";
import {API_BASE_URL} from "@/config";

import DownloadTable, {PaperData} from "@/components/DownloadTable";


interface PaperDownloadProps {
    conferenceId: string
}

const PaperDownload: React.FC<PaperDownloadProps> = ( {conferenceId} ) => {
    const [papers, setPapers] = useState<PaperData[]>([])

    const API_URL = `${API_BASE_URL}/paper`

    useEffect(() => {
        const requestPaperData = async () => {
            const response = await axios.get(`${API_URL}`, {params: {conferenceId: conferenceId}})
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
        <>
            <h1>Papers</h1>
            <DownloadTable dataType="papers" papers={papers} />
        </>
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