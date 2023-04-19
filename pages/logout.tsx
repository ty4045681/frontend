import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";

const Logout: React.FC = () => {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            // API call?
            // set a timer here to redirect to the homepage after a few seconds
            await new Promise((resolve) => setTimeout(resolve, 2000))
            Cookies.remove("jwt")
        }

        logout()
            .then(() => router.push("/"))
            .catch((error) => {
                console.error("Logout failed: ", error)
            })
    }, [router])

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
                    {/* Add any additional content related to logout functionality here */}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Logout