import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import ConferenceService, {AllUpcomingConferences} from "@/services/ConferenceService";
import ConferenceList from "@/components/ConferenceList";
import {GetStaticProps} from "next";

interface ConferencesPageProps {
    conferences: AllUpcomingConferences[]
}

const ConferencesPage = ({ conferences }: ConferencesPageProps) => {
    return (
        <div className="container mx-auto my-8 px-4">
            <h1 className="text-4xl mb-8">Upcoming Conferences</h1>
            <ConferenceList conferences={conferences} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const conferences = await ConferenceService.getAllUpcomingConference()

    return {
        props: {
            conferences,
        },
        revalidate: 60,
    }
}

export default ConferencesPage