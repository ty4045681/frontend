import ChangePassword from "@/components/dashboard/ChangePassword";
import Header from "@/components/dashboard/Header";
import Info from "@/components/dashboard/Info";
import Sidebar from "@/components/dashboard/Sidebar";
import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";

const JudgeInfoPage: React.FC<AuthenticationProps> = ({isAuthenticated, userData}) => {
    return (
        <>
            <Header userType='judge' isAuthenticated={isAuthenticated} userData={userData} />

            <div className='flex min-h-screen'>
                {/* Sidebar */}
                <Sidebar userType='judge' isAuthenticated={isAuthenticated} userData={userData} />

                {/* Content */}
                <div className="flex-1 flex flex-col m-10">
                    <Info userType='judge' isAuthenticated={isAuthenticated} userData={userData} />

                    <div className="divider mt-10 mb-10"></div>

                    <ChangePassword userType='judge' isAuthenticated={isAuthenticated} userData={userData} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getServerSideAuthProps(context)
}

export default JudgeInfoPage