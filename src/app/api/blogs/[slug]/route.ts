import { NextResponse } from "next/server";
import blogData from '../blogData.json';
const blogs = blogData.blogs;

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
