'use client'
import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets, blog_data } from "../../Assets/assets";
import Footer from "../../Components/Footer";

const SingleBlog = ({ params }) => {
  const { id } = use(params);
  const blogId = parseInt(id);
  const blog = blog_data.find(b => b.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/" className="bg-black text-white px-6 py-2 rounded">
            Back to Home
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
            <p className="inline-block bg-black text-white text-sm px-4 py-1 mb-6">
              {blog.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-col items-center justify-center text-sm text-gray-600 mb-16">
              <Image
                src={blog.author_img}
                alt={blog.author}
                width={60}
                height={60}
                className="rounded-full border border-gray-300"
              />
              <span className="mt-3 text-base font-medium text-gray-800">{blog.author}</span>
            </div>
          </div>

          <div className="mb-16 rounded-lg overflow-hidden shadow-lg hover:shadow-[-7px_7px_0px_#000000]">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {blog.description}
            </p>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg text-gray-600 mt-8">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="text-center my-16">
            <p className="text-xl font-semibold text-gray-800 mb-6">Share this article on social media</p>
            <div className="flex justify-center gap-4">
              <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40} className="cursor-pointer hover:opacity-70 transition-opacity" />
              <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40} className="cursor-pointer hover:opacity-70 transition-opacity" />
              <Image src={assets.googleplus_icon} alt="Google+" width={40} height={40} className="cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-sm font-semibold hover:shadow-[-7px_7px_0px_#808080]"
            >
              ← Back to Home
              <Image src={assets.arrow} alt="Back" width={16} height={16} className="-rotate-180 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;
