import React from "react";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";

interface OrganizerProfileSideBarProps {
    setSelectedPage: (page: number) => void
}

const OrganizerProfileSideBar: React.FC<OrganizerProfileSideBarProps> = ({ setSelectedPage }) => {
    return (
        <div className="bg-gray-800 w-1/4 p-8">
            <h1 className="text-white text-3xl mb-8">User Dashboard</h1>
            <nav>
                <ul>
                    {['Organizer Information', 'Conference', 'Papers'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => setSelectedPage(index)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default OrganizerProfileSideBar