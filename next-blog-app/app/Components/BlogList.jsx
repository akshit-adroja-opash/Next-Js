import React, { useState } from "react";
import BlogItem from "./BlogItem";
import { blog_data } from "../Assets/assets.js";

const BlogList = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    const categories = ["All", "Technology", "Startup", "Lifestyle"];
    
    const filteredBlogs = selectedCategory === "All" 
        ? blog_data 
        : blog_data.filter(blog => blog.category === selectedCategory);

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
                {filteredBlogs.map(blog => (
                    <BlogItem
                        key={blog.id}
                        title={blog.title}
                        description={blog.description}
                        category={blog.category}
                        image={blog.image}
                        id={blog.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogList;



