import Link from 'next/link';

const AdminPage = () => {
    return (
        <div className="min-h-screen flex">
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
            <div className="bg-gray-100 w-3/4 p-8">
                <h2 className="text-xl mb-4">Dashboard</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Add dashboard content such as summary cards, charts, etc. */}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
