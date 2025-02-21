import { NextRequest, NextResponse } from 'next/server';
import blogData from '../blogData.json';

const blogs = blogData.blogs;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ message: 'Slug not provided' }, { status: 400 });
  }
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) {
    return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
}
