import ChangePassword from "@/components/dashboard/ChangePassword";
import Header from "@/components/dashboard/Header";
import Info from "@/components/dashboard/Info";
import Sidebar from "@/components/dashboard/Sidebar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import React from "react";


const UserInfoPage: React.FC<AuthenticationProps> = ({ isAuthenticated, userData }) => {
    return (
        <>
            <Header userType="user" isAuthenticated={isAuthenticated} userData={userData} />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar userType={"user"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="ml-[150px] mt-[72px] bg-gray-200 dark:bg-gray-900 flex-1 flex flex-col space-y-4">
                    <Info userType="user" isAuthenticated={isAuthenticated} userData={userData} />

                    {/*<Separator.Root className="p-2 rounded bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />*/}

                    <ChangePassword userType="user" isAuthenticated={isAuthenticated} userData={userData} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default UserInfoPage