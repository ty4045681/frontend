import React from "react";

type DashboardCardProps = {
    title: string
    content: string | number
}

const DashBoardCard = ({title, content}: DashboardCardProps) => {

    return (
        <div className="bg-white dark:bg-slate-600 shadow-lg rounded p-6 flex flex-col justify-between">
            <h3 className="text-black dark:text-white text-xl font-semibold mb-4">{title}</h3>
            <p className="text-black dark:text-mauve3 text-4xl self-end">{content}</p>
        </div>
    )
}

export default DashBoardCard