"use client"
import { assets } from "../../Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Technology",
        author: "Alex Bennett",
        author_img: assets.profile_icon,
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
        console.log(data);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("author_img", data.author_img.src || data.author_img);
        formData.append("image", image);
        const res = await axios.post("/api/blog", formData);
        if (res.data.success) {
            toast.success(res.data.msg);
            setImage(false);
            setData({
                title: "",
                description: "",
                category: "Technology",
                author: "Alex Bennett",
                author_img: assets.profile_icon,
            })
        }
        else {
            toast.error("Error occurred");
        }

    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className="pt-5 pt-x sm:pt-12 sm:pl-16">
                <p className="text-xl ">Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image className="mt-4" src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                <p className="text-xl mt-4">Blog Title</p>
                <input name="title" onChange={onChangeHandler} value={data.title} type="text" placeholder="Type title here" className="mt-4 w-full sm:w-[500px] text-lg border border-black p-2 outline-none" />
                <p className="text-xl mt-4">Blog Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} type="text" placeholder=" Write Content here" rows={6} className="mt-4 w-full sm:w-[500px] text-lg border border-black p-2 outline-none " />
                <p className="text-xl mt-4">Blog Category</p>
                <select name="category" onChange={onChangeHandler} value={data.category} id="" className="w-full sm:w-[200px] mt-4 border border-black p-2 outline-none">
                    <option value="Technology">Technology</option>
                    <option value="Startup">Startup</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button className="mt-8 w-full sm:w-[200px] bg-black text-white py-2 text-lg cursor-pointer">Publish Blog</button>
            </form>
        </>
    )
}

export default page
