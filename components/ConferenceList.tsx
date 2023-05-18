import {AllConferencesByDateInfo} from "@/services/ConferenceService";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

interface ConferenceListProps {
    conferences: AllConferencesByDateInfo[]
}

const ConferenceList = ({ conferences }: ConferenceListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conferences.map((conference) => (
                <Card key={conference.id} className="shadow-md">
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {conference.title}
                        </Typography>
                        <Typography color="text.secondary">
                            {conference.startDate} - {conference.endDate}
                        </Typography>
                        <Typography color="text.secondary">
                            {conference.focus}
                        </Typography>
                        <Typography color="text.secondary">
                            {conference.theme}
                        </Typography>
                        <Typography color="text.secondary">
                            {conference.location}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={`/conference/${conference.id}`} target="_blank" rel="noopener">
                            See More
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default ConferenceList;