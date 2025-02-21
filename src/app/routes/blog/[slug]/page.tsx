"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Blog {
  title: string;
  slug: string;
  creator: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      text?: string;
      points?: string[];
      subsections?: {
        title: string;
        description: string;
        example?: string;
      }[];
      steps?: string[];
    }[];
    closing: string;
  };
}

export default function BlogDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) {
        console.warn("No slug provided!");
        return;
      }

      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) throw new Error("Blog not found");
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  if (!slug) {
    return <p className="text-center text-red-500">Slug not found. Check URL.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold text-blue-500">{blog.title}</h1>
      <p className="text-sm text-gray-700 mb-4">By {blog.creator}</p>

      <p className="text-gray-700 mb-4">{blog.content.introduction}</p>

      {blog.content.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600">{section.heading}</h2>
          
          {section.text && <p className="text-gray-800">{section.text}</p>}

          {section.points && (
            <ul className="list-disc list-inside text-gray-800 mt-2">
              {section.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          )}

          {section.subsections &&
            section.subsections.map((sub, idx) => (
              <div key={idx} className="mt-3">
                <h3 className="text-lg font-medium text-blue-500">{sub.title}</h3>
                <p className="text-gray-700">{sub.description}</p>
                {sub.example && <p className="text-gray-600 italic">Example: {sub.example}</p>}
              </div>
            ))}

          {section.steps && (
            <ol className="list-decimal list-inside text-gray-800 mt-2">
              {section.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      ))}

      <p className="text-gray-700 font-medium">{blog.content.closing}</p>
    </div>
  );
}
