import Link from "next/link";
import {AuthenticationProps} from "@/services/auth";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineLogout, HiOutlineUser} from "react-icons/hi";

const ConferenceNavbar: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLLIElement>(null)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event:  any) => {
            if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownOpen])

    return (
        <nav className={"bg-blue-500 p-4"}>
            <div className={"container mx-auto"}>
                <div className={"flex justify-between items-center"}>
                    <Link href={"/"}>
                        <div className={"flex items-center space-x-4 cursor-pointer"}>
                            <Image src={"/favicon.ico"} alt={"ConfMan Logo"} className={"h-8 w-auto"} width={100} height={100} />
                            <span className={"text-white text-xl font-bold"}>
                                ConfMan
                            </span>
                        </div>
                    </Link>
                    <ul className={"flex items-center space-x-4"}>
                        {isAuthenticated && userData ? (
                            <>
                                <li ref={dropdownRef} onClick={toggleDropdown} className={"relative cursor-pointer"}>
                                    <div className="flex items-center text-white">
                                        <span>{userData.username}</span>
                                        {dropdownOpen ? (
                                            <HiOutlineChevronUp className="ml-2" />
                                        ) : (
                                            <HiOutlineChevronDown className="ml-2" />
                                        )}
                                    </div>
                                    {dropdownOpen && (
                                        <ul className={"absolute right-0 mt-2 bg-white text-black rounded shadow-md py-2 px-4"}>
                                            <li className={"flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"}>
                                                <HiOutlineUser className={"mr-2"} />
                                                <Link href={`/${userData.role}`}>
                                                    <span>Profile</span>
                                                </Link>
                                            </li>
                                            <li className={"flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"}>
                                                <HiOutlineLogout className={"mr-2"} />
                                                <Link href={"/logout"}>
                                                    <span>Log&nbsp;Out</span>
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
                                        <div className={"bg-white text-blue-500 px-4 py-2 rounded cursor-pointer"}>
                                            Sign Up
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/login"}>
                                        <div className={"text-white cursor-pointer"}>
                                            Log In
                                        </div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default ConferenceNavbar