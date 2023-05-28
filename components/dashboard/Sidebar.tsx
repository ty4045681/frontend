import {AuthenticationProps} from "@/services/auth";
import {UserType} from "@/interfaces/UserType";
import React from "react";
import Link from "next/link";

interface SidebarProps extends AuthenticationProps {
    userType: UserType
}

const Sidebar: React.FC<SidebarProps> = ({ userType, isAuthenticated }) => {
    const renderNavLinks = () => {
        if (!isAuthenticated) {
            return (
                <>
                </>
            )
        }

        const NavLink = (link: string, content: string) => {
            return (
                <li className={"min-w-[130px] cursor-pointer hover:bg-sky-700 rounded-2xl px-4 py-2"}>
                    <Link href={link}>
                        <div className={"text-white"}>
                            {content}
                        </div>
                    </Link>
                </li>
            )
        }

        switch (userType) {
            case "user":
                return (
                    <>
                        {NavLink("/user/info", "Personal Info")}
                        {NavLink("/user/conferences", "Conferences")}
                        {NavLink("/user/papers", "Papers")}
                    </>
                )
            case "organizer":
                return (
                    <>
                        {NavLink("/organizer/info", "Personal Info")}
                        {NavLink("/organizer/conferences", "Conferences")}
                        {NavLink("/organizer/papers", "Papers")}
                        {NavLink("/organizer/attendees", "Attendees")}
                        {NavLink("/organizer/judges", "Judges")}
                    </>
                )
            case "admin":
                return (
                    <>
                        {NavLink("/admin/info", "Personal Info")}
                        {NavLink("/admin/conferences", "Conferences")}
                        {NavLink("/admin/papers", "Papers")}
                        {NavLink("/admin/users", "Users")}
                    </>
                )
            case "judge":
                return (
                    <>
                        {NavLink("/judge/info", "Personal Info")}
                        {NavLink("/judge/papers", "Papers")}
                    </>
                )
            default:
                return (
                    <>
                    </>
                )
        }
    }

    return (
        <div className={"flex flex-col fixed min-w-[150px] h-screen bg-gray-800 mt-16"}>
            <div className={"flex flex-col items-center justify-center"}>
                <div className={"text-white text-xl font-bold"}>
                    {userType}
                </div>
            </div>
            <div className={"flex flex-col items-center justify-center mt-10"}>
                <ul className={"flex flex-col items-center justify-center"}>
                    {renderNavLinks()}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar