import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const WithAuthComponent: React.FC = (props) => {
        const router = useRouter();
        const token = Cookies.get("jwt");

        React.useEffect(() => {
            if (!token) {
                router.replace("/login");
            }
        }, [router, token]);

        if (!token) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
};

export default withAuth;