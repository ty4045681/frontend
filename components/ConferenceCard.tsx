import Link from "next/link"
import useTranslation from 'next-translate/useTranslation'
import {AllConferencesByDateInfo} from "@/services/ConferenceService";

type ConferenceCardProps = {
    conference: AllConferencesByDateInfo
}

const ConferenceCard = ({ conference }: ConferenceCardProps) => {
    const { t, lang } = useTranslation('common')

    return (
        <div
            key={conference.id}
            className="bg-white dark:bg-slate-600 rounded-lg shadow-md p-6 flex flex-col justify-between"
        >
            <div>
                <h3 className="text-2xl font-bold mb-2">{conference.title}</h3>
                <p className="text-gray-600 mb-4">{conference.location}</p>
                <p className="text-gray-600 mb-4">{t('time_from')}: {conference.startDate}</p>
                <p className="text-gray-600 mb-4">{t('time_to')}: {conference.endDate}</p>
                <p className="text-gray-800">
                    {t('focus')}: {conference.focus}
                </p>
                <p className="text-gray-800">
                    {t('theme')}: {conference.theme}
                </p>
            </div>
            <Link href={`/conference/${conference.id}`}>
                <span className="cursor-pointer mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('learn_more_button')}
                </span>
            </Link>
        </div>
    )
}

export default ConferenceCard