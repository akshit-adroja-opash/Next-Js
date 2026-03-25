import React from "react";
import Image from "next/image";
import { assets } from "../../Assets/assets";

const BlogTableItem = ({ authorImg, title, author, category, date , deleteBlog  , id }) => {
    
    let profileIcon = authorImg;
    if (!profileIcon || profileIcon === "[object Object]") {
        profileIcon = assets.profile_icon;
    }

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image src={profileIcon} alt="" width={40} height={40} />
            </th>
            <td className="px-6 py-4">
                {title ? title : "no title"}
            </td>
            <td className="px-6 py-4">
                {category ? category : "Technology"}
            </td>
            <td className="px-6 py-4">
                {author ? author : "no author"}
            </td>
            <td className="px-6 py-4">
                {date ? new Date(date).toDateString() : "11 jan 2024"}
            </td>
            <td onClick={() => deleteBlog(id)} className="px-6 py-4 cursor-pointer">
                x
            </td>
        </tr>
    )
}

export default BlogTableItem
