import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

interface Conference {
    // List of conference ids
    id: string[]
    // List of conference titles
    title: string[]
}

function ConferencePage(): JSX.Element {
    const [conference, setConference] = useState<Conference>()
    const API_BASE_URL = "http://localhost:8081/api/conference"

    const requestConferenceData = async () => {
        const response = await axios.get(`${API_BASE_URL}`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        } else {
            setConference(response.data)
        }
    }

    useEffect(() => {
        requestConferenceData()
    }, [])

    if (!conference) {
        return <div>Loading...</div>
    }

    return (
        // Show a list of conference
        <div>
            <h1>Conference Page</h1>
            <ul>
                {conference.id.map((id, index) => (
                    <li key={index}>
                        <Link href={`/conference/${id}`}>
                            {conference.title[index]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ConferencePage