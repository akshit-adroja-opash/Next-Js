'use client'
import BlogTableItem from '../../Components/AdminComponents/BlogTableItem';
import { assets } from '../../Assets/assets';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const page = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);

    }
    const deleteBlog = async (id) => {
        const response = await axios.delete(`/api/blog?id=${id}`);
        toast.success("Blog Deleted");
        fetchBlogs();
    }
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="flex-1 pt-5 px-1 sm:pt-12 sm:pl-16">
            <h1>All Blogs</h1>
            <div className="relative overflow-x-auto my-8">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">Image</th>
                            <th scope="col" className="px-6 py-3 text-left">Title</th>
                            <th scope="col" className="px-6 py-3 text-left">Category</th>
                            <th scope="col" className="px-6 py-3 text-left">Author</th>
                            <th scope="col" className="px-6 py-3 text-left">Date</th>
                            <th scope="col" className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => {
                            return (
                                <BlogTableItem
                                    key={index}
                                    id={blog._id}
                                    authorImg={blog.author_img}
                                    title={blog.title}
                                    category={blog.category}
                                    author={blog.author}
                                    date={blog.date}
                                    deleteBlog={deleteBlog}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page