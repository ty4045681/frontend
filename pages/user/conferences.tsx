import {ConferenceCardInfo} from "@/interfaces/DashboardTypes";
import Card from "@/components/dashboard/Card";

const conferences: ConferenceCardInfo[] = [
    {
        title: "Conference 1",
        location: "Location 1",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
    {
        title: "Conference 2",
        location: "Location 2",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
    {
        title: "Conference 3",
        location: "Location 3",
        startDate: "2021-01-01",
        endDate: "2021-01-02"
    },
]

const ConferencesPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conferences.map((conference, index) => (
                <Card key={index} conference={conference} />
            ))}
        </div>
    )
}

export default ConferencesPage