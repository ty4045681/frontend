import Link from "next/link";
import {AuthenticationProps} from "@/services/auth";
import React from "react";
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation';
import SettingMenu from "@/components/SettingMenu";
import UserMenu from "@/components/UserMenu";


const ConferenceNavbar: React.FC<AuthenticationProps> = ({
    isAuthenticated,
    userData,
}) => {
    const { t, lang } = useTranslation('navbar')
    return (
        <nav className={"bg-blue-500 p-4"}>
            <div className={"container mx-auto"}>
                <div className={"flex justify-between items-center"}>
                    <Link href={"/"}>
                        <div className={"flex items-center space-x-4 cursor-pointer"}>
                            <Image
                                src={"/favicon.ico"}
                                alt={"ConfMan Logo"}
                                className={"h-8 w-auto"}
                                width={100}
                                height={100}
                            />
                            <span className={"text-white text-xl font-bold"}>{t('title')}</span>
                        </div>
                    </Link>
                    <ul className={"flex items-center space-x-4"}>
                        <SettingMenu />
                        
                        <UserMenu isAuthenticated={isAuthenticated} userData={userData} />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ConferenceNavbar;
