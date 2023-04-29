import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";


function OrganizerPage({ userData, isAuthenticated }: AuthenticationProps) {
    const router = useRouter();

    if (!isAuthenticated) {
        router.replace('/login')
        return null
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Header */}
            <Header userType={"organizer"} isAuthenticated={isAuthenticated} userData={userData} />

            <div className="min-h-screen flex">
                {/* Sidebar */}
                <Sidebar userType={"organizer"} isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="flex-1 flex flex-col m-10">
                    <div className="flex justify-between">
                        <div className="bg-white shadow-md rounded p-6 w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Conferences</h3>
                            <p className="text-4xl">10</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Papers</h3>
                            <p className="text-4xl">5</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <div className="bg-white shadow-md rounded p-6 w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Attendees</h3>
                            <p className="text-4xl">15</p>
                        </div>

                        <div className="bg-white shadow-md rounded p-6 w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Reviewers</h3>
                            <p className="text-4xl">8</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default OrganizerPage