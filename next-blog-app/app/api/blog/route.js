import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");

const LoadDB = async () => {
    await connectDB();
}
LoadDB();

import { blog_data } from "@/app/Assets/assets";

// API Endpoint to get all blogs

export async function GET(request) {
    let blogs = await BlogModel.find({});
    
    // Auto-populate default blogs if the database is completely empty
    if (blogs.length === 0) {
        const defaultBlogs = blog_data.map(b => ({
            title: b.title,
            description: b.description,
            category: b.category,
            author: b.author,
            image: b.image.src || b.image,
            author_img: "[object Object]", // Forces it to use the default profile icon safely
        }));
        await BlogModel.insertMany(defaultBlogs);
        blogs = await BlogModel.find({});
        console.log("Database initialized with default blogs!");
    }

    return NextResponse.json({ blogs });
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        author_img: `${formData.get('author_img')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog saved successfully");

    return NextResponse.json({ success: true, msg: "Blog Added" });
}

// creating API Endpoint to delete blog

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    
    // Prevent crashes when ID is mistakenly passed as the string "undefined" 
    if (!id || id === "undefined") {
        return NextResponse.json({ success: false, msg: "Invalid or missing ID" }, { status: 400 });
    }

    const blog = await BlogModel.findByIdAndDelete(id);
    if (blog) {
        try {
            fs.unlinkSync(`./public${blog.image}`);
        } catch (error) {
            console.log("Image already deleted or not found");
        }
    }
    return NextResponse.json({ success: true, msg: "Blog Deleted" });
}

