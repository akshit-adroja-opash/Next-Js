'use client'
import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../Assets/assets";
import Footer from "../../Components/Footer";
import axios from "axios";

const SingleBlog = ({ params }) => {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id: id }
      });
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl font-medium">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white border border-black shadow-[-10px_10px_0px_#000000]">
          <h1 className="text-4xl font-black mb-6 uppercase tracking-tight">Blog Not Found</h1>
          <p className="mb-8 text-gray-600">The blog you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo} width={180} height={50} alt="Logo" loading="eager" className="w-[130px] sm:w-auto" />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt="arrow" width={12} height={12} />
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-1 mb-6">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-col items-center justify-center mb-16">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black mb-3">
                <Image
                  src={blog.author_img && blog.author_img !== "[object Object]" ? blog.author_img : assets.profile_icon}
                  alt={blog.author}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-gray-800 uppercase tracking-wide">{blog.author}</span>
            </div>
          </div>

          <div className="mb-16 border-2 border-black shadow-[-12px_12px_0px_#000000] overflow-hidden">
            <div className="relative w-full h-[400px]">
              <Image
                src={blog.image && blog.image !== "[object Object]" ? blog.image : assets.upload_area}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-10">
            {blog.description && blog.description.includes('<') ? (
              <div 
                className="text-lg text-gray-700 leading-relaxed font-semibold blog-content whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.description }} 
              />
            ) : ( 
              <div className="text-xl text-gray-800 leading-relaxed font-semibold blog-content whitespace-pre-wrap">
                {blog.description}
              </div>
            )}
            
            <p className="text-gray-600 mt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-2xl font-bold my-5 text-gray-900">Step-by-Step implementation of {blog.title}</h3>
            <p className="text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="text-gray-600 mt-5">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>  

          <div className="border-t-2 border-black pt-12 text-center mb-20">
            <p className="text-xl font-black uppercase tracking-widest text-gray-800 mb-8">Share this article</p>
            <div className="flex justify-center gap-6">
              {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, idx) => (
                <div key={idx} className="cursor-pointer hover:-rotate-12 transition-transform">
                  <Image src={icon} alt="Social Icon" width={40} height={40} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pb-20">
            <Link
              href="/"
              className="group flex items-center gap-3 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:translate-x-2 transition-all shadow-[-8px_8px_0px_#808080]"
            >
              <Image src={assets.arrow} alt="Back" width={16} height={16} className="rotate-180 brightness-0 invert group-hover:mr-2 transition-all" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;
