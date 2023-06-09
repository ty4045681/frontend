import Head from 'next/head';
import Link from 'next/link';
import React from "react";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import ConferenceService, {AllConferencesByDateInfo} from "@/services/ConferenceService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useTranslation from 'next-translate/useTranslation';
import ConferenceCard from "@/components/ConferenceCard";

const Home: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('common');

    const [conferences, setConferences] = React.useState<AllConferencesByDateInfo[]>([]);

    React.useEffect(() => {
        const fetchConferences = async () => {
            const conferences = await ConferenceService.getAllUpcomingConference();
            setConferences(conferences);
        }
        fetchConferences();
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
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
                            {t('personalized_message', { name: userData.username })}
                        </p>
                    )}
                    <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">{t('welcome_message')}</h1>
                    <p className="text-lg mb-10 text-black dark:text-gray-300">
                        {t('message')}
                    </p>
                    <Link href={isAuthenticated ? "/conference" : "/register"}>
                        <span className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {t('get_started_button')}
                        </span>
                    </Link>
                </div>
            </section>

            {/* Upcoming conferences section */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-black dark:text-white text-4xl font-bold mb-6">{t('upcoming_conferences')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {conferences.map((conference) => (
                        <ConferenceCard conference={conference} />
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