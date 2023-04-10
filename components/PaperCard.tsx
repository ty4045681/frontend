import React from 'react';
import Link from 'next/link';

type PaperCardProps = {
    title: string;
    author: string;
    downloadLink: string;
};

const PaperCard: React.FC<PaperCardProps> = ({ title, author, downloadLink }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">Author: {author}</p>
            <Link href={downloadLink}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Download
                </button>
            </Link>
        </div>
    );
};

export default PaperCard;
