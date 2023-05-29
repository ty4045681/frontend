import React from "react";
import {AuthenticationProps} from "@/services/auth";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "next-themes";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {HiOutlineChevronDown, HiOutlineLogout, HiOutlineUser} from "react-icons/hi";

const UserMenu: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const { t, lang } = useTranslation('user_menu')
    const { theme, setTheme } = useTheme()

    return (
        <>
            {isAuthenticated && userData ? (
                <>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className={
                            "text-white hover:bg-violet5 hover:text-mauve12 focus:shadow-violet7 group flex justify-between items-center gap-1 rounded-[4px] px-3 py-2"
                        }>
                            {userData.username}{' '}
                            <HiOutlineChevronDown
                                className={"text-white relative transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"}
                                aria-hidden={true}
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[120px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                sideOffset={5}
                            >
                                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                                    <Link href={`/${userData.role}`} className={"flex justify-between"}>
                                        <HiOutlineUser className={"mr-2"} />
                                        {t('profile')}{' '}
                                        <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">

                                        </div>
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                                    <Link href={"/logout"} className={"flex justify-between"}>
                                        <HiOutlineLogout className={"mr-2"} />
                                        {t('logout')}{' '}
                                        <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">

                                        </div>
                                    </Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </>
            ) : (
                <>
                    <li>
                        <Link href={"/register"}>
                            <div className={"bg-white text-blue-500 px-4 py-2 rounded cursor-pointer"}>
                                {t('signup')}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/login"}>
                            <div className={"text-white cursor-pointer"}>
                                {t('login')}
                            </div>
                        </Link>
                    </li>
                </>
            )}
        </>
    )
}

export default UserMenu