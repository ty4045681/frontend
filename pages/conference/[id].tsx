import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Conference {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    theme: string;
    focus: string;
    keynotesAndSpeakers: Record<string, string>;
    agenda: Record<string, string>;
    registrationInfo: string;
    accommodations: string[];
    startCallingDateForPapers: string;
    endCallingDateForPapers: string;
    startCallingDateForPresentations: string;
    endCallingDateForPresentations: string;
    guidelineForPaperSubmission: string;
    guidelineForPresentationSubmission: string;
    sponsors: string[];
    exhibitors: string[];
    phoneNumber: string;
}


function ConferenceDetails(): JSX.Element {
    const router = useRouter()
    const [conference, setConference] = useState<Conference>()
    const API_BASE_URL = "http://localhost:8081/api/conference"

    const requestConferenceData = async () => {
        const { id } = router.query
        const response = await axios.get(`${API_BASE_URL}/id=${id}`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        } else {
            setConference(response.data)
        }
    }

    useEffect(() => {
        if (router.query.id) {
            requestConferenceData()
        }
    }, [router.query.id])

    if (!conference) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>
                <h1>{conference.title}</h1>
                <p>Start Date: {conference.startDate}</p>
                <p>End Date: {conference.endDate}</p>
                <p>Location: {conference.location}</p>
                <p>Theme: {conference.theme}</p>
                <p>Focus: {conference.focus}</p>
                <p>Keynotes and Speakers: </p>
                <ul>
                    {Object.keys(conference.keynotesAndSpeakers).map((key, index) => (
                        <li key={index}>
                            {key}: {conference.keynotesAndSpeakers[key]}
                        </li>
                    ))}
                </ul>
                <p>Agenda: </p>
                <ul>
                    {Object.keys(conference.agenda).map((key, index) => (
                        <li key={index}>
                            {key}: {conference.agenda[key]}
                        </li>
                    ))}
                </ul>
                <p>Registration Info: {conference.registrationInfo}</p>
                <p>Accommodations: {conference.accommodations}</p>
                <p>Start Calling Date For Papers: {conference.startCallingDateForPapers}</p>
                <p>End Calling Date For Papers: {conference.endCallingDateForPapers}</p>
                <p>Start Calling Date For Presentations: {conference.startCallingDateForPresentations}</p>
                <p>End Calling Date For Presentations: {conference.endCallingDateForPresentations}</p>
                <p>Guideline For Paper Submission: {conference.guidelineForPaperSubmission}</p>
                <p>Guideline For Presentation Submission: {conference.guidelineForPresentationSubmission}</p>
                <p>Sponsors: {conference.sponsors}</p>
                <p>Exhibitors: {conference.exhibitors}</p>
                <p>Phone Number: {conference.phoneNumber}</p>
            </div>
            <div>
                <button type="button" onClick={() => router.push(`/conference/submit/paper?defaultConferenceId=${router.query.id}`)}>
                    Submit Paper
                </button>
                <button type={"button"} onClick={() => router.push(`/conference/download/paper?conferenceId=${router.query.id}`)}>
                    Download Paper
                </button>
                <button type="button" onClick={() => router.push(`/conference/submit/presentation?defaultConferenceId=${router.query.id}`)}>
                    Submit Presentation
                </button>
                <button type={"button"} onClick={() => router.push(`/conference/download/presentation?conferenceId=${router.query.id}`)}>
                    Download Presentation
                </button>
            </div>
        </div>
    )
}

export default ConferenceDetails
