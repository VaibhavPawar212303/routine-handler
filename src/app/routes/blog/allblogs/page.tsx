"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  title: string;
  slug: string;
  creator: string;
  content: {
    introduction: string
  }

}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading blogs...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 text-black mt-20">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Latest Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.slug} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-sm text-gray-600 mb-2">By {blog.creator}</p>
          <p className="text-gray-700">{blog.content.introduction.substring(0, 100)}...</p>
          <Link href={`/routes/blog/${blog.slug}`} className="text-blue-400 font-semibold mt-2 inline-block">
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
