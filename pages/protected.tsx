import React from "react";
import withAuth from "@/hoc/withAuth";

const ProtectedPage: React.FC = () => {
    return <div>This is a protected page. Only authenticated users can see this.</div>;
};

export default withAuth(ProtectedPage);