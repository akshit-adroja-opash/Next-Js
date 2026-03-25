import React, { useState , useEffect} from "react";
import BlogItem from "./BlogItem";
import { blog_data } from "../Assets/assets.js";
import axios from "axios";

const BlogList = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }
     useEffect(() => {
        fetchBlogs();
    }, []);
    
    const categories = ["All", "Technology", "Startup", "Lifestyle"];
    
    const filteredBlogs = selectedCategory === "All" 
        ? blogs 
        : blogs.filter(blog => blog.category === selectedCategory);

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                {categories.map(category => (
                    <button 
                        key={category}
                        className={`py-1 px-4 rounded-sm ${
                            selectedCategory === category 
                                ? "bg-black text-white" 
                                : "bg-transparent text-black border border-black"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4    gap-6 px-5 md:px-12 lg:px-28 mb-20 ">
                {filteredBlogs.map((blog, index) => {
                    const uniqueId = blog.id || blog._id || index;
                    return (
                        <BlogItem
                            key={uniqueId}
                            title={blog.title}
                            description={blog.description}
                            category={blog.category}
                            image={blog.image}
                            id={uniqueId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BlogList;



