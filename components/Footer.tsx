import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Conference Management System. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer