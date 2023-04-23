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

        switch (userType) {
            case "user":
                return (
                    <>
                        <li>
                            <Link href={"/user/info"}>
                                <div className={"text-white cursor-pointer"}>
                                    Personal Information
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/user/conferences"}>
                                <div className={"text-white cursor-pointer"}>
                                    Conferences
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/user/papers"}>
                                <div className={"text-white cursor-pointer"}>
                                    Papers
                                </div>
                            </Link>
                        </li>
                    </>
                )
            case "organizer":
                return (
                    <>
                        <li>
                            <Link href={"/organizer/info"}>
                                <div className={"text-white cursor-pointer"}>
                                    Personal Information
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/organizer/conferences"}>
                                <div className={"text-white cursor-pointer"}>
                                    Conferences
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/organizer/papers"}>
                                <div className={"text-white cursor-pointer"}>
                                    Papers
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/organizer/attendees"}>
                                <div className={"text-white cursor-pointer"}>
                                    Attendees
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/organizer/judges"}>
                                <div className={"text-white cursor-pointer"}>
                                    Judges
                                </div>
                            </Link>
                        </li>
                    </>
                )
            case "admin":
                return (
                    <>
                        <li>
                            <Link href={"/admin/info"}>
                                <div className={"text-white cursor-pointer"}>
                                    Personal Information
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/conferences"}>
                                <div className={"text-white cursor-pointer"}>
                                    Conferences
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/papers"}>
                                <div className={"text-white cursor-pointer"}>
                                    Papers
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/users"}>
                                <div className={"text-white cursor-pointer"}>
                                    Users
                                </div>
                            </Link>
                        </li>
                    </>
                )
            case "judge":
                return (
                    <>
                        <li>
                            <Link href={"/judge/info"}>
                                <div className={"text-white cursor-pointer"}>
                                    Personal Information
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/judge/papers"}>
                                <div className={"text-white cursor-pointer"}>
                                    Papers
                                </div>
                            </Link>
                        </li>
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
        <div className={"flex flex-col w-1/6 h-screen bg-gray-800"}>
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