import React from "react";

const SubTableItam = ({ email, date, mongoId, deleteEmail }) => {
    const emailDate = new Date(date);
    return (
        <tr className="bg-white border-b text-left">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {email ? email : "No Email"}
            </th>
            <td className="px-6 py-4 hidden sm:block">
                {emailDate.toDateString()}
            </td>
            <td onClick={() => deleteEmail(mongoId)} className="px-6 py-4 cursor-pointer">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">Delete</button>
            </td>
        </tr>
    )
}

export default SubTableItam;