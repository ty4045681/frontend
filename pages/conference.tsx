import { GetServerSideProps } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { useEffect, useState } from "react";
import { ConferenceInfo } from "@/interfaces/DashboardTypes";
import axios from "axios";
import ConferenceService, { AllConferencesByDateInfo } from "@/services/ConferenceService";

const ConferencesPage = ({ isAuthenticated, userData }: AuthenticationProps) => {
    const [upcomingConferences, setUpcomingConferences] = useState<AllConferencesByDateInfo[]>([])
    const [pastConferences, setPastConferences] = useState<AllConferencesByDateInfo[]>([])
    const [ongoingConferences, setOngoingConferences] = useState<AllConferencesByDateInfo[]>([])

    useEffect(() => {
        const fetchConferences = async () => {
            const [
                upcomingConferences,
                pastConferences,
                ongoingConferences
            ] = await Promise.all([
                ConferenceService.getAllUpcomingConference(),
                ConferenceService.getAllPastConference(),
                ConferenceService.getAllOngoingConference()
            ])

            setUpcomingConferences(upcomingConferences)
            setPastConferences(pastConferences)
            setOngoingConferences(ongoingConferences)
        }

        fetchConferences()
    }, [])

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <Navbar isAuthenticated={isAuthenticated} userData={userData} />

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold mb-6">Ongoing Conferences</h2>
                {ongoingConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">Currently, there are no ongoing conferences. Please check back later.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {ongoingConferences.map((conference) => (
                            <div
                                key={conference.id}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{conference.title}</h3>
                                    <p className="text-gray-600 mb-4">{conference.location}</p>
                                    <p className="text-gray-600 mb-4">From: {conference.startDate}</p>
                                    <p className="text-gray-600 mb-4">To: {conference.endDate}</p>
                                    <p className="text-gray-800">
                                        Focus: {conference.focus}
                                    </p>
                                    <p className="text-gray-800">
                                        Theme: {conference.theme}
                                    </p>
                                </div>
                                <Link href={`/conference/${conference.id}`}>
                                    <span className="cursor-pointer mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Learn More
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold mb-6">Upcoming Conferences</h2>
                {upcomingConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">Currently, there are no upcoming conferences. Please check back later.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {upcomingConferences.map((conference) => (
                            <div
                                key={conference.id}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{conference.title}</h3>
                                    <p className="text-gray-600 mb-4">{conference.location}</p>
                                    <p className="text-gray-600 mb-4">From: {conference.startDate}</p>
                                    <p className="text-gray-600 mb-4">To: {conference.endDate}</p>
                                    <p className="text-gray-800">
                                        Focus: {conference.focus}
                                    </p>
                                    <p className="text-gray-800">
                                        Theme: {conference.theme}
                                    </p>
                                </div>
                                <Link href={`/conference/${conference.id}`}>
                                    <span className="cursor-pointer mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Learn More
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold mb-6">Past Conferences</h2>
                {pastConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">Currently, there are no past conferences. Please check back later.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pastConferences.map((conference) => (
                            <div
                                key={conference.id}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{conference.title}</h3>
                                    <p className="text-gray-600 mb-4">{conference.location}</p>
                                    <p className="text-gray-600 mb-4">From: {conference.startDate}</p>
                                    <p className="text-gray-600 mb-4">To: {conference.endDate}</p>
                                    <p className="text-gray-800">
                                        Focus: {conference.focus}
                                    </p>
                                    <p className="text-gray-800">
                                        Theme: {conference.theme}
                                    </p>
                                </div>
                                <Link href={`/conference/${conference.id}`}>
                                    <span className="cursor-pointer mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Learn More
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            {/* Footer */}
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default ConferencesPage
