import React from "react";
import Link from "next/link";

const AdminSideBar: React.FC = () => {
    return (
        <div className="bg-gray-800 w-1/4 p-8">
            <h1 className="text-white text-3xl mb-8">Admin Dashboard</h1>
            <nav>
                <ul>
                    <li className="my-2">
                        <Link href="/admin/users">
                            <span className="text-gray-300 hover:text-white">User Management</span>
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link href="/admin/conferences">
                            <span className="text-gray-300 hover:text-white">Conference Management</span>
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link href="/admin/papers">
                            <span className="text-gray-300 hover:text-white">Paper Submission Management</span>
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link href="/admin/content">
                            <span className="text-gray-300 hover:text-white">Content Management</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminSideBar