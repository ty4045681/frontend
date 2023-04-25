import {ConferenceInfo} from "@/interfaces/DashboardTypes";
import React from "react";

interface ConferenceCardProps {
    conference: ConferenceInfo
}

const Card: React.FC<ConferenceCardProps> = ({ conference }) => {
    return (
        <div className={"bg-white rounded-lg shadow-lg p-4"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex items-center space-x-4"}>
                    <div className={"h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center"}>
                        <span className={"text-white font-bold text-2xl"}>{conference.title.charAt(0)}</span>
                    </div>
                    <div>
                        <div className={"text-xl font-bold text-gray-700"}>{conference.title}</div>
                        <div className={"text-gray-500"}>{conference.location}</div>
                    </div>
                </div>
                <div className={"flex items-center space-x-4"}>
                    <div className={"flex items-center space-x-2"}>
                        <span className={"text-gray-500"}>Start Date</span>
                        <span className={"text-gray-700 font-bold"}>{conference.startDate}</span>
                    </div>
                    <div className={"flex items-center space-x-2"}>
                        <span className={"text-gray-500"}>End Date</span>
                        <span className={"text-gray-700 font-bold"}>{conference.endDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card