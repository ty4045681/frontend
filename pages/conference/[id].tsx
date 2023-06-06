import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {Conference} from "@/interfaces/conference";
import Link from "next/link";
import ConferenceService from '@/services/ConferenceService';

function ConferenceDetails(): JSX.Element {
    const router = useRouter()
    const [conference, setConference] = useState<Conference>()

    const requestConferenceData = async () => {
        const { id } = router.query
        if (typeof id === 'string') {
            const response = await ConferenceService.getConferenceById(id);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            } else {
                setConference(response.data);
            }
        } else {
            console.error('Invalid conference ID');
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
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Conference Info</h1>
                </div>
            </header>

            {/* Main content */}
            <main>
                {/* Conference Details */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-4xl font-bold mb-6">{conference.title}</h2>
                    <h3 className="text-xl mb-2">Date: {ConferenceService.formatDate(conference.startDate)} - {ConferenceService.formatDate(conference.endDate)}</h3>
                    <h3 className="text-xl mb-6">Location: {conference.location}</h3>
                    <h3 className="text-xl mb-6">Theme: {conference.theme}</h3>
                    <h3 className="text-xl mb-6">Focus: {conference.focus}</h3>
                    <h3 className="text-xl mb-6">Phone: {conference.phoneNumber}</h3>
                </div>

                {/* Keynotes and Speakers */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Keynotes and Speakers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(conference.keynotesAndSpeakers).map(([key, value]) => (
                            <div key={key} className="bg-gray-100 p-4 rounded shadow">
                                <h4 className="text-lg font-semibold mb-2">{key}</h4>
                                <p className="text-gray-700">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agenda */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Agenda</h2>
                    <div className="space-y-6">
                        {Object.entries(conference.agenda).map(([key, value]) => (
                            <div key={key} className="border-b border-gray-300 pb-4">
                                <h3 className="text-xl font-bold mb-2">{ConferenceService.formatDate(key)}</h3>
                                <p className="text-gray-700">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accommodations */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Accommodations</h2>
                    <ul className="list-disc list-inside">
                        {conference.accommodations.map((accommodation, index) => (
                            <li key={index} className="text-gray-700 mb-2">
                                {accommodation}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sponsors and Exhibitors */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Sponsors and Exhibitors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sponsors */}
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-xl font-bold mb-4">Sponsors</h3>
                            <ul className="list-disc list-inside">
                                {conference.sponsors.map((sponsor, index) => (
                                    <li key={index} className="text-gray-700 mb-2">
                                        {sponsor}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Exhibitors */}
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-xl font-bold mb-4">Exhibitors</h3>
                            <ul className="list-disc list-inside">
                                {conference.exhibitors.map((exhibitor, index) => (
                                    <li key={index} className="text-gray-700 mb-2">
                                        {exhibitor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Registration */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Registration</h2>
                    <p className="text-gray-700 mb-4">{conference.registrationInfo}</p>
                    <Link href="/conference/submit/applyForConf">
                        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500">
                            Register Now
                        </button>
                    </Link>
                </div>

                {/* Submission Deadlines */}
                <div className="bg-white p-8 rounded-md shadow-md mt-6 mx-auto max-w-7xl">
                    <h2 className="text-3xl font-bold mb-6">Submission Deadlines</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-xl font-bold mb-4">Paper Submission</h3>
                            <p className="text-gray-700">
                                {ConferenceService.formatDate(conference.startCallingDateForPapers)} - {ConferenceService.formatDate(conference.endCallingDateForPapers)}
                            </p>
                            <p className="text-gray-700 mt-4">{conference.guidelineForPaperSubmission}</p>
                        </div>
                        {/*<div className="bg-gray-100 p-4 rounded shadow">*/}
                        {/*    <h3 className="text-xl font-bold mb-4">Presentation Submission</h3>*/}
                        {/*    <p className="text-gray-700">*/}
                        {/*        {conference.startCallingDateForPresentations} - {conference.endCallingDateForPresentations}*/}
                        {/*    </p>*/}
                        {/*    <p className="text-gray-700 mt-4">{conference.guidelineForPresentationSubmission}</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 py-2 px-10">
                    <button
                        type="button"
                        onClick={() =>
                            router.push(`/conference/submit/paper?defaultConferenceId=${router.query.id}`)
                        }
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400"
                    >
                        Submit Paper
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            router.push(`/conference/download/paper?conferenceId=${router.query.id}`)
                        }
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400"
                    >
                        Download Paper
                    </button>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() =>*/}
                    {/*        router.push(`/conference/submit/presentation?defaultConferenceId=${router.query.id}`)*/}
                    {/*    }*/}
                    {/*    className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-400"*/}
                    {/*>*/}
                    {/*    Submit Presentation*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() =>*/}
                    {/*        router.push(`/conference/download/presentation?conferenceId=${router.query.id}`)*/}
                    {/*    }*/}
                    {/*    className="bg-purple-400 text-white font-bold py-2 px-4 rounded hover:bg-purple-300"*/}
                    {/*>*/}
                    {/*    Download Presentation*/}
                    {/*</button>*/}
                </div>
            </main>

            <div className="grid grid-cols-2 gap-4 mt-8 py-2 px-10">
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={() =>*/}
                {/*        router.push(`/conference/submit/paper?defaultConferenceId=${router.query.id}`)*/}
                {/*    }*/}
                {/*    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400"*/}
                {/*>*/}
                {/*    Submit Paper*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={() =>*/}
                {/*        router.push(`/conference/download/paper?conferenceId=${router.query.id}`)*/}
                {/*    }*/}
                {/*    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400"*/}
                {/*>*/}
                {/*    Download Paper*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={() =>*/}
                {/*        router.push(`/conference/submit/presentation?defaultConferenceId=${router.query.id}`)*/}
                {/*    }*/}
                {/*    className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-400"*/}
                {/*>*/}
                {/*    Submit Presentation*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={() =>*/}
                {/*        router.push(`/conference/download/presentation?conferenceId=${router.query.id}`)*/}
                {/*    }*/}
                {/*    className="bg-purple-400 text-white font-bold py-2 px-4 rounded hover:bg-purple-300"*/}
                {/*>*/}
                {/*    Download Presentation*/}
                {/*</button>*/}
            </div>
        </div>
    )
}

export default ConferenceDetails
