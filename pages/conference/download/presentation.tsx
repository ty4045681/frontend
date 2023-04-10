import {GetServerSideProps} from "next";
import React, {useEffect, useState} from "react";
import axios from "axios";
import DownloadTable, {PresentationData} from "@/components/DownloadTable";
import {API_BASE_URL} from "@/config";

interface PresentationDownloadProps {
    conferenceId: string
}

const PresentationDownload: React.FC<PresentationDownloadProps> = ( {conferenceId } ) => {
    const [presentations, setPresentations] = useState<PresentationData[]>([])

    const API_URL = `${API_BASE_URL}/presentation`

    useEffect(() => {
        const requestPresentationData = async () => {
            const response = await axios.get(`${API_URL}`, {params: {conferenceId: conferenceId}})
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
            <h1>Presentation Download</h1>
            <DownloadTable presentations={presentations} dataType="presentations" />
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