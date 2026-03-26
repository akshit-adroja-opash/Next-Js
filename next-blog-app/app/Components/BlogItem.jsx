import React from "react";
import Image from "next/image"
import Link from "next/link"
import { assets } from "../Assets/assets";

const BlogItem = ({ title, description, category, image, id }) => {
    // Truncate description safely
    const truncatedDescription = description && description.length > 120 
        ? description.substring(0, 120) + "..." 
        : description;

    return (
        <div className="max-w-[330px] sm:max-w-[300px] h-full flex flex-col bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] cursor-pointer transition-all duration-300">
            <Link href={`/blogs/${id}`}>
                <div className="w-full h-[220px] relative overflow-hidden group">
                    <Image 
                        src={image && image !== "[object Object]" ? image : assets.upload_area} 
                        alt={title} 
                        fill 
                        className='object-cover border-b border-black group-hover:scale-105 transition-transform duration-500' 
                    />
                </div>
            </Link>
            <div className="p-5 flex flex-col flex-grow">
                <span className="px-2 py-1 inline-block bg-black text-white text-[10px] uppercase font-bold tracking-widest w-fit mb-3">
                    {category}
                </span>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 leading-tight line-clamp-2 min-h-[3.5rem]">
                    {title}
                </h5>
                <p 
                    className="mb-4 text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-3" 
                    dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                ></p>
                <div className="mt-auto">
                    <Link href={`/blogs/${id}`} className="inline-flex items-center py-2 font-bold text-sm text-center gap-1 hover:gap-3 transition-all duration-300">
                        Read more <Image src={assets.arrow} alt="" width={12} height={12} className="mt-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default BlogItem;
