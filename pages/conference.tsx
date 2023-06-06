import {GetServerSideProps} from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {useEffect, useState} from "react";
import ConferenceService, {AllConferencesByDateInfo} from "@/services/ConferenceService";
import useTranslation from 'next-translate/useTranslation';
import ConferenceCard from "@/components/ConferenceCard";

const ConferencesPage = ({ isAuthenticated, userData }: AuthenticationProps) => {
    const { t, lang } = useTranslation('conference');
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
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
            {/* Header */}
            <Navbar isAuthenticated={isAuthenticated} userData={userData} />

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-black dark:text-white text-4xl font-bold mb-6">{t('ongoing_conference')}</h2>
                {ongoingConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">{t('error', { time: t('ongoing')})}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {ongoingConferences.map((conference) => (
                            <ConferenceCard conference={conference} />
                        ))}
                    </div>
                )}
            </section>


            <section className="container mx-auto px-4 py-20">
                <h2 className="text-black dark:text-white text-4xl font-bold mb-6">{t('upcoming_conference')}</h2>
                {upcomingConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">{t('error', { time: t('upcoming') })}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {upcomingConferences.map((conference) => (
                            <ConferenceCard conference={conference} />
                        ))}
                    </div>
                )}
            </section>

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-black dark:text-white text-4xl font-bold mb-6">{t('past_conference')}</h2>
                {pastConferences.length === 0 ? (
                    <p className="text-xl text-gray-600">{t('error', { time: t('past') })}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pastConferences.map((conference) => (
                            <ConferenceCard conference={conference} />
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
