import { NextResponse } from "next/server";
import blogData from './blogData.json'
export async function GET() {
  const blogs = blogData.blogs;
  return NextResponse.json(blogs);
}
