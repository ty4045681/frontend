import Link from "next/link";
import { AuthenticationProps } from "@/services/auth";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    HiAdjustments,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineLogout,
    HiOutlineUser,
} from "react-icons/hi";
import { FaRegMoon, FaSun } from "react-icons/fa";
import {RiEmphasisCn, RiEnglishInput} from "react-icons/ri"
import { BsDot } from "react-icons/bs"
import { useTheme } from "next-themes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage'
import { useRouter } from "next/router";


const ConferenceNavbar: React.FC<AuthenticationProps> = ({
    isAuthenticated,
    userData,
}) => {
    const router = useRouter()
    const { t, lang } = useTranslation('navbar')
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const langDropdownRef = useRef<HTMLLIElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLanguageChange = async (lang: string) => {
        await setLanguage(lang)
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                dropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
            if (
                langDropdownOpen &&
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target)
            ) {
                setLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen, langDropdownOpen]);

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
                            <span className={"text-white text-xl font-bold"}>ConfMan</span>
                        </div>
                    </Link>
                    <ul className={"flex items-center space-x-4"}>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                                    aria-label="Customise options"
                                >
                                    <HiAdjustments />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                    sideOffset={5}
                                >
                                    <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                                        Dark Mode
                                    </DropdownMenu.Label>
                                    <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                                        <DropdownMenu.RadioItem
                                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                            value="system"
                                        >
                                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <BsDot />
                                            </DropdownMenu.ItemIndicator>
                                            System
                                        </DropdownMenu.RadioItem>
                                        <DropdownMenu.RadioItem
                                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                            value="light"
                                        >
                                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <FaSun />
                                            </DropdownMenu.ItemIndicator>
                                            Light
                                        </DropdownMenu.RadioItem>
                                        <DropdownMenu.RadioItem
                                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                            value="dark"
                                        >
                                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <FaRegMoon />
                                            </DropdownMenu.ItemIndicator>
                                            Dark
                                        </DropdownMenu.RadioItem>
                                    </DropdownMenu.RadioGroup>
                                    <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />
                                    <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                                        Language
                                    </DropdownMenu.Label>
                                    <DropdownMenu.RadioGroup value={lang} onValueChange={handleLanguageChange}>
                                        <DropdownMenu.RadioItem
                                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                            value="en"
                                        >
                                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <RiEnglishInput />
                                            </DropdownMenu.ItemIndicator>
                                            English
                                        </DropdownMenu.RadioItem>
                                        <DropdownMenu.RadioItem
                                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                            value="zh-cn"
                                        >
                                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <RiEmphasisCn />
                                            </DropdownMenu.ItemIndicator>
                                            简体中文
                                        </DropdownMenu.RadioItem>
                                    </DropdownMenu.RadioGroup>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>

                        
                        {isAuthenticated && userData ? (
                            <>
                                <li
                                    ref={dropdownRef}
                                    onClick={toggleDropdown}
                                    className={"relative cursor-pointer"}
                                >
                                    <div className="flex items-center text-white">
                                        <span>{userData.username}</span>
                                        {dropdownOpen ? (
                                            <HiOutlineChevronUp className="ml-2" />
                                        ) : (
                                            <HiOutlineChevronDown className="ml-2" />
                                        )}
                                    </div>
                                    {dropdownOpen && (
                                        <ul
                                            className={
                                                "absolute right-0 mt-2 bg-white text-black rounded shadow-md py-2 px-4 w-36"
                                            }
                                        >
                                            <li>
                                                <Link
                                                    href={`/${userData.role}`}
                                                    className={
                                                        "flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    }
                                                >
                                                    <span className={"flex items-center"}>
                                                        <HiOutlineUser className={"mr-2"} />
                                                        <span>Profile</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={"/logout"}
                                                    className={
                                                        "flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    }
                                                >
                                                    <span className={"flex items-center"}>
                                                        <HiOutlineLogout className={"mr-2"} />
                                                        <span>Log&nbsp;Out</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={"/register"}>
                                        <div
                                            className={
                                                "bg-white text-blue-500 px-4 py-2 rounded cursor-pointer"
                                            }
                                        >
                                            Sign Up
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/login"}>
                                        <div className={"text-white cursor-pointer"}>Log In</div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ConferenceNavbar;
