import Head from 'next/head';
import Link from 'next/link';
import React from "react";
import { AuthenticationProps, getServerSideAuthProps } from "@/services/auth";
import { GetServerSideProps } from "next";
import ConferenceService, { AllConferencesByDateInfo } from "@/services/ConferenceService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [conferences, setConferences] = React.useState<AllConferencesByDateInfo[]>([]);

    React.useEffect(() => {
        const fetchConferences = async () => {
            const conferences = await ConferenceService.getAllUpcomingConference();
            setConferences(conferences);
        }
        fetchConferences();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Head>
                <title>Conference Management System</title>
                <meta name="description" content="A web-based conference management system" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <Navbar isAuthenticated={isAuthenticated} userData={userData} />

            {/* Hero section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center">
                    {isAuthenticated && userData && (
                        <p className="text-lg mb-10">
                            Hi, {userData.username}!
                        </p>
                    )}
                    <h1 className="text-5xl font-bold mb-6">Welcome to our Conference Management System</h1>
                    <p className="text-lg mb-10">
                        Discover, register, and manage your favorite conferences all in one place.
                    </p>
                    <Link href={isAuthenticated ? "/conference" : "/register"}>
                        <span className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Get Started
                        </span>
                    </Link>
                </div>
            </section>

            {/* Upcoming conferences section */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold mb-6">Upcoming Conferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {conferences.map((conference) => (
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
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const authenticatedProps = await getServerSideAuthProps(context).then((props) => {
        if ("props" in props) {
            return props.props
        } else {
            return props
        }
    })

    return {
        props: {
            ...authenticatedProps
        }
    }
}

export default Home