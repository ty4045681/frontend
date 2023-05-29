import {AuthenticationProps} from "@/services/auth";
import UserType from "@/interfaces/UserType";
import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

interface SidebarProps extends AuthenticationProps {
    userType: UserType
}

const Sidebar: React.FC<SidebarProps> = ({ userType, isAuthenticated }) => {
    const { t, lang } = useTranslation('sidebar')
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
                        {NavLink("/user/info", t('personal_info'))}
                        {NavLink("/user/conferences", t('conferences'))}
                        {NavLink("/user/papers", t('papers'))}
                    </>
                )
            case "organizer":
                return (
                    <>
                        {NavLink("/organizer/info", t('personal_info'))}
                        {NavLink("/organizer/conferences", t('conferences'))}
                        {NavLink("/organizer/papers", t('papers'))}
                        {NavLink("/organizer/attendees", t('attendees'))}
                        {NavLink("/organizer/judges", t('judges'))}
                    </>
                )
            case "admin":
                return (
                    <>
                        {NavLink("/admin/info", t('personal_info'))}
                        {NavLink("/admin/conferences", t('conferences'))}
                        {NavLink("/admin/papers", t('papers'))}
                        {NavLink("/admin/users", t('users'))}
                    </>
                )
            case "judge":
                return (
                    <>
                        {NavLink("/judge/info", t('personal_info'))}
                        {NavLink("/judge/papers", t('papers'))}
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
        <div className={"flex flex-col fixed min-w-[150px] h-screen bg-gray-800 mt-[72px]"}>
            <div className={"flex flex-col items-center justify-center"}>
                <div className={"text-white text-xl font-bold"}>
                    {t(userType)}
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