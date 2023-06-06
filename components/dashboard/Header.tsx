import UserType from "@/interfaces/UserType";
import React from "react";
import {AuthenticationProps} from "@/services/auth";
import Link from "next/link";
import Image from "next/image";
import SettingMenu from "@/components/SettingMenu";
import UserMenu from "@/components/UserMenu";
import useTranslation from "next-translate/useTranslation";

interface HeaderProps extends AuthenticationProps {
    userType: UserType
}

const Header: React.FC<HeaderProps> = ({ userType, isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('header')


    const renderTitle = () => {
        return (
                <div className={"flex items-center space-x-4 cursor-pointer"}>
                    <Link href={"/"}>
                        <Image src={"/favicon.ico"} alt={"ConfMan Logo"} className={"h-8 w-auto"} width={100} height={100} />
                    </Link>

                    <Link href={`/${userType}`}>
                        <span className={"text-white text-xl font-bold"}>{t('dashboard_title', { usertype: t(userType)})}</span>
                    </Link>
                </div>
        )
    }

    return (
        <nav className={"fixed top-0 w-full bg-blue-500 p-4"}>
            <div className={"container mx-auto"}>
                <div className={"flex justify-between items-center"}>
                    {renderTitle()}

                    <ul className={"flex items-center space-x-4"}>
                        <SettingMenu />

                        <UserMenu isAuthenticated={isAuthenticated} userData={userData} />
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header